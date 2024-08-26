<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Lightit\Shared\App\Enums\USState;

class GetAvailableDMEProvidersDto
{
    public function __construct(
        public readonly string $payer,
        public readonly USState $state,
    ) {
    }
}
