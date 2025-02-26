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
        // Arrange & Act
        $concert = new Concert();
        
        // Assert
        $this->assertEquals([
            'name',
            'description',
            'image_url',
            'date',
            'start_time',
            'end_time',
            'venue',
            'type'
        ], $concert->getFillable());
    }

    /** @test */
    public function it_casts_date_as_date_object()
    {
        // Arrange & Act
        $concert = new Concert();
        
        // Assert
        $this->assertArrayHasKey('date', $concert->getCasts());
        $this->assertEquals('date', $concert->getCasts()['date']);
    }

    /** @test */
    public function it_can_create_a_concert()
    {
        // Arrange
        $concertData = [
            'name' => 'Summer Festival',
            'description' => 'The best summer music event',
            'image_url' => 'https://example.com/image.jpg',
            'date' => '2023-07-15',
            'start_time' => '18:00:00',
            'end_time' => '23:00:00',
            'venue' => 'Central Park',
            'type' => 'Festival'
        ];
        
        // Act
        $concert = Concert::create($concertData);
        
        // Assert
        $this->assertDatabaseHas('concerts', [
            'name' => 'Summer Festival',
            'venue' => 'Central Park'
        ]);
        
        $this->assertInstanceOf(Concert::class, $concert);
    }

    
    /** @test */
    public function it_can_update_a_concert()
    {
        // Arrange
        $concert = Concert::factory()->create([
            'name' => 'Old Name',
            'venue' => 'Old Venue'
        ]);
        
        // Act
        $concert->update([
            'name' => 'Updated Festival',
            'venue' => 'New Venue'
        ]);
        
        // Assert
        $this->assertDatabaseHas('concerts', [
            'id' => $concert->id,
            'name' => 'Updated Festival',
            'venue' => 'New Venue'
        ]);
    }
    
    /** @test */
    public function it_can_be_deleted()
    {
        // Arrange
        $concert = Concert::factory()->create();
        
        // Act
        $concert->delete();
        
        // Assert
        $this->assertDatabaseMissing('concerts', [
            'id' => $concert->id
        ]);
    }
}