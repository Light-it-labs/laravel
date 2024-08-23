<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Shared\Domain\Models\PayersDMEProviders;

class BulkCreatePayersDMEProviders
{
    public function execute(Collection $matrixElements)
    {
        $matrixElementsArray = Arr::map($matrixElements->toArray(), function ($matrixElement) {
            $result = $matrixElement->toArray();
            $result['created_at'] = now();

            return $result;
        });
        DB::transaction(function () use ($matrixElementsArray) {
            PayersDMEProviders::insert($matrixElementsArray);
        });
    }
}
