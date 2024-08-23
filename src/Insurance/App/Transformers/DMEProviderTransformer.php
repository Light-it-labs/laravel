<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\DMEProviderDto;

class DMEProviderTransformer extends Transformer
{
    public function transform(DMEProviderDto $dMEProvider): array
    {
        return [
            'id' => $dMEProvider->id,
            'name' => $dMEProvider->name,
            'phone' => $dMEProvider->phone,
            'state' => $dMEProvider->state->value,
        ];
    }
}
