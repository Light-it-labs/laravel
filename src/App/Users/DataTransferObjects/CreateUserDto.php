<?php

declare(strict_types=1);

namespace App\Users\DataTransferObjects;

class CreateUserDto
{
    public string $mail;
    public string $username;
    public string $password;
    public string $password_confirmation;
}
