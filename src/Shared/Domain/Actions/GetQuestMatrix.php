<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Actions;

use Illuminate\Support\Collection;
use Lightit\Shared\Domain\Models\PayersDMEProviders;

class GetQuestMatrix
{
    /**
     * @return Collection<int, array{payer_id: int, payer_name: string, dme_provider_name: string, state: string}>
     */
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
