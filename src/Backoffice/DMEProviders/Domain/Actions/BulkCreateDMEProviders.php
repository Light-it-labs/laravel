<?php

declare(strict_types=1);

namespace Lightit\Backoffice\DMEProviders\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;

class BulkCreateDMEProviders
{
    public function execute(Collection $providers)
    {
        $providersArray = Arr::map($providers->toArray(), function ($provider) {
            $result = $provider->toArray();
            $result['created_at'] = now();

            return $result;
        });
        DB::transaction(function () use ($providersArray) {
            DMEProvider::insert($providersArray);
        });
    }
}
