<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Actions;

use Illuminate\Support\Collection;
use Lightit\Shared\Domain\Models\PayersDMEProviders;

class GetQuestMatrix
{
    public function execute(): Collection
    {
        $matrix = PayersDMEProviders::all();

        return $matrix->map(function ($matrixElement) {
            return [
                'payer_id' => $matrixElement->id,
                'payer_name' => $matrixElement->payer->name,
                'dme_provider_name' => $matrixElement->dmeProvider->name,
                'state' => $matrixElement->state,
            ];
        });
    }
}
