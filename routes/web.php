<?php

use App\Http\Controllers\LanguageController;
use App\Library\Tool;
use App\Models\AppConfig;
use App\Models\Campaigns;
use App\Models\EmailTemplates;
use App\Models\PaymentMethods;
use Database\Seeders\Countries;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Output\BufferedOutput;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    if (config('app.stage') == 'new') {
        return redirect('install');
    }

    if (config('app.stage') == 'Live' && config('app.version') == '2.8') {
        return redirect('update');
    }

    return redirect('login');
});

// locale Route
Route::get('lang/{locale}', [LanguageController::class, 'swap']);
Route::any('languages', [LanguageController::class, 'languages'])->name('languages');

if (config('app.stage') == 'local') {
    Route::get('run-campaign', function () {

        $campaign = Campaigns::find(5);
        if ($campaign) {
            $campaign->singleProcess();
        }
    });

    Route::get('update-file', function (BufferedOutput $outputLog) {
        $app_path = base_path().'/bootstrap/cache/';
        if (File::isDirectory($app_path)) {
            File::cleanDirectory($app_path);
        }

        Artisan::call('optimize:clear');
        Artisan::call('migrate', ['--force' => true], $outputLog);
        Tool::versionSeeder(config('app.version'));

        AppConfig::setEnv('APP_VERSION', '3.4.0');

        return redirect()->route('login')->with([
                'status'  => 'success',
                'message' => 'You have successfully updated your application.',
        ]);
    });

    Route::get('update-country', function () {
        $countries = new Countries();
        $countries->run();
    });

    Route::get('debug', function () {

        $app_config = AppConfig::where('setting', 'login_notification_email')->first();
        if ( ! $app_config) {
            AppConfig::create([
                    'setting' => 'login_notification_email',
                    'value'   => false,
            ]);
        }

        $email_template = EmailTemplates::where('slug', 'sender_id_confirmation')->first();

        if ( ! $email_template) {
            EmailTemplates::create(
                    [
                            'name'    => 'Sender ID Confirmation',
                            'slug'    => 'sender_id_confirmation',
                            'subject' => 'Sender ID Confirmation on {app_name}',
                            'content' => 'Hi,
                                      You sender id mark as: {status}. Login to your portal to show details.
                                      {sender_id_url}',
                            'status'  => true,
                    ]);
        }

        $payment_method = PaymentMethods::where('type', 'paygateglobal')->first();
        if ( ! $payment_method) {
            PaymentMethods::create(
                    [
                            'name'    => 'PaygateGlobal',
                            'type'    => 'paygateglobal',
                            'options' => json_encode([
                                    'api_key' => 'api_key',
                            ]),
                            'status'  => true,
                    ]);
        }


        return 'success';

    });

}

Route::get('/clear', function () {

    Artisan::call('optimize:clear');

    return "Cleared!";

});
