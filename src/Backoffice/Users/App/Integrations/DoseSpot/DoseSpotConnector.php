<?php

namespace Lightit\Backoffice\Users\App\Integrations\DoseSpot;

use Saloon\Http\Connector;

class DoseSpotConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        return config('services.dosespot.base_url');
    }

    protected function defaultHeaders(): array
    {
        return [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ];
    }
}
