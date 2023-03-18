<?php

namespace App\Http\Requests\Campaigns;

use App\Rules\ExcelRule;
use Illuminate\Foundation\Http\FormRequest;

class ImportVoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return $this->user()->can('voice_bulk_messages');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
                'name'           => 'required',
                'sending_server' => 'required|exists:plans_sending_servers,sending_server_id',
                'import_file'    => ['required', new ExcelRule(request()->file('import_file'))],
                'timezone'       => 'required_if:schedule,true|timezone',
                'schedule_date'  => 'required_if:schedule,true|date|nullable',
                'schedule_time'  => 'required_if:schedule,true|date_format:H:i',
                'language'       => 'required',
                'gender'         => 'required',
        ];
    }
}
