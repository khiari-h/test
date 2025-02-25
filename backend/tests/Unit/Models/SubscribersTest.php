<?php

namespace Tests\Unit\Models;

use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriberTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $subscriber = new Subscriber();
        $fillable = $subscriber->getFillable();

        $this->assertEquals([
            'first_name',
            'last_name',
            'email',
        ], $fillable);
    }

    /** @test */
    public function it_can_create_subscriber()
    {
        // Créer un abonné
        $subscriber = Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);

        // Vérifier que l'abonné a été créé
        $this->assertDatabaseHas('subscribers', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);
    }

    /** @test */
    public function it_can_update_subscriber()
    {
        // Créer un abonné
        $subscriber = Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);

        // Mettre à jour l'abonné
        $subscriber->update([
            'first_name' => 'Jane',
            'email' => 'jane.doe@example.com'
        ]);

        // Vérifier que l'abonné a été mis à jour
        $this->assertDatabaseHas('subscribers', [
            'id' => $subscriber->id,
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com'
        ]);
    }

    /** @test */
    public function it_can_delete_subscriber()
    {
        // Créer un abonné
        $subscriber = Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);

        // Récupérer l'ID pour vérification ultérieure
        $subscriberId = $subscriber->id;

        // Supprimer l'abonné
        $subscriber->delete();

        // Vérifier que l'abonné a été supprimé
        $this->assertDatabaseMissing('subscribers', [
            'id' => $subscriberId
        ]);
    }

    /** @test */
    public function it_enforces_unique_email()
    {
        // Créer un abonné
        Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);

        // Tenter de créer un autre abonné avec le même email
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Subscriber::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'john.doe@example.com'  // même email
        ]);
    }
}