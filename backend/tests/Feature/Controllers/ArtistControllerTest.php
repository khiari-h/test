<?php

namespace Tests\Feature\Controllers;

use App\Models\AdminUser;
use App\Models\Artist;
use App\Models\Concert;
use App\Models\Meeting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ArtistControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function index_returns_all_artists()
    {
        // Créer des artistes
        Artist::factory()->count(3)->create();

        // Appeler la méthode index
        $response = $this->getJson('/api/artists');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function show_returns_single_artist_with_relations()
    {
        // Créer un artiste avec des concerts et rencontres
        $artist = Artist::factory()->create();
        
        // Ajouter des concerts
        $concert1 = Concert::factory()->create();
        $concert2 = Concert::factory()->create();
        $artist->concerts()->attach($concert1, ['is_headliner' => true, 'performance_order' => 1]);
        $artist->concerts()->attach($concert2, ['is_headliner' => false, 'performance_order' => 2]);
        
        // Ajouter des rencontres
        Meeting::factory()->count(2)->create(['artist_id' => $artist->id]);

        // Appeler la méthode show
        $response = $this->getJson('/api/artists/' . $artist->id);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $artist->id,
                     'name' => $artist->name
                 ])
                 ->assertJsonCount(2, 'concerts')
                 ->assertJsonCount(2, 'meetings');
    }

    /** @test */
    public function store_creates_new_artist()
    {
        // Créer un admin
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);

        // Données pour un nouvel artiste
        $artistData = [
            'name' => 'New Artist',
            'description' => 'Artist description',
            'image_url' => 'https://example.com/image.jpg',
            'genre' => 'Rock'
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/artists', $artistData);

        // Vérifier la réponse
        $response->assertStatus(201)
                 ->assertJson([
                     'name' => 'New Artist',
                     'description' => 'Artist description',
                     'image_url' => 'https://example.com/image.jpg',
                     'genre' => 'Rock'
                 ]);

        // Vérifier que l'artiste a été créé en base de données
        $this->assertDatabaseHas('artists', [
            'name' => 'New Artist',
            'genre' => 'Rock'
        ]);
    }

    /** @test */
    public function store_validates_input()
    {
        // Créer un admin
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);

        // Données incomplètes
        $artistData = [
            // Manque le champ name qui est requis
            'description' => 'Artist description'
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/artists', $artistData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function update_modifies_existing_artist()
    {
        // Créer un admin et un artiste
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create([
            'name' => 'Original Name',
            'description' => 'Original Description',
            'genre' => 'Jazz'
        ]);

        // Données pour la mise à jour
        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated Description'
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/artists/' . $artist->id, $updateData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $artist->id,
                     'name' => 'Updated Name',
                     'description' => 'Updated Description',
                     'genre' => 'Jazz'  // Ce champ ne devrait pas être modifié
                 ]);

        // Vérifier que l'artiste a été mis à jour en base de données
        $this->assertDatabaseHas('artists', [
            'id' => $artist->id,
            'name' => 'Updated Name',
            'description' => 'Updated Description',
            'genre' => 'Jazz'
        ]);
    }

    /** @test */
    public function update_validates_input()
    {
        // Créer un admin et un artiste
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create();

        // Données de mise à jour avec un name vide
        $updateData = [
            'name' => '',  // nom vide qui est invalide
            'description' => 'Valid description'
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/artists/' . $artist->id, $updateData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function destroy_removes_artist()
    {
        // Créer un admin et un artiste
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create();

        // Appeler la méthode destroy
        $response = $this->deleteJson('/api/admin/artists/' . $artist->id);

        // Vérifier la réponse
        $response->assertStatus(204);

        // Vérifier que l'artiste a été supprimé de la base de données
        $this->assertDatabaseMissing('artists', [
            'id' => $artist->id
        ]);
    }

}