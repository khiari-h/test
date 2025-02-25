<?php

namespace Tests\Unit\Models;

use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $news = new News();
        $fillable = $news->getFillable();

        $this->assertEquals([
            'title',
            'description',
            'category',
            'importance',
        ], $fillable);
    }

    /** @test */
    public function it_can_create_news()
    {
        // Créer une actualité
        $news = News::create([
            'title' => 'Test News',
            'description' => 'This is a test news',
            'category' => 'Event',
            'importance' => 3
        ]);

        // Vérifier que l'actualité a été créée
        $this->assertDatabaseHas('news', [
            'title' => 'Test News',
            'description' => 'This is a test news',
            'category' => 'Event',
            'importance' => 3
        ]);
    }

    /** @test */
    public function it_can_update_news()
    {
        // Créer une actualité
        $news = News::create([
            'title' => 'Original Title',
            'description' => 'Original Description',
            'category' => 'Event',
            'importance' => 3
        ]);

        // Mettre à jour l'actualité
        $news->update([
            'title' => 'Updated Title',
            'description' => 'Updated Description'
        ]);

        // Vérifier que l'actualité a été mise à jour
        $this->assertDatabaseHas('news', [
            'id' => $news->id,
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'category' => 'Event',
            'importance' => 3
        ]);
    }

    /** @test */
    public function it_can_delete_news()
    {
        // Créer une actualité
        $news = News::create([
            'title' => 'News to Delete',
            'description' => 'This news will be deleted',
            'category' => 'Event',
            'importance' => 1
        ]);

        // Récupérer l'ID pour vérification ultérieure
        $newsId = $news->id;

        // Supprimer l'actualité
        $news->delete();

        // Vérifier que l'actualité a été supprimée
        $this->assertDatabaseMissing('news', [
            'id' => $newsId
        ]);
    }
}