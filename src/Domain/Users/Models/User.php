<?php

declare(strict_types=1);

namespace Domain\Users\Models;

use Illuminate\Foundation\Auth\User as AuthUser;

class User extends AuthUser
{
    protected $guarded = [];
}
