<?php

declare(strict_types=1);

namespace Lightit\Shared\App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;
use Lightit\Backoffice\DMEProviders\Domain\Actions\BulkCreateDMEProviders;
use Lightit\Backoffice\DMEProviders\Domain\DataTransferObjects\DMEProviderDTO;
use Lightit\Backoffice\DMEProviders\Domain\Enums\BenefitType;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;
use Lightit\Backoffice\Payers\Domain\Actions\BulkCreatePayers;
use Lightit\Backoffice\Payers\Domain\DataTransferObjects\PayerDTO;
use Lightit\Backoffice\Payers\Domain\Enums\PayerType;
use Lightit\Backoffice\Payers\Domain\Models\Payer;
use Lightit\Shared\Domain\Actions\BulkCreatePayersDMEProviders;
use Lightit\Shared\Domain\Actions\GetQuestMatrix;
use Lightit\Shared\Domain\DataTransferObjects\PayersDMEProvidersDTO;

class ProcessQuestMatrix extends Command
{
    /**
     * @var string
     */
    protected $signature = 'app:process-quest-matrix';

    /**
     * @var string
     */
    protected $description = 'Command description';

    public function __construct(
        private readonly Application $app,
        private readonly BulkCreatePayers $bulkCreatePayers,
        private readonly BulkCreateDMEProviders $bulkCreateDMEProviders,
        private readonly BulkCreatePayersDMEProviders $bulkCreatePayersDMEProviders,
        private readonly GetQuestMatrix $getQuestMatrix,
    ) {
        parent::__construct();
    }

    public function handle(

    ): int {
        $datasync = null;
        DB::transaction(function () use (&$datasync) {
            $datasync = Datasync::create([
                'sync_method' => self::class,
            ]);
            $matrixData = $this->getDataFromCSV();
            $this->generatePayers($matrixData, $datasync);
            $this->generateDMEProviders($matrixData, $datasync);
            $this->generatePayersDMEProviders($matrixData, $datasync);
            $outputMatrix = $this->getQuestMatrix->execute();
            $this->generateOutputFile($outputMatrix);
        });

        return self::SUCCESS;
    }

    /**
     * @param Collection<string, Collection<int|string, mixed>> $matrixData
     *
     */
    private function generatePayers(Collection $matrixData, Datasync $datasync): int
    {
        /** @var Collection<string, Collection<int|string, mixed>> $payers */
        $payers = $matrixData->select('ADC_ADC_Name__c')->unique();
        $payerData = collect();

        foreach ($payers as $payer) {
            /** @var string $name */
            $name = $payer['ADC_ADC_Name__c'];
            $payerData->push(
                new PayerDTO(
                    $name,
                    PayerType::MEDICARE,
                )
            );
        }

        return $this->bulkCreatePayers->execute($payerData, $datasync);
    }

    /**
     * @param Collection<string, Collection<int|string, mixed>> $matrixData
     *
     */
    private function generateDMEProviders(Collection $matrixData, Datasync $datasync): int
    {
        $dmeProviders = $matrixData->select('ADC_DME_Name__c')->unique();
        $fullDmeData = collect();
        foreach ($dmeProviders as $dmeProvider) {
            /** @var Collection<string, string> $providerData */
            $providerData = $matrixData->where('ADC_DME_Name__c', $dmeProvider['ADC_DME_Name__c'])
                ->first();
            /** @var string $name */
            $name = $providerData['ADC_DME_Name__c'];
            /** @var string $phone */
            $phone = $providerData['ADC_DME_Phone__c'];
            /** @var string $fax */
            $fax = $providerData['ADC_DME_Fax__c'];
            $fullDmeData->push(
                new DMEProviderDTO(
                    name: $name,
                    benefitType: BenefitType::MEDICAL,
                    phone: $phone,
                    fax: $fax,
                )
            );
        }
        return $this->bulkCreateDMEProviders->execute($fullDmeData, $datasync);
    }

    /**
     * @param Collection<string, Collection<int|string, mixed>> $matrixData
     *
     */
    private function generatePayersDMEProviders(Collection $matrixData, Datasync $datasync): int
    {
        $payersToDME = collect();
        foreach ($matrixData as $item) {
            /** @var string  $state */
            $state = $item['ADC_State__c'];
            $payersToDME->push(new PayersDMEProvidersDTO(
                payer: Payer::where('name', $item['ADC_ADC_Name__c'])->firstOrFail(),
                dmeProvider: DMEProvider::where('name', $item['ADC_DME_Name__c'])->firstOrFail(),
                state: $state,
            ));
        }
        return $this->bulkCreatePayersDMEProviders->execute($payersToDME, $datasync);
    }

    /**
     * @param Collection<int, array{payer_id: int, payer_name: string, dme_provider_name: string, state: string}> $matrix
     */
    private function generateOutputFile(Collection $matrix): int
    {
        $outputFilePath = $this->app->resourcePath('csvs/output-file.csv');

        // Open the output CSV file for writing
        if (($handle = fopen($outputFilePath, 'w')) === false) {
            $this->error('Could not open the output file for writing.');
            return 1;
        }
        $columns = [
            'id',
            'Payer name',
            'DME name',
            'state',
        ];
        fputcsv($handle, $columns, ';');
        $matrix->each(function ($row) use ($handle) {
            fputcsv($handle, $row, ';');
        });

        fclose($handle);

        return 0;
    }

    /**
     * @return Collection<string, Collection<int|string, mixed>>
     *
     * @throws \Exception
     */
    private function getDataFromCSV(): Collection
    {
        $filePath = $this->app->resourcePath('csvs/Quest Health Payer Matrix-Table 1.csv');

        // Open the CSV file
        if (! file_exists($filePath) || ! is_readable($filePath)) {
            $this->error('CSV file not found or not readable.');
            throw new \Exception('CSV file not found or not readable.');
        }

        $header = null;
        $data = [];

        // Read the CSV file
        if (($handle = fopen($filePath, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, ';')) !== false) {
                if (! $header) {
                    $header = $row;
                } else {
                    $data[] = array_combine($header, $row);
                }
            }
            fclose($handle);
        }

        // Define the columns to extract
        $columns = [
            'ADC_ADC_Name__c',
            'ADC_Benefit_Type__c',
            'ADC_DME_Name__c',
            'ADC_DME_Phone__c',
            'ADC_DME_Fax__c',
            'ADC_Type__c',
            'ADC_State__c',
        ];

        /** @phpstan-ignore-next-line  */
        return collect($data)->map(function ($item) use ($columns) {
            return collect($item)->only($columns);
        });
    }
}
