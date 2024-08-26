<?php

declare(strict_types=1);

namespace Lightit\Backoffice\DMEProviders\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Backoffice\Datasyncs\Domain\Models\Datasync;

/**
 *
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $benefit_type
 * @property string                          $phone
 * @property string                          $fax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider query()
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereBenefitType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereFax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereUpdatedAt($value)
 *
 * @property int $data_sync_id
 *
 * @method static \Illuminate\Database\Eloquent\Builder|DMEProvider whereDataSyncId($value)
 *
 * @property-read Datasync|null $dataSync
 *
 * @mixin \Eloquent
 */
class DMEProvider extends Model
{
    protected $guarded = ['id'];

    protected $table = 'dme_providers';

    /**
     * @return BelongsTo<Datasync, DMEProvider>
     */
    public function dataSync(): BelongsTo
    {
        return $this->belongsTo(DataSync::class);
    }
}
