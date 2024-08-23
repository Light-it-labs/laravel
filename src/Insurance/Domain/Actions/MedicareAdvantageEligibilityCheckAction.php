<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\Actions;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareAdvantageEligibilityCheckDto;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareAdvantageEligibilityResponseDto;
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
