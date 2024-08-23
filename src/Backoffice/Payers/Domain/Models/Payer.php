<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Payers\Domain\Models;

use Illuminate\Database\Eloquent\Model;

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
 * @mixin \Eloquent
 */
class Payer extends Model
{
    protected $guarded = ['id'];
}
