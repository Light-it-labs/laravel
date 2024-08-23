<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Payers\Domain\Actions;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Lightit\Backoffice\Payers\Domain\Models\Payer;

class BulkCreatePayers
{
    public function execute(Collection $payers)
    {
        $payersArray = Arr::map($payers->toArray(), function ($payer) {
            $result = $payer->toArray();
            $result['created_at'] = now();

            return $result;
        });
        DB::transaction(function () use ($payersArray) {
            Payer::insert($payersArray);
        });
    }
}
