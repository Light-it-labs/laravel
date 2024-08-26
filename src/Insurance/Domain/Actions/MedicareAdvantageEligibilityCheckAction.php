<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Insurance\Domain\DataTransferObjects\MedicareAdvantageEligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareAdvantageEligibilityResponseDto;
use Lightit\Shared\App\Enums\USState;

class MedicareAdvantageEligibilityCheckAction
{
    public function execute(
        MedicareAdvantageEligibilityCheckDto $getAvailableDMEProvidersDto,
    ): MedicareAdvantageEligibilityResponseDto {
        return new MedicareAdvantageEligibilityResponseDto(
            is_eligible: true,
            member_id: $getAvailableDMEProvidersDto->member_id,
            payer: 'Aetna',
            state: USState::California,
        );
    }
}
