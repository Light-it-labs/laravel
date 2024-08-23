<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Lightit\Backoffice\Users\App\Controllers\DeleteUserController;
use Lightit\Backoffice\Users\App\Controllers\GetUserController;
use Lightit\Backoffice\Users\App\Controllers\ListUserController;
use Lightit\Backoffice\Users\App\Controllers\StoreUserController;
use Lightit\Insurance\App\Controllers\GetAvailableDMEProvidersController;
use Lightit\Insurance\App\Controllers\MedicareAdvantageEligibilityCheckController;
use Lightit\Insurance\App\Controllers\MedicareEligibilityCheckController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
Route::prefix('users')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class)->withTrashed();
        Route::post('/', StoreUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });

Route::post('/medicare/eligibility-check', MedicareEligibilityCheckController::class);
Route::post('/medicare-advantage/eligibility-check', MedicareAdvantageEligibilityCheckController::class);

Route::get('/dme/providers', GetAvailableDMEProvidersController::class);
