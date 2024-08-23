<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;
use Lightit\Shared\Domain\DataTransferObjects\PayersDMEProvidersDTO;
use Lightit\Shared\Domain\Models\PayersDMEProviders;

class BulkCreatePayersDMEProviders
{
    /**
     * @param Collection<int, PayersDMEProvidersDTO> $matrixElements
     */
    public function execute(Collection $matrixElements, Datasync $datasync): int
    {
        $matrixElementsArray = Arr::map($matrixElements->toArray(), function ($matrixElement) use ($datasync) {
            $result = $matrixElement->toArray();
            $result['created_at'] = now();
            $result['data_sync_id'] = $datasync->id;

            return $result;
        });
        DB::transaction(function () use ($matrixElementsArray) {
            PayersDMEProviders::insert($matrixElementsArray);
        });

        return 0;
    }
}
