<?php

declare(strict_types=1);

namespace Tests\Feature;

it('the application returns a successful response', function () {
    $this->withoutVite();
    $response = $this->get('/');
    $response->assertStatus(200);
});
