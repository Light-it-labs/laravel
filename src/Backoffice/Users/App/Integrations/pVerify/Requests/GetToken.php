<?php

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
            'client_id' => $this->connector()->getApiId(),
            'client_secret' => $this->connector()->getSecret(),
            'grant_type' => 'client_credentials',
        ];
    }
}
