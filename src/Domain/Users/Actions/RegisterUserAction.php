<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use App\Users\DataTransferObjects\CreateUserDto;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class RegisterUserAction
{
    public function execute(CreateUserDto $newUser): User
    {
        User::create([
            'mail' => $newUser->mail,
            'username' => $newUser->username,
            'password' => Hash::make($newUser->password),
        ]);

        Auth::attempt(['mail'=> $newUser->mail, 'password' => $newUser->password]);
        Session::regenerate();

        /** @var User $user */
        $user = Auth::user();
        return $user;
    }
}
