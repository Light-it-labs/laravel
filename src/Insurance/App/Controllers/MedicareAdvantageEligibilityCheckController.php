<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Insurance\App\Request\MedicareAdvantageEligibilityCheckRequest;
use Lightit\Insurance\App\Transformers\MedicareAdvantageEligibilityResponseTransformer;
use Lightit\Insurance\Domain\Actions\MedicareAdvantageEligibilityCheckAction;

class medicareAdvantageEligibilityCheckController
{
    public function __invoke(
        MedicareAdvantageEligibilityCheckRequest $request,
        MedicareAdvantageEligibilityCheckAction $medicareAdvantageCheckAction,
    ): JsonResponse {
        $medicareAdvantageResponse = $medicareAdvantageCheckAction->execute($request->toDto());

        return responder()
            ->success(
                $medicareAdvantageResponse,
                MedicareAdvantageEligibilityResponseTransformer::class
            )
            ->respond();
    }
}
