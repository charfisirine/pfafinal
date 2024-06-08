<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\CertificatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->group(function () {
    Route::apiResource('candidats', CandidatController::class);
    Route::apiResource('questions', QuestionController::class);
    Route::apiResource('formateurs', FormateurController::class);
    Route::apiResource('examens', ExamenController::class);
    Route::apiResource('certificats', CertificatController::class);

    // Candidat API Routes
    Route::post('/Candidat/register', [CandidatController::class, 'register']); // testé
    Route::post('/Candidat/login', [CandidatController::class, 'login']); // testé

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/Candidat/logout', [CandidatController::class, 'logout']); // testé
    });
    // Formateur API Routes
        Route::post('/Formateur/register', [FormateurController::class, 'register']);
        Route::post('/Formateur/login', [FormateurController::class, 'login']);//tested
        Route::middleware('auth:sanctum')->group(function () {
        Route::post('/Formateur/logout', [FormateurController::class, 'logout']);//tested

        });
});
