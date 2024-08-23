<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareAdvantageEligibilityResponseDto;

class MedicareAdvantageEligibilityResponseTransformer extends Transformer
{
    public function transform(MedicareAdvantageEligibilityResponseDto $medicareAdvantageEligibility): array
    {
        return [
            'is_eligible' => $medicareAdvantageEligibility->is_eligible,
            'member_id' => $medicareAdvantageEligibility->member_id,
            'payer' => $medicareAdvantageEligibility->payer,
            'state' => $medicareAdvantageEligibility->state->value,
        ];
    }
}
