<?php

declare(strict_types=1);

namespace App\Users\Transformers;

use Domain\Users\Models\User;
use Flugg\Responder\Transformers\Transformer;

class UserTransformer extends Transformer
{
    /**
     * @return array<string, mixed>
     */
    public function transform(User $user): array
    {
        return [
            'id' => $user->id,
            'mail' => $user->mail,
            'username' => $user->username,
            'password' => $user->password,
        ];
    }
}
