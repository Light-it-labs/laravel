<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Payers\Domain\DataTransferObjects;

use Lightit\Backoffice\Payers\Domain\Enums\PayerType;

class PayerDTO
{
    public function __construct(
        public string $name,
        public PayerType $type,
    ) {
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
        ];
    }
}
