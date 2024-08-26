<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Payers\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;

/**
 *
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Payer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereUpdatedAt($value)
 *
 * @property int $data_sync_id
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Payer whereDataSyncId($value)
 *
 * @property-read Datasync|null $dataSync
 *
 * @mixin \Eloquent
 */
class Payer extends Model
{
    protected $guarded = ['id'];

    /**
     * @return BelongsTo<Datasync, Payer>
     */
    public function dataSync(): BelongsTo
    {
        return $this->belongsTo(DataSync::class);
    }
}
