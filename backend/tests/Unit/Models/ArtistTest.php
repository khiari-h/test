<?php

namespace Tests\Unit\Models;

use App\Models\Artist;
use App\Models\Concert;
use App\Models\Meeting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArtistTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $artist = new Artist();
        $fillable = $artist->getFillable();

        $this->assertEquals([
            'name',
            'description',
            'image_url',
            'genre'
        ], $fillable);
    }

    /** @test */
/** @test */
public function it_has_concerts_relationship()
{
    // Créer un artiste et des concerts
    $artist = Artist::factory()->create();
    $concert1 = Concert::factory()->create();
    $concert2 = Concert::factory()->create();

    // Associer les concerts à l'artiste
    $artist->concerts()->attach($concert1, ['is_headliner' => true, 'performance_order' => 1]);
    $artist->concerts()->attach($concert2, ['is_headliner' => false, 'performance_order' => 2]);

    // Vérifier que les relations existent
    $this->assertCount(2, $artist->concerts);
    $this->assertInstanceOf(Concert::class, $artist->concerts->first());

    // Vérifier les données de la table pivot
    // Option 1 : Comparaison en utilisant assertEquals avec des entiers
    $this->assertEquals(1, $artist->concerts[0]->pivot->is_headliner);
    $this->assertEquals(1, $artist->concerts[0]->pivot->performance_order);
    $this->assertEquals(0, $artist->concerts[1]->pivot->is_headliner);
    $this->assertEquals(2, $artist->concerts[1]->pivot->performance_order);

    // Option 2 : Forcer la conversion en booléen
    // $this->assertTrue((bool)$artist->concerts[0]->pivot->is_headliner);
    // $this->assertEquals(1, $artist->concerts[0]->pivot->performance_order);
    // $this->assertFalse((bool)$artist->concerts[1]->pivot->is_headliner);
    // $this->assertEquals(2, $artist->concerts[1]->pivot->performance_order);
}


    /** @test */
    public function it_has_meetings_relationship()
    {
        // Créer un artiste et des rencontres
        $artist = Artist::factory()->create();
        Meeting::factory()->count(3)->create(['artist_id' => $artist->id]);

        // Vérifier que les relations existent
        $this->assertCount(3, $artist->meetings);
        $this->assertInstanceOf(Meeting::class, $artist->meetings->first());
    }
}