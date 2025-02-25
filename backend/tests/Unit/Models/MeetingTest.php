<?php

namespace Tests\Unit\Models;

use App\Models\Artist;
use App\Models\Meeting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MeetingTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $meeting = new Meeting();
        $fillable = $meeting->getFillable();

        $this->assertEquals([
            'artist_id',
            'title',
            'description',
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
        $meeting = new Meeting();
        $casts = $meeting->getCasts();

        $this->assertArrayHasKey('date', $casts);
        $this->assertEquals('date', $casts['date']);
    }

    /** @test */
    public function it_belongs_to_artist()
    {
        // Créer un artiste et une rencontre
        $artist = Artist::factory()->create();
        $meeting = Meeting::factory()->create([
            'artist_id' => $artist->id
        ]);

        // Vérifier que la relation existe
        $this->assertInstanceOf(Artist::class, $meeting->artist);
        $this->assertEquals($artist->id, $meeting->artist->id);
    }

    /** @test */
    public function meeting_date_is_a_carbon_instance()
    {
        $meeting = Meeting::factory()->create([
            'date' => '2023-12-31'
        ]);
        
        $this->assertInstanceOf(\Carbon\Carbon::class, $meeting->date);
        $this->assertEquals('2023-12-31', $meeting->date->toDateString());
    }
}