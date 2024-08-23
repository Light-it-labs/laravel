<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Models;

use Illuminate\Database\Eloquent\Model;
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
 *
 * @mixin \Eloquent
 */
class PayersDMEProviders extends Model
{
    protected $table = 'payers_dme_providers';
    protected $guarded = ['id'];

    public function payer()
    {
        return $this->belongsTo(Payer::class);
    }

    public function dmeProvider()
    {
        return $this->belongsTo(DMEProvider::class);
    }
}
