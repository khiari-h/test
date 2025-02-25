<?php

namespace Tests\Feature\Auth;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_login_with_valid_credentials()
    {
        // Arrange - Créer un utilisateur admin pour le test
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
        ]);

        // Act - Tester la connexion
        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => 'password',
        ]);

        // Assert - Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'admin' => [
                         'id',
                         'name',
                         'email',
                     ]
                 ]);
    }

    /** @test */
    public function admin_cannot_login_with_invalid_credentials()
    {
        // Arrange - Créer un utilisateur admin pour le test
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
        ]);

        // Act - Tester la connexion avec mot de passe erroné
        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => 'wrong-password',
        ]);

        // Assert - Vérifier que la connexion est refusée
        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Les informations d\'identification sont incorrectes.'
                 ]);
    }

    /** @test */
    public function login_requires_email_and_password()
    {
        // Act - Tester la connexion sans fournir d'email ni de mot de passe
        $response = $this->postJson('/api/login', []);

        // Assert - Vérifier que la validation échoue
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'password']);
    }
}