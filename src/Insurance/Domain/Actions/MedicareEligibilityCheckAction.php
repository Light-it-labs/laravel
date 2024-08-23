<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\Actions;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareEligibilityCheckDto;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareEligibilityResponseDto;
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
