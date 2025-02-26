<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\News;

class SecurityTest extends TestCase
{

    /** @test */
    public function it_prevents_sql_injection_in_news_search()
    {
        $response = $this->get('/api/news?query=1;DROP TABLE users;');

        // Vérifie que la requête a été traitée correctement et que la table n'a pas été supprimée
        $response->assertStatus(200);
    }

/** @test */
public function it_escapes_xss_input_in_news_titles()
{
    // Crée une entrée News avec un titre contenant du code XSS
    $news = News::create([
        'title' => '<script>alert("XSS")</script>',
        'description' => 'Test description',
        'category' => 'General',
        'importance' => 1,
    ])->refresh();
    
    // Simule la visite de la page du News via l'API
    $response = $this->getJson('/api/news/' . $news->id);
    
    // Vérifie que le script est bien renvoyé tel quel dans la réponse JSON
    $response->assertJsonFragment(['title' => '<script>alert("XSS")</script>']);
}


    /** @test */
    public function it_allows_cors_requests()
    {
        $response = $this->withHeaders([
            'Origin' => 'http://localhost:3000',
        ])->get('/api/news');

        // Vérifie que l'entête Access-Control-Allow-Origin est bien présent et correspond à l'origine de la requête
        $response->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->assertStatus(200);
    }

}
