<?php

declare(strict_types=1);

namespace Lightit\Backoffice\DMEProviders\Domain\DataTransferObjects;

use Lightit\Backoffice\DMEProviders\Domain\Enums\BenefitType;

class DMEProviderDTO
{
    public function __construct(
        public string $name,
        public BenefitType $benefitType,
        public string $phone,
        public string $fax,
    ) {
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'benefit_type' => $this->benefitType->value,
            'phone' => $this->phone,
            'fax' => $this->fax,
        ];
    }
}
