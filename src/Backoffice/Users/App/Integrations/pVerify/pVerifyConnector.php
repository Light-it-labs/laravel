<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\App\Integrations\pVerify;

use Saloon\Http\Connector;

class pVerifyConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        /** @var string $url */
        $url = config('services.pverify.base_url');

        return $url;
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
        /** @var string $apiId */
        $apiId = config('services.pverify.client_api_id');

        return $apiId;
    }

    public function getSecret(): string
    {
        /** @var string $apiSecret */
        $apiSecret = config('services.pverify.client_secret');

        return $apiSecret;
    }
}
