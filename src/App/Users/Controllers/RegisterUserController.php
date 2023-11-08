<?php

declare(strict_types=1);
namespace App\Users\Controllers;

use App\Users\Requests\RegisterUserRequest;
use App\Users\Transformers\UserTransformer;
use Domain\Users\Actions\RegisterUserAction;
use Illuminate\Http\JsonResponse;
use Support\Controllers\Controller;

class RegisterUserController extends Controller
{
    public function __invoke(RegisterUserRequest $request, RegisterUserAction $registerUserAction): JsonResponse
    {
        $user = $registerUserAction->execute($request->toDto());
        return responder()->success($user, UserTransformer::class)->respond();
    }
}
