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
use App\Http\Controllers\ReponseController;
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
    Route::post('/examens/{examenId}/assign-questions',  [ExamenController::class, 'assignQuestionsToExamen']);
    Route::apiResource('certificats', CertificatController::class);
    Route::apiResource('reponses', ReponseController::class);

    Route::middleware('api')->prefix('api')->group(function () {
        Route::get('/examens/search', [ExamenController::class, 'searchSimple']);
        Route::post('/examens/generate', [ExamenController::class, 'generateExamenWithDifficulty']);

    });



    // Candidat API Routes
    Route::post('/candidat/register', [CandidatController::class, 'register']); // testé
    Route::post('/candidat/login', [CandidatController::class, 'login']); // testé

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/candidat/logout', [CandidatController::class, 'logout']); // testé
    });
    // Formateur API Routes
        Route::post('/formateur/register', [FormateurController::class, 'register']);
        Route::post('/formateur/login', [FormateurController::class, 'login']);//tested
        Route::middleware('auth:sanctum')->group(function () {
        Route::post('/formateur/logout', [FormateurController::class, 'logout']);//tested

        });
});
