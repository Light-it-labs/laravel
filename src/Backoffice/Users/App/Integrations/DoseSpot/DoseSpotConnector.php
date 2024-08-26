<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\App\Integrations\DoseSpot;

use Saloon\Http\Connector;

class DoseSpotConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        /** @var string $url */
        $url = config('services.dosespot.base_url');

        return $url;
    }

    protected function defaultHeaders(): array
    {
        return [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ];
    }
}
