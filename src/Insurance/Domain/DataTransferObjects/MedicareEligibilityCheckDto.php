<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Carbon\Carbon;

class MedicareEligibilityCheckDto
{
    public function __construct(
        public readonly string $member_id,
        public readonly string $first_name,
        public readonly string $last_name,
        public readonly Carbon $dob,
    ) {
    }
}
