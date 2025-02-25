<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Schema::defaultStringLength(191);
        
        // Enregistrement des middlewares
        Route::aliasMiddleware('admin', \App\Http\Middleware\AdminMiddleware::class);
        Route::aliasMiddleware('csp', \App\Http\Middleware\ContentSecurityPolicy::class); // Ajout du middleware CSP
        
        // Configuration de Sanctum
        config([
            'sanctum.stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),
            'session.domain' => env('SESSION_DOMAIN', 'localhost'),
            'cors.supports_credentials' => true,
            'cors.allowed_origins' => ['http://localhost:3000'],
            // Ajout de configurations supplémentaires pour la sécurité
            'session.same_site' => 'lax',
            'sanctum.middleware' => [
                'verify_csrf_token' => \App\Http\Middleware\VerifyCsrfToken::class,
                'encrypt_cookies' => \App\Http\Middleware\EncryptCookies::class,
            ],
        ]);
    }
}