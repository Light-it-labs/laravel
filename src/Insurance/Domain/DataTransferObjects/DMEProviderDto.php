<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Lightit\Shared\App\Enums\USState;

class DMEProviderDto
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $phone,
        public readonly USState $state,
    ) {
    }
}
