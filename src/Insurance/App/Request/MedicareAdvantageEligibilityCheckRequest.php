<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\MedicareAdvantageEligibilityCheckDto;

class MedicareAdvantageEligibilityCheckRequest extends FormRequest
{
    public const MEMBER_ID = 'member_id';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const DOB = 'dob';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::MEMBER_ID => ['required', 'string'],
            self::FIRST_NAME => ['required', 'string'],
            self::LAST_NAME => ['required', 'string'],
            self::DOB => ['required', 'date'],
        ];
    }

    public function toDto(): MedicareAdvantageEligibilityCheckDto
    {
        /** @var Carbon $dob */
        $dob = $this->date(self::DOB);
        
        return new MedicareAdvantageEligibilityCheckDto(
            member_id: $this->string(self::MEMBER_ID)->toString(),
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            dob: $dob,
        );
    }
}
