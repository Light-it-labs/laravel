<?php

declare(strict_types=1);

namespace App\Users\Controllers;

use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;

class DeleteUserController
{
    public function __invoke(User $user): JsonResponse
    {
        $user->delete();

        return responder()
            ->success()
            ->respond();
    }
}
