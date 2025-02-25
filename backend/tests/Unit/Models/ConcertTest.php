<?php

namespace Tests\Unit\Models;

use App\Models\Artist;
use App\Models\Concert;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConcertTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $concert = new Concert();
        $fillable = $concert->getFillable();

        $this->assertEquals([
            'name',
            'description',
            'image_url',
            'date',
            'start_time',
            'end_time',
            'venue',
            'type'
        ], $fillable);
    }

    /** @test */
    public function it_has_date_cast()
    {
        // Vérifier que l'attribut date est bien cast en type date
        $concert = new Concert();
        $casts = $concert->getCasts();

        $this->assertArrayHasKey('date', $casts);
        $this->assertEquals('date', $casts['date']);
    }

    /** @test */
    public function it_has_artists_relationship()
    {
        // Créer un concert et des artistes
        $concert = Concert::factory()->create();
        $artist1 = Artist::factory()->create();
        $artist2 = Artist::factory()->create();

        // Associer les artistes au concert
        $concert->artists()->attach($artist1, ['is_headliner' => true, 'performance_order' => 1]);
        $concert->artists()->attach($artist2, ['is_headliner' => false, 'performance_order' => 2]);

        // Vérifier que les relations existent
        $this->assertCount(2, $concert->artists);
        $this->assertInstanceOf(Artist::class, $concert->artists->first());
        
        // Vérifier les données de la table pivot
        $this->assertTrue($concert->artists[0]->pivot->is_headliner);
        $this->assertEquals(1, $concert->artists[0]->pivot->performance_order);
        $this->assertFalse($concert->artists[1]->pivot->is_headliner);
        $this->assertEquals(2, $concert->artists[1]->pivot->performance_order);
    }

    /** @test */
    public function concert_date_is_a_carbon_instance()
    {
        $concert = Concert::factory()->create([
            'date' => '2023-12-31'
        ]);
        
        $this->assertInstanceOf(\Carbon\Carbon::class, $concert->date);
        $this->assertEquals('2023-12-31', $concert->date->toDateString());
    }
}