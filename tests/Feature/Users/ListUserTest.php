<?php

declare(strict_types=1);

namespace Tests\Feature\Users;

use App\Users\Controllers\StoreUserController;
use App\Users\Transformers\UserTransformer;
use Database\Factories\UserFactory;
use Domain\Users\Models\User;
use Illuminate\Support\Collection;
use function Pest\Laravel\getJson;

describe('users', function () {
    /** @see StoreUserController */
    it('can list users successfully', function () {
        /** @var Collection<int, User> $users */
        $users = UserFactory::new()
            ->count(5)
            ->create();

        $transformer = new UserTransformer();

        getJson(url('/api/users'))
            ->assertSuccessful()
            ->assertExactJson([
                'status' => 200,
                'success' => true,
                'data' => $users->map(fn(User $user) => $transformer->transform($user))->toArray(),
            ]);
    });
});
