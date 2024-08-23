<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\App\Integrations\pVerify\Requests;

use Lightit\Backoffice\Users\App\Integrations\pVerify\pVerifyConnector;
use Saloon\Enums\Method;
use Saloon\Http\Request;
use Saloon\Traits\Request\HasConnector;

class GetToken extends Request
{
    use HasConnector;

    protected string $connector = pVerifyConnector::class;
    protected Method $method = Method::POST;

    public function resolveEndpoint(): string
    {
        return '/Token';
    }

    protected function defaultBody(): array
    {
        return [
            'client_id' => config('services.pverify.client_api_id'),
            'client_secret' => config('services.pverify.client_secret'),
            'grant_type' => 'client_credentials',
        ];
    }
}
