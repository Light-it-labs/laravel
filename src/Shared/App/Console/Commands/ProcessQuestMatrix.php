<?php

declare(strict_types=1);

namespace Lightit\Shared\App\Console\Commands;

use Illuminate\Console\Command;
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

    public function handle(
        BulkCreatePayers $bulkCreatePayers,
        BulkCreateDMEProviders $bulkCreateDMEProviders,
        BulkCreatePayersDMEProviders $bulkCreatePayersDMEProviders,
        GetQuestMatrix $getQuestMatrix,
    ): int {
        // Define the path to the CSV file
        $filePath = resource_path('csvs/Quest Health Payer Matrix-Table 1.csv');

        $outputFilePath = resource_path('csvs/output-file.csv');

        // Open the CSV file
        if (! file_exists($filePath) || ! is_readable($filePath)) {
            $this->error('CSV file not found or not readable.');
            return 1;
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

        // Filter the data to keep only the required columns
        $collection = collect($data)->map(function ($item) use ($columns) {
            return collect($item)->only($columns);
        });

        $payers = $collection->select('ADC_ADC_Name__c')->unique();
        $payerData = collect();
        foreach ($payers as $payer) {
            $payerData->push(
                new PayerDTO(
                    $payer['ADC_ADC_Name__c'],
                    PayerType::MEDICARE,
                )
            );
        }
        $bulkCreatePayers->execute($payerData);

        $dmeProviders = $collection->select('ADC_DME_Name__c')->unique();
        $fullDmeData = collect();
        foreach ($dmeProviders as $dmeProvider) {
            $providerData = $collection->where('ADC_DME_Name__c', $dmeProvider['ADC_DME_Name__c'])
                ->first();
            $fullDmeData->push(
                new DMEProviderDTO(
                    name: $providerData['ADC_DME_Name__c'],
                    benefitType: BenefitType::MEDICAL,
                    phone: $providerData['ADC_DME_Phone__c'],
                    fax: $providerData['ADC_DME_Fax__c'],
                )
            );
        }
        $bulkCreateDMEProviders->execute($fullDmeData);
        // Output the collection

        $matrix = collect();
        foreach ($collection as $item) {
            $matrix->push(new PayersDMEProvidersDTO(
                payer: Payer::where('name', $item['ADC_ADC_Name__c'])->first(),
                dmeProvider: DMEProvider::where('name', $item['ADC_DME_Name__c'])->first(),
                state: $item['ADC_State__c'],
            ));
        }
        $bulkCreatePayersDMEProviders->execute($matrix);
        $outputMatrix = $getQuestMatrix->execute();

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

        // Write the header to the output CSV
        fputcsv($handle, $columns, ';');

        // Write the data to the output CSV
        $outputMatrix->each(function ($row) use ($handle) {
            fputcsv($handle, $row, ';');
        });

        fclose($handle);
        return 0;
    }
}
