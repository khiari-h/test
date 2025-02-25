<?php

namespace Tests\Feature\Controllers;

use App\Models\AdminUser;
use App\Models\Artist;
use App\Models\Concert;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ConcertControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function index_returns_all_concerts_with_artists()
    {
        // Créer des concerts
        $concerts = Concert::factory()->count(3)->create();
        
        // Créer des artistes et les associer aux concerts
        $artist = Artist::factory()->create();
        foreach ($concerts as $concert) {
            $concert->artists()->attach($artist, ['is_headliner' => true, 'performance_order' => 1]);
        }

        // Appeler la méthode index
        $response = $this->getJson('/api/concerts');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonStructure([
                     '*' => [
                         'id',
                         'name',
                         'description',
                         'date',
                         'start_time',
                         'end_time',
                         'venue',
                         'artists'
                     ]
                 ]);
    }

    /** @test */
    public function show_returns_single_concert_with_artists()
    {
        // Créer un concert et des artistes
        $concert = Concert::factory()->create();
        $artist1 = Artist::factory()->create();
        $artist2 = Artist::factory()->create();
        
        // Associer les artistes au concert
        $concert->artists()->attach($artist1, ['is_headliner' => true, 'performance_order' => 1]);
        $concert->artists()->attach($artist2, ['is_headliner' => false, 'performance_order' => 2]);

        // Appeler la méthode show
        $response = $this->getJson('/api/concerts/' . $concert->id);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $concert->id,
                     'name' => $concert->name
                 ])
                 ->assertJsonCount(2, 'artists');
    }

    /** @test */
    public function store_creates_new_concert()
    {
        // Créer un admin
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);

        // Données pour un nouveau concert
        $concertData = [
            'name' => 'New Concert',
            'description' => 'Concert description',
            'date' => '2023-12-31',
            'start_time' => '20:00:00',
            'end_time' => '23:00:00',
            'venue' => 'Concert Hall',
            'type' => 'Live'
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/concerts', $concertData);

        // Vérifier la réponse
        $response->assertStatus(201)
                 ->assertJson([
                     'name' => 'New Concert',
                     'description' => 'Concert description',
                     'date' => '2023-12-31',
                     'venue' => 'Concert Hall'
                 ]);

        // Vérifier que le concert a été créé en base de données
        $this->assertDatabaseHas('concerts', [
            'name' => 'New Concert',
            'venue' => 'Concert Hall'
        ]);
    }

    /** @test */
    public function store_creates_concert_with_artists()
    {
        // Créer un admin et des artistes
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist1 = Artist::factory()->create();
        $artist2 = Artist::factory()->create();

        // Données pour un nouveau concert avec artistes
        $concertData = [
            'name' => 'Concert With Artists',
            'description' => 'Concert description',
            'date' => '2023-12-31',
            'start_time' => '20:00:00',
            'end_time' => '23:00:00',
            'venue' => 'Concert Hall',
            'type' => 'Live',
            'artists' => [
                [
                    'id' => $artist1->id,
                    'is_headliner' => true,
                    'performance_order' => 1
                ],
                [
                    'id' => $artist2->id,
                    'is_headliner' => false,
                    'performance_order' => 2
                ]
            ]
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/concerts', $concertData);

        // Vérifier la réponse
        $response->assertStatus(201)
                 ->assertJson([
                     'name' => 'Concert With Artists'
                 ])
                 ->assertJsonCount(2, 'artists');

        // Récupérer l'ID du concert créé
        $concertId = $response->json('id');

        // Vérifier que les relations avec les artistes ont été créées
        $this->assertDatabaseHas('concert_artist', [
            'concert_id' => $concertId,
            'artist_id' => $artist1->id,
            'is_headliner' => 1,
            'performance_order' => 1
        ]);
        $this->assertDatabaseHas('concert_artist', [
            'concert_id' => $concertId,
            'artist_id' => $artist2->id,
            'is_headliner' => 0,
            'performance_order' => 2
        ]);
    }

    /** @test */
    public function store_validates_input()
    {
        // Créer un admin
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);

        // Données incomplètes
        $concertData = [
            'name' => 'Invalid Concert',
            // Manquent plusieurs champs requis
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/concerts', $concertData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['description', 'date', 'start_time', 'end_time', 'venue']);
    }

    /** @test */
    public function update_modifies_existing_concert()
    {
        // Créer un admin et un concert
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $concert = Concert::factory()->create([
            'name' => 'Original Concert',
            'description' => 'Original Description',
            'venue' => 'Original Venue'
        ]);

        // Données pour la mise à jour
        $updateData = [
            'name' => 'Updated Concert',
            'description' => 'Updated Description',
            'venue' => 'New Venue'
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/concerts/' . $concert->id, $updateData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $concert->id,
                     'name' => 'Updated Concert',
                     'description' => 'Updated Description',
                     'venue' => 'New Venue'
                 ]);

        // Vérifier que le concert a été mis à jour en base de données
        $this->assertDatabaseHas('concerts', [
            'id' => $concert->id,
            'name' => 'Updated Concert',
            'venue' => 'New Venue'
        ]);
    }

    /** @test */
    public function update_can_modify_concert_artists()
    {
        // Créer un admin, un concert et des artistes
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $concert = Concert::factory()->create();
        $existingArtist = Artist::factory()->create();
        $newArtist = Artist::factory()->create();
        
        // Associer un artiste initial
        $concert->artists()->attach($existingArtist, ['is_headliner' => false, 'performance_order' => 1]);

        // Données pour la mise à jour avec nouveaux artistes
        $updateData = [
            'name' => 'Concert With New Artists',
            'description' => $concert->description, // garder la description originale
            'date' => $concert->date->format('Y-m-d'),
            'start_time' => $concert->start_time,
            'end_time' => $concert->end_time,
            'venue' => $concert->venue,
            'artists' => [
                [
                    'id' => $newArtist->id,
                    'is_headliner' => true,
                    'performance_order' => 1
                ]
            ]
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/concerts/' . $concert->id, $updateData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonCount(1, 'artists')
                 ->assertJson([
                     'name' => 'Concert With New Artists',
                     'artists' => [
                         [
                             'id' => $newArtist->id,
                             'pivot' => [
                                 'is_headliner' => true,
                                 'performance_order' => 1
                             ]
                         ]
                     ]
                 ]);

        // Vérifier que les relations ont été mises à jour
        $this->assertDatabaseMissing('concert_artist', [
            'concert_id' => $concert->id,
            'artist_id' => $existingArtist->id
        ]);
        $this->assertDatabaseHas('concert_artist', [
            'concert_id' => $concert->id,
            'artist_id' => $newArtist->id,
            'is_headliner' => 1,
            'performance_order' => 1
        ]);
    }

    /** @test */
    public function destroy_removes_concert()
    {
        // Créer un admin et un concert
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $concert = Concert::factory()->create();
        
        // Appeler la méthode destroy
        $response = $this->deleteJson('/api/admin/concerts/' . $concert->id);

        // Vérifier la réponse
        $response->assertStatus(204);

        // Vérifier que le concert a été supprimé
        $this->assertDatabaseMissing('concerts', [
            'id' => $concert->id
        ]);
    }

    /** @test */
    public function non_admin_cannot_create_concert()
    {
        // Données pour un nouveau concert
        $concertData = [
            'name' => 'Unauthorized Concert',
            'description' => 'This should not be created',
            'date' => '2023-12-31',
            'start_time' => '20:00:00',
            'end_time' => '23:00:00',
            'venue' => 'Concert Hall'
        ];

        // Appeler la méthode store sans être authentifié
        $response = $this->postJson('/api/admin/concerts', $concertData);

        // Vérifier que l'accès est refusé
        $response->assertStatus(401);

        // Vérifier que le concert n'a pas été créé
        $this->assertDatabaseMissing('concerts', [
            'name' => 'Unauthorized Concert'
        ]);
    }
}