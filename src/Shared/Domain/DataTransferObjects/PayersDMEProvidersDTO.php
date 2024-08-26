<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\DataTransferObjects;

use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;
use Lightit\Backoffice\Payers\Domain\Models\Payer;

class PayersDMEProvidersDTO
{
    public function __construct(
        public Payer $payer,
        public DMEProvider $dmeProvider,
        public string $state,
    ) {
    }

    public function toArray(): array
    {
        return [
            'payer_id' => $this->payer->id,
            'dme_provider_id' => $this->dmeProvider->id,
            'state' => $this->state,
        ];
    }
}
