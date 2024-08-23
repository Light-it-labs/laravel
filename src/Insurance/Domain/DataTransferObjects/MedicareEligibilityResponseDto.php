<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\DataTransferObjects;

use Lightit\Shared\App\Enums\USState;

class MedicareEligibilityResponseDto
{
    public function __construct(
        public bool $is_eligible,
        public string $member_id,
        public string $payer,
        public USState $state,
    ) {
    }
}
