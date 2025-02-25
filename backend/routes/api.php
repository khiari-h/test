<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    NewsController,
    NewsletterController,
    PartnerController,
    ArtistController,
    ConcertController,
    MeetingController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ces routes sont chargées par le RouteServiceProvider et préfixées par "/api".
|
*/

// Route CSRF
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

/*
|--------------------------------------------------------------------------
| Routes Publiques
|--------------------------------------------------------------------------
*/

// Authentification
Route::post('/login', [AuthController::class, 'login']);

// Newsletter
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

// News
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);

// Partenaires  
Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/partners/{partner}', [PartnerController::class, 'show']);

// Artistes
Route::get('/artists', [ArtistController::class, 'index']);
Route::get('/artists/{artist}', [ArtistController::class, 'show']);

// Concerts
Route::get('/concerts', [ConcertController::class, 'index']);
Route::get('/concerts/{concert}', [ConcertController::class, 'show']);

// Rencontres
Route::get('/meetings', [MeetingController::class, 'index']);
Route::get('/meetings/{meeting}', [MeetingController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Routes Protégées (Admin)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Vérification token et déconnexion
    Route::prefix('admin')->group(function () {
        Route::get('/verify-token', [AuthController::class, 'verifyToken']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // Routes admin
    Route::prefix('admin')->group(function () {
        // Gestion des concerts
        Route::prefix('concerts')->group(function () {
            Route::post('/', [ConcertController::class, 'store']);
            Route::put('/{concert}', [ConcertController::class, 'update']);
            Route::delete('/{concert}', [ConcertController::class, 'destroy']);
        });

        // Gestion des rencontres 
        Route::prefix('meetings')->group(function () {
            Route::post('/', [MeetingController::class, 'store']);
            Route::put('/{meeting}', [MeetingController::class, 'update']);
            Route::delete('/{meeting}', [MeetingController::class, 'destroy']);
        });

        // Gestion des news
        Route::prefix('news')->group(function () {
            Route::post('/', [NewsController::class, 'store']);
            Route::put('/{news}', [NewsController::class, 'update']);
            Route::delete('/{news}', [NewsController::class, 'destroy']);
        });
    });
});