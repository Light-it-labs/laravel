<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Routing\Console\ControllerMakeCommand as BaseCommand;
use Illuminate\Support\Str;

class ControllerMakeCommand extends BaseCommand
{
    protected function buildParentReplacements()
    {
        $parentReplacements = parent::buildParentReplacements();

        /** @var string $parent */
        $parent = $this->option('parent');

        $parentModelClass = $this->parseModel($parent);

        $parentModelVariablePlural = Str::of(class_basename($parentModelClass))->lcfirst()->plural();

        return [
            ...$parentReplacements,
            '{{ parentModelVariablePlural }}' => $parentModelVariablePlural,
            '{{parentModelVariablePlural}}' => $parentModelVariablePlural,
        ];
    }

    protected function buildModelReplacements(array $replace)
    {
        $parentReplacements = parent::buildModelReplacements($replace);

        /** @var string $model */
        $model = $this->option('model');

        $modelClass = $this->parseModel($model);

        $modelVariablePlural = Str::of(class_basename($modelClass))->lcfirst()->plural();

        return array_merge($replace, [
            ...$parentReplacements,
            '{{ modelVariablePlural }}' => $modelVariablePlural,
            '{{modelVariablePlural}}' => $modelVariablePlural,
        ]);
    }
}
