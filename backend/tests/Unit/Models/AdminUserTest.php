<?php

namespace Tests\Unit\Models;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminUserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $admin = new AdminUser();
        $fillable = $admin->getFillable();

        $this->assertEquals([
            'name',
            'email',
            'password',
        ], $fillable);
    }

    /** @test */
    public function it_has_hidden_attributes()
    {
        // Vérifier que les attributs sensibles sont bien cachés
        $admin = new AdminUser();
        $hidden = $admin->getHidden();

        $this->assertContains('password', $hidden);
        $this->assertContains('remember_token', $hidden);
    }

    /** @test */
    public function it_can_create_admin_user()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Vérifier que l'admin a été créé
        $this->assertDatabaseHas('admin_users', [
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
        ]);

        // Vérifier que le mot de passe a été haché
        $this->assertTrue(Hash::check('password123', $admin->password));
    }

    /** @test */
    public function it_can_generate_api_token()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Générer un token
        $token = $admin->createToken('admin-token')->plainTextToken;

        // Vérifier que le token a été créé
        $this->assertNotEmpty($token);
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => AdminUser::class,
            'tokenable_id' => $admin->id,
            'name' => 'admin-token'
        ]);
    }

    /** @test */
    public function it_enforces_unique_email()
    {
        // Créer un utilisateur admin
        AdminUser::create([
            'name' => 'Admin One',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Tenter de créer un autre admin avec le même email
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        AdminUser::create([
            'name' => 'Admin Two',
            'email' => 'admin@test.com',  // même email
            'password' => Hash::make('different_password')
        ]);
    }

    /** @test */
    public function it_can_update_admin_user()
    {
        // Créer un utilisateur admin
        $admin = AdminUser::create([
            'name' => 'Original Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123')
        ]);

        // Mettre à jour l'admin
        $admin->update([
            'name' => 'Updated Admin',
            'email' => 'updated@test.com'
        ]);

        // Vérifier que l'admin a été mis à jour
        $this->assertDatabaseHas('admin_users', [
            'id' => $admin->id,
            'name' => 'Updated Admin',
            'email' => 'updated@test.com',
        ]);
    }
}