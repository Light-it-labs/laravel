<?php

declare(strict_types=1);

namespace Domain\Users\Actions;

use Domain\Users\DataTransferObjects\UserDto;
use Domain\Users\Models\User;
use Illuminate\Contracts\Hashing\Hasher;

class StoreUserAction
{
    public function __construct(private readonly Hasher $hasher)
    {
    }

    public function execute(UserDto $userDto): User
    {
        return User::create([
            'name' => $userDto->getName(),
            'email' => $userDto->getEmail(),
            'password' => $this->hasher->make($userDto->getPassword()),
        ]);
    }
}
