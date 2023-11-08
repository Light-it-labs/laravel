<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use App\Users\DataTransferObjects\CreateUserDto;
use Domain\Users\Models\User;

class RegisterUserAction
{
    public function execute(CreateUserDto $newUser): User
    {
        return User::create([
            'mail' => $newUser->mail,
            'username' => $newUser->username,
            'password' => $newUser->password,
            'password_confirmation' => $newUser->password_confirmation
        ]);
    }
}
