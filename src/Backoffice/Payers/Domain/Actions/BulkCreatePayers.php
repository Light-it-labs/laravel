<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Payers\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;
use Lightit\Backoffice\Payers\Domain\Models\Payer;

class BulkCreatePayers
{
    /**
     * @param Collection<int, Payer> $payers
     */
    public function execute(Collection $payers, Datasync $datasync): int
    {
        $payersArray = Arr::map($payers->toArray(), function ($payer) use ($datasync) {
            $result = $payer->toArray();
            $result['created_at'] = now();
            $result['data_sync_id'] = $datasync->id;

            return $result;
        });
        DB::transaction(function () use ($payersArray) {
            Payer::insert($payersArray);
        });

        return 0;
    }
}
