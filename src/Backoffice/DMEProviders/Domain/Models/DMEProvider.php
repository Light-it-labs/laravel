<?php

declare(strict_types=1);

namespace Lightit\Backoffice\DMEProviders\Domain\Models;

use Illuminate\Database\Eloquent\Model;

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
 * @mixin \Eloquent
 */
class DMEProvider extends Model
{
    protected $guarded = ['id'];

    protected $table = 'dme_providers';
}
