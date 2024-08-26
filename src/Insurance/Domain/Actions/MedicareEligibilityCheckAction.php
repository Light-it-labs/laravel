<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityResponseDto;
use Lightit\Shared\App\Enums\USState;

class MedicareEligibilityCheckAction
{
    public function execute(MedicareEligibilityCheckDto $getAvailableDMEProvidersDto): MedicareEligibilityResponseDto
    {
        return new MedicareEligibilityResponseDto(
            is_eligible: true,
            member_id: $getAvailableDMEProvidersDto->member_id,
            payer: 'Aetna',
            state: USState::California,
        );
    }
}
