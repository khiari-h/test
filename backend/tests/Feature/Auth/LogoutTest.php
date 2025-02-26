<?php

namespace Tests\Feature\Auth;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_logout()
    {
        // Arrange - Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
        ]);

        // Authentifier l'utilisateur
        Sanctum::actingAs($admin, ['*']);

        // Act - Tester la déconnexion
        $response = $this->postJson('/api/admin/logout');

        // Assert - Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Déconnexion réussie'
                 ]);
    }

    /** @test */
    public function verify_token_returns_valid_for_authenticated_user()
    {
        // Arrange - Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
        ]);

        // Authentifier l'utilisateur
        Sanctum::actingAs($admin, ['*']);

        // Act - Vérifier le token
        $response = $this->getJson('/api/admin/verify-token');

        // Assert - Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'valid' => true
                 ]);
    }

/** @test */
public function verify_token_returns_invalid_for_unauthenticated_user()
{
    // Act - Vérifier le token sans authentification
    $response = $this->getJson('/api/admin/verify-token');

    // Assert - Vérifier la réponse réelle de Sanctum
    $response->assertStatus(401)
             ->assertJson([
                 'message' => 'Unauthenticated.'
             ]);
}

    /** @test */
    public function unauthenticated_user_cannot_access_protected_routes()
    {
        // Act - Essayer d'accéder à une route protégée sans authentification
        $response = $this->postJson('/api/admin/concerts', [
            'name' => 'Test Concert',
            'description' => 'Test Description',
            'date' => now()->format('Y-m-d'),
            'start_time' => '19:00:00',
            'end_time' => '22:00:00',
            'venue' => 'Test Venue',
        ]);

        // Assert - Vérifier que l'accès est refusé
        $response->assertStatus(401);
    }
}