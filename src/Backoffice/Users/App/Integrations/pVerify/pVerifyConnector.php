<?php

namespace Lightit\Backoffice\Users\App\Integrations\pVerify;

use Saloon\Http\Connector;

class pVerifyConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        return config('services.pverify.base_url');
    }

    protected function defaultHeaders(): array
    {
        return [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ];
    }

    public function getApiId(): string
    {
        return (string) config('services.pverify.client_api_id');
    }

    public function getSecret(): string
    {
        return (string) config('services.pverify.client_secret');
    }
}
