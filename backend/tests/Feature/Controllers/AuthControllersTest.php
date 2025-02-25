<?php

namespace Tests\Feature\Controllers;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_login_with_correct_credentials()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Tentative de connexion
        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => 'password123'
        ]);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'admin' => [
                         'id',
                         'name',
                         'email'
                     ]
                 ]);
    }

    /** @test */
    public function login_fails_with_incorrect_credentials()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Tentative de connexion avec mot de passe incorrect
        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => 'wrong_password'
        ]);

        // Vérifier que la connexion est refusée
        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Les informations d\'identification sont incorrectes.'
                 ]);
    }

    /** @test */
    public function admin_can_logout()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Simuler une connexion via Sanctum
        Sanctum::actingAs($admin, ['*']);

        // Tentative de déconnexion
        $response = $this->postJson('/api/admin/logout');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Déconnexion réussie'
                 ]);
    }

    /** @test */
    public function verify_token_returns_valid_for_authenticated_user()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Simuler une connexion via Sanctum
        Sanctum::actingAs($admin, ['*']);

        // Vérifier le token
        $response = $this->getJson('/api/admin/verify-token');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'valid' => true
                 ]);
    }

    /** @test */
    public function verify_token_returns_invalid_for_unauthenticated_user()
    {
        // Vérifier le token sans être authentifié
        $response = $this->getJson('/api/admin/verify-token');

        // Vérifier la réponse
        $response->assertStatus(401)
                 ->assertJson([
                     'valid' => false
                 ]);
    }

    /** @test */
    public function login_validation_requires_email_and_password()
    {
        // Tentative de connexion sans email ni mot de passe
        $response = $this->postJson('/api/login', []);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'password']);
    }

    /** @test */
    public function login_validation_requires_valid_email_format()
    {
        // Tentative de connexion avec un format d'email invalide
        $response = $this->postJson('/api/login', [
            'email' => 'invalid-email',
            'password' => 'password123'
        ]);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }
}