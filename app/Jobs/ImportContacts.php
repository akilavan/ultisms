<?php

namespace App\Jobs;

use App\Models\Contacts;
use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberUtil;

/**
 * @method batch()
 */
class ImportContacts implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $customer_id;
    protected $group_id;
    protected $list;
    protected $db_fields;

    /**
     * Delete the job if its models no longer exist.
     *
     * @var bool
     */
    public bool $deleteWhenMissingModels = true;

    /**
     * Create a new job instance.
     *
     * @param $customer_id
     * @param $group_id
     * @param $list
     * @param $db_fields
     */
    public function __construct($customer_id, $group_id, $list, $db_fields)
    {
        $this->list        = $list;
        $this->customer_id = $customer_id;
        $this->group_id    = $group_id;
        $this->db_fields   = $db_fields;
    }

    /**
     * Execute the job.
     *
     * @return void
     * @throws NumberParseException
     */
    public function handle(): void
    {
        $list = [];
        foreach ($this->list as $line) {
            $get_data = array_combine($this->db_fields, $line);
            unset($get_data['--']);
            $get_data['uid']         = uniqid();
            $get_data['customer_id'] = $this->customer_id;
            $get_data['group_id']    = $this->group_id;
            $get_data['status']      = 'subscribe';
            $get_data['created_at']  = now()->toDateTimeString();
            $get_data['updated_at']  = now()->toDateTimeString();

            if (isset($get_data['phone'])) {

                $phone = str_replace(['(', ')', '+', '-', ' '], '', $get_data['phone']);

                try {
                    $phoneUtil         = PhoneNumberUtil::getInstance();
                    $phoneNumberObject = $phoneUtil->parse('+'.$phone);
                    if ($phoneUtil->isPossibleNumber($phoneNumberObject)) {
                        $exist = Contacts::where('group_id', $this->group_id)->where('customer_id', $this->customer_id)->where('phone', $phone)->first();
                        if ( ! $exist) {
                            $get_data['phone'] = $phone;
                            $list[]            = $get_data;
                        }
                    }
                } catch (Exception) {
                    continue;
                }
            }
        }
        Contacts::insert($list);
    }

}
