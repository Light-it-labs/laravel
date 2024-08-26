<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Datasyncs\Domain\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync query()
 *
 * @property int                             $id
 * @property string                          $sync_method
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync whereSyncMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Datasync whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Datasync extends Model
{
    protected $guarded = ['id'];
    protected $table = 'data_syncs';
}
