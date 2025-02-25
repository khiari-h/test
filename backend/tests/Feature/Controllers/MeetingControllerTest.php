<?php

namespace Tests\Feature\Controllers;

use App\Models\AdminUser;
use App\Models\Artist;
use App\Models\Meeting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MeetingControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function index_returns_all_meetings_with_artist()
    {
        // Créer un artiste
        $artist = Artist::factory()->create();
        
        // Créer des rencontres
        Meeting::factory()->count(3)->create([
            'artist_id' => $artist->id
        ]);

        // Appeler la méthode index
        $response = $this->getJson('/api/meetings');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonStructure([
                     '*' => [
                         'id',
                         'artist_id',
                         'title',
                         'description',
                         'date',
                         'start_time',
                         'end_time',
                         'venue',
                         'type',
                         'artist' => [
                             'id',
                             'name'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function show_returns_single_meeting_with_artist()
    {
        // Créer un artiste et une rencontre
        $artist = Artist::factory()->create([
            'name' => 'Test Artist'
        ]);
        
        $meeting = Meeting::factory()->create([
            'artist_id' => $artist->id,
            'title' => 'Test Meeting',
            'description' => 'Test Description',
            'venue' => 'Test Venue',
            'type' => 'Meet and Greet'
        ]);

        // Appeler la méthode show
        $response = $this->getJson('/api/meetings/' . $meeting->id);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $meeting->id,
                     'artist_id' => $artist->id,
                     'title' => 'Test Meeting',
                     'description' => 'Test Description',
                     'venue' => 'Test Venue',
                     'type' => 'Meet and Greet',
                     'artist' => [
                         'id' => $artist->id,
                         'name' => 'Test Artist'
                     ]
                 ]);
    }

    /** @test */
    public function store_creates_new_meeting()
    {
        // Créer un admin et un artiste
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create();

        // Données pour une nouvelle rencontre
        $meetingData = [
            'artist_id' => $artist->id,
            'title' => 'New Meeting',
            'description' => 'Meeting description',
            'date' => '2023-12-31',
            'start_time' => '16:00:00',
            'end_time' => '18:00:00',
            'venue' => 'VIP Area',
            'type' => 'Signing Session'
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/meetings', $meetingData);

        // Vérifier la réponse
        $response->assertStatus(201)
                 ->assertJson([
                     'title' => 'New Meeting',
                     'description' => 'Meeting description',
                     'artist_id' => $artist->id,
                     'venue' => 'VIP Area',
                     'type' => 'Signing Session'
                 ]);

        // Vérifier que la rencontre a été créée en base de données
        $this->assertDatabaseHas('meetings', [
            'title' => 'New Meeting',
            'artist_id' => $artist->id,
            'venue' => 'VIP Area'
        ]);
    }

    /** @test */
    public function store_validates_input()
    {
        // Créer un admin
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);

        // Données incomplètes
        $meetingData = [
            'title' => 'Invalid Meeting',
            // Manquent plusieurs champs requis
        ];

        // Appeler la méthode store
        $response = $this->postJson('/api/admin/meetings', $meetingData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['artist_id', 'description', 'date', 'start_time', 'end_time', 'venue', 'type']);
    }

    /** @test */
    public function update_modifies_existing_meeting()
    {
        // Créer un admin, un artiste et une rencontre
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create();
        $meeting = Meeting::factory()->create([
            'artist_id' => $artist->id,
            'title' => 'Original Title',
            'description' => 'Original Description',
            'venue' => 'Original Venue'
        ]);

        // Données pour la mise à jour
        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'venue' => 'Updated Venue'
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/meetings/' . $meeting->id, $updateData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $meeting->id,
                     'artist_id' => $artist->id,
                     'title' => 'Updated Title',
                     'description' => 'Updated Description',
                     'venue' => 'Updated Venue'
                 ]);

        // Vérifier que la rencontre a été mise à jour en base de données
        $this->assertDatabaseHas('meetings', [
            'id' => $meeting->id,
            'title' => 'Updated Title',
            'venue' => 'Updated Venue'
        ]);
    }
    
    /** @test */
    public function update_can_change_meeting_artist()
    {
        // Créer un admin, deux artistes et une rencontre
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $originalArtist = Artist::factory()->create();
        $newArtist = Artist::factory()->create();
        
        $meeting = Meeting::factory()->create([
            'artist_id' => $originalArtist->id,
            'title' => 'Original Meeting'
        ]);

        // Données pour la mise à jour avec un nouvel artiste
        $updateData = [
            'artist_id' => $newArtist->id,
            'title' => 'Meeting With New Artist'
        ];

        // Appeler la méthode update
        $response = $this->putJson('/api/admin/meetings/' . $meeting->id, $updateData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $meeting->id,
                     'artist_id' => $newArtist->id,
                     'title' => 'Meeting With New Artist',
                     'artist' => [
                         'id' => $newArtist->id
                     ]
                 ]);

        // Vérifier que la rencontre a été mise à jour en base de données
        $this->assertDatabaseHas('meetings', [
            'id' => $meeting->id,
            'artist_id' => $newArtist->id,
            'title' => 'Meeting With New Artist'
        ]);
    }

    /** @test */
    public function destroy_removes_meeting()
    {
        // Créer un admin, un artiste et une rencontre
        $admin = AdminUser::factory()->create();
        Sanctum::actingAs($admin, ['*']);
        
        $artist = Artist::factory()->create();
        $meeting = Meeting::factory()->create([
            'artist_id' => $artist->id
        ]);

        // Appeler la méthode destroy
        $response = $this->deleteJson('/api/admin/meetings/' . $meeting->id);

        // Vérifier la réponse
        $response->assertStatus(204);

        // Vérifier que la rencontre a été supprimée
        $this->assertDatabaseMissing('meetings', [
            'id' => $meeting->id
        ]);
    }

    /** @test */
    public function non_admin_cannot_create_meeting()
    {
        // Créer un artiste
        $artist = Artist::factory()->create();

        // Données pour une nouvelle rencontre
        $meetingData = [
            'artist_id' => $artist->id,
            'title' => 'Unauthorized Meeting',
            'description' => 'This should not be created',
            'date' => '2023-12-31',
            'start_time' => '16:00:00',
            'end_time' => '18:00:00',
            'venue' => 'Test Venue',
            'type' => 'Test Type'
        ];

        // Appeler la méthode store sans être authentifié
        $response = $this->postJson('/api/admin/meetings', $meetingData);

        // Vérifier que l'accès est refusé
        $response->assertStatus(401);

        // Vérifier que la rencontre n'a pas été créée
        $this->assertDatabaseMissing('meetings', [
            'title' => 'Unauthorized Meeting'
        ]);
    }

    /** @test */
    public function non_admin_cannot_update_meeting()
    {
        // Créer un artiste et une rencontre
        $artist = Artist::factory()->create();
        $meeting = Meeting::factory()->create([
            'artist_id' => $artist->id,
            'title' => 'Original Title'
        ]);

        // Données pour la mise à jour
        $updateData = [
            'title' => 'Unauthorized Update'
        ];

        // Appeler la méthode update sans être authentifié
        $response = $this->putJson('/api/admin/meetings/' . $meeting->id, $updateData);

        // Vérifier que l'accès est refusé
        $response->assertStatus(401);

        // Vérifier que la rencontre n'a pas été mise à jour
        $this->assertDatabaseMissing('meetings', [
            'id' => $meeting->id,
            'title' => 'Unauthorized Update'
        ]);
    }
}