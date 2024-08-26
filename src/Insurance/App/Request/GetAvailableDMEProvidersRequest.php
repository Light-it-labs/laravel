<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Lightit\Insurance\Domain\DataTransferObjects\GetAvailableDMEProvidersDto;
use Lightit\Shared\App\Enums\USState;

class GetAvailableDMEProvidersRequest extends FormRequest
{
    public const PAYER = 'payer';
    public const STATE = 'state';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::PAYER => ['required', 'string'],
            self::STATE => ['required', new Enum(USState::class)],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('state') && is_string($this->state)) {
            $this->merge([
                'state' => strtoupper($this->state),
            ]);
        }
    }

    public function toDto(): GetAvailableDMEProvidersDto
    {
        return new GetAvailableDMEProvidersDto(
            payer: $this->string(self::PAYER)->toString(),
            state: USState::from($this->string(self::STATE)->toString()),
        );
    }
}
