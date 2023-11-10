<?php

declare(strict_types=1);

namespace App\Users\Requests;

use App\Users\DataTransferObjects\CreateUserDto;
use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mail' => ['required', 'unique:users,mail'],
            'username' => ['required', 'unique:users,username'],
            'password' => ['required', 'confirmed'],
        ];
    }

    public function toDto(): CreateUserDto
    {
        $dto = new CreateUserDto();
        $dto->mail = $this->input('mail');
        $dto->username = $this->input('username');
        $dto->password = $this->input('password');

        return $dto;
    }
}
