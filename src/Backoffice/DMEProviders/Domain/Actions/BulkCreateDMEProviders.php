<?php

declare(strict_types=1);

namespace Lightit\Backoffice\DMEProviders\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;

class BulkCreateDMEProviders
{
    /**
     * @param Collection<int, DMEProvider> $providers
     */
    public function execute(Collection $providers, Datasync $datasync): int
    {
        $providersArray = Arr::map($providers->toArray(), function ($provider) use ($datasync) {
            $result = $provider->toArray();
            $result['created_at'] = now();
            $result['data_sync_id'] = $datasync->id;

            return $result;
        });
        DB::transaction(function () use ($providersArray) {
            DMEProvider::insert($providersArray);
        });

        return 0;
    }
}
