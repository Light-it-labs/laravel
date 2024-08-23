<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\Actions;

use Illuminate\Support\Collection;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\DMEProviderDto;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\GetAvailableDMEProvidersDto;

class GetAvailableDMEProvidersAction
{
    /**
     * @return Collection<int, DMEProviderDto>
     */
    public function execute(GetAvailableDMEProvidersDto $getAvailableDMEProvidersDto): Collection
    {
        $dmeProviders = [
            new DMEProviderDto(
                id: '1',
                //cspell: disable-next-line
                name: 'Byram Healthcare',
                phone: '800-775-4372 Ext. 39027',
                state: $getAvailableDMEProvidersDto->state,
            ),
            new DMEProviderDto(
                id: '2',
                name: 'United States Medical Supply',
                phone: '800-321-0591',
                state: $getAvailableDMEProvidersDto->state,
            ),

        ];
        
        return collect($dmeProviders);
    }
}
