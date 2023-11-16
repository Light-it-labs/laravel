<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Request\StoreUserRequest;
use App\Users\Transformers\UserTransformer;
use Domain\Users\Actions\StoreUserAction;
use Illuminate\Http\JsonResponse;

class StoreUserController
{
    public function __invoke(StoreUserRequest $request, StoreUserAction $storeUserAction): JsonResponse
    {
        $user = $storeUserAction->execute($request->toDto());

        return responder()
            ->success($user, UserTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
