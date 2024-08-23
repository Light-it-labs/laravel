<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareEligibilityResponseDto;

class MedicareEligibilityResponseTransformer extends Transformer
{
    public function transform(MedicareEligibilityResponseDto $medicareEligibility): array
    {
        return [
            'is_eligible' => $medicareEligibility->is_eligible,
            'member_id' => $medicareEligibility->member_id,
            'payer' => $medicareEligibility->payer,
            'state' => $medicareEligibility->state->value,
        ];
    }
}
