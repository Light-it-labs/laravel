<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use App\Users\Transformers\UserTransformer;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;

class GetUserController
{
    public function __invoke(User $user): JsonResponse
    {
        return responder()
            ->success($user, UserTransformer::class)
            ->respond();
    }
}
