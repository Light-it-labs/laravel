<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Routing\Console\ControllerMakeCommand as BaseCommand;
use Illuminate\Support\Str;

class ControllerMakeCommand extends BaseCommand
{
    protected function buildFormRequestReplacements(array $replace, $modelClass)
    {
        [$namespace, $storeRequestClass, $updateRequestClass] = [
            'Illuminate\\Foundation\\Http', 'FormRequest', 'FormRequest',
        ];

        if ($this->option('requests')) {
            $namespace = 'App\\Http\\Requests';

            [$storeRequestClass, $updateRequestClass] = $this->generateFormRequests(
                $modelClass,
                $storeRequestClass,
                $updateRequestClass
            );
        }

        $namespacedRequests = $namespace . '\\' . $storeRequestClass . ';';

        if ($storeRequestClass !== $updateRequestClass) {
            $namespacedRequests .= PHP_EOL . 'use ' . $namespace . '\\' . $updateRequestClass . ';';
        }

        return [
            ...$replace,
            '{{ storeRequest }}' => $storeRequestClass,
            '{{storeRequest}}' => $storeRequestClass,
            '{{ updateRequest }}' => $updateRequestClass,
            '{{updateRequest}}' => $updateRequestClass,
            '{{ namespacedStoreRequest }}' => $namespace . '\\' . $storeRequestClass,
            '{{namespacedStoreRequest}}' => $namespace . '\\' . $storeRequestClass,
            '{{ namespacedUpdateRequest }}' => $namespace . '\\' . $updateRequestClass,
            '{{namespacedUpdateRequest}}' => $namespace . '\\' . $updateRequestClass,
            '{{ namespacedRequests }}' => $namespacedRequests,
            '{{namespacedRequests}}' => $namespacedRequests,
        ];
    }

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

        return [
            ...$parentReplacements,
            '{{ modelVariablePlural }}' => $modelVariablePlural,
            '{{modelVariablePlural}}' => $modelVariablePlural,
        ];
    }
}
