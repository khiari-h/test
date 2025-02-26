<?php

namespace Tests\Feature\Controllers;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_login_with_correct_credentials()
    {
        $admin = AdminUser::create([
            'name'     => 'Admin Test',
            'email'    => 'admin@test.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'admin@test.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'admin' => [
                         'id',
                         'name',
                         'email',
                     ],
                 ]);
    }

/** @test */
public function login_fails_with_incorrect_credentials()
{
    $response = $this->postJson('/api/login', [
        'email'    => 'admin@test.com',
        'password' => 'wrong_password',
    ]);

    $response->assertStatus(401);
}


public function admin_can_logout()
{
    // Générer un email unique pour éviter les conflits de contrainte d'unicité
    $email = 'admin_' . uniqid() . '@test.com';

    // Créer un utilisateur admin dans la base de données
    $admin = AdminUser::create([
        'name'     => 'Admin Test',
        'email'    => $email,
        'password' => Hash::make('password123'),
    ]);

    // Simuler une connexion pour obtenir un token
    // La route de login est /api/login selon routes/api.php
    $loginResponse = $this->postJson('/api/login', [
        'email'    => $email,
        'password' => 'password123',
    ]);

    // Récupérer le token depuis la réponse JSON
    $token = $loginResponse->json('token');

    // Ajouter le header Authorization avec le token Bearer
    $headers = ['Authorization' => 'Bearer ' . $token];

    // Effectuer la déconnexion
    // La route correcte est /api/admin/logout (préfixe api + admin)
    $logoutResponse = $this->postJson('/api/admin/logout', [], $headers);

    // Vérifier que la réponse a un statut 200 et le message attendu
    $logoutResponse->assertStatus(200)
                   ->assertJson(['message' => 'Déconnexion réussie']);
}





/** @test */
public function verify_token_returns_valid_for_authenticated_user()
{
    // Générer un email unique pour éviter les conflits d'unicité
    $email = 'admin_' . uniqid() . '@test.com';

    // Créer un utilisateur admin avec l'email unique
    $admin = AdminUser::create([
        'name'     => 'Admin Test',
        'email'    => $email,
        'password' => Hash::make('password123'),
    ]);

    // Simuler la connexion pour obtenir un token
    // Route de login : /api/login
    $loginResponse = $this->postJson('/api/login', [
        'email'    => $email,
        'password' => 'password123',
    ]);

    // Récupérer le token depuis la réponse
    $token = $loginResponse->json('token');

    // Préparer les headers avec le token Bearer
    $headers = ['Authorization' => 'Bearer ' . $token];

    // Vérifier si le token est valide
    // Route correcte : /api/admin/verify-token (préfixe api + admin)
    $response = $this->getJson('/api/admin/verify-token', $headers);

    // Vérifier que la réponse est 200 et que valid est true
    $response->assertStatus(200)
             ->assertJson(['valid' => true]);
}




    /** @test */
    public function verify_token_returns_invalid_for_unauthenticated_user()
    {
        // Sans header Authorization, la requête doit être considérée comme non authentifiée
        $response = $this->getJson('/api/admin/verify-token');

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Unauthenticated.',
                 ]);
    }

    /** @test */
    public function login_validation_requires_email_and_password()
    {
        $response = $this->postJson('/api/login', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'password']);
    }

    /** @test */
    public function login_validation_requires_valid_email_format()
    {
        $response = $this->postJson('/api/login', [
            'email'    => 'invalid-email',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }
}
