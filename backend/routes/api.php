<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\AdController;
use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\MembershipController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\TimingController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\HomeController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'reset']);

Route::middleware(['auth:sanctum', 'check.sanctum.auth.errors'])->group(function() {
    Route::post('user/{userId}', [AuthController::class, 'updateUser']);
    Route::get('users', [AuthController::class, 'getUsers']);
    Route::get('users/{role}', [AuthController::class, 'getUsersBasedOnRole']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('email-verification', [AuthController::class, 'emailVerification']);
    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');

    Route::get('activity', [ActivityController::class, 'read']);
    Route::post('activity', [ActivityController::class, 'create']);
    Route::post('activity/{activityId}', [ActivityController::class, 'update']);
    Route::delete('activity/{activityId}', [ActivityController::class, 'delete']);

    Route::get('chat', [ChatController::class, 'read']);
    Route::get('chat/{senderId}/{receiverId}', [ChatController::class, 'getChat']);
    Route::post('chat', [ChatController::class, 'create']);
    Route::get('chats/unread/{userId}', [ChatController::class, 'getUnreadChats']);
    Route::get('chats', [ChatController::class, 'getChats']);

    Route::get('event', [EventController::class, 'read']);
    Route::post('event', [EventController::class, 'create']);
    Route::post('event/{eventId}', [EventController::class, 'update']);
    Route::delete('event/{eventId}', [EventController::class, 'delete']);

    Route::get('membership', [MembershipController::class, 'read']);
    Route::post('membership', [MembershipController::class, 'create']);
    Route::post('membership/{membershipId}', [MembershipController::class, 'update']);

    Route::get('vehicle', [VehicleController::class, 'read']);
    Route::post('vehicle', [VehicleController::class, 'create']);
    Route::post('vehicle/{vehicleId}', [VehicleController::class, 'update']);
    Route::delete('vehicle/{vehicleId}', [VehicleController::class, 'delete']);

    Route::post('report', [ReportController::class, 'create']);
    Route::get('report', [ReportController::class, 'read']);
    Route::post('report/{reportId}', [ReportController::class, 'update']);
    Route::delete('report/{reportId}', [ReportController::class, 'delete']);

    Route::post('timing', [TimingController::class, 'create']);
    Route::get('timing', [TimingController::class, 'read']);
    Route::get('timing/{activity}', [TimingController::class, 'readByActivity']);
    Route::post('timing/{timingId}', [TimingController::class, 'update']);
    Route::delete('timing/{timingId}', [ReportController::class, 'delete']);
    
    Route::get('ad', [EventController::class, 'getAd']);
    Route::get('analytics', [ReportController::class, 'analytics']);
});

Route::any('{path}', function() {
    return response()->json([
        'message' => 'Not Found'
    ], 404);
})->where('path', '.*');