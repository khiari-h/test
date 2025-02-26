<?php

namespace Tests\Feature\Controllers;

use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function index_returns_all_news()
    {
        // Créer des actualités
        News::factory()->count(3)->create();

        // Appeler la méthode index (GET)
        $response = $this->getJson('/api/news');

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonStructure([
                     '*' => [
                         'id',
                         'title',
                         'description',
                         'category',
                         'importance'
                     ]
                 ]);
    }

    /** @test */
    public function show_returns_single_news()
    {
        // Créer une actualité
        $news = News::factory()->create([
            'title'       => 'Test News',
            'description' => 'Test Description',
            'category'    => 'Event',
            'importance'  => 3
        ]);

        // Appeler la méthode show (GET)
        $response = $this->getJson('/api/news/' . $news->id);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'id'          => $news->id,
                     'title'       => 'Test News',
                     'description' => 'Test Description',
                     'category'    => 'Event',
                     'importance'  => 3
                 ]);
    }

    /** @test */
    public function show_returns_404_for_non_existent_news()
    {
        // Appeler la méthode show avec un ID inexistant
        $response = $this->getJson('/api/news/999');

        // Vérifier la réponse
        $response->assertStatus(404)
                 ->assertJson([
                     'message' => 'News item not found'
                 ]);
    }

    /** @test */
    public function store_method_is_not_accessible_publicly()
    {
        // Données pour une nouvelle actualité
        $newsData = [
            'title'       => 'New News',
            'description' => 'News Description',
            'category'    => 'Event',
            'importance'  => 2
        ];

        // Tenter d'appeler la méthode store publiquement (POST sur /api/news)
        $response = $this->postJson('/api/news', $newsData);

        // La route existe pour GET, donc pour POST Laravel renvoie un 405 Method Not Allowed
        $response->assertStatus(405);
    }

    /** @test */
    public function update_method_is_not_accessible_publicly()
    {
        // Créer une actualité
        $news = News::factory()->create();

        // Données pour la mise à jour
        $updateData = [
            'title'       => 'Updated News',
            'description' => 'Updated Description'
        ];

        // Tenter d'appeler la méthode update publiquement (PUT sur /api/news/{id})
        $response = $this->putJson('/api/news/' . $news->id, $updateData);

        // La route publique n'accepte que GET, donc PUT retourne 405
        $response->assertStatus(405);
    }

    /** @test */
    public function destroy_method_is_not_accessible_publicly()
    {
        // Créer une actualité
        $news = News::factory()->create();

        // Tenter d'appeler la méthode destroy publiquement (DELETE sur /api/news/{id})
        $response = $this->deleteJson('/api/news/' . $news->id);

        // DELETE sur cette URL retourne 405 (méthode non autorisée)
        $response->assertStatus(405);
    }
}
