<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;
use Lightit\Backoffice\Payers\Domain\Models\Payer;

/**
 *
 *
 * @property int                             $id
 * @property int                             $payer_id
 * @property int                             $dme_provider_id
 * @property string                          $state
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders query()
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereDmeProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders wherePayerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereUpdatedAt($value)
 *
 * @property-read DMEProvider $dmeProvider
 * @property-read Payer $payer
 * @property int $data_sync_id
 *
 * @method static \Illuminate\Database\Eloquent\Builder|PayersDMEProviders whereDataSyncId($value)
 *
 * @mixin \Eloquent
 */
class PayersDMEProviders extends Model
{
    protected $table = 'payers_dme_providers';
    protected $guarded = ['id'];

    /**
     * @return BelongsTo<Payer, PayersDMEProviders>
     */
    public function payer(): BelongsTo
    {
        return $this->belongsTo(Payer::class);
    }

    /**
     * @return BelongsTo<DMEProvider, PayersDMEProviders>
     */
    public function dmeProvider(): BelongsTo
    {
        return $this->belongsTo(DMEProvider::class);
    }
}
