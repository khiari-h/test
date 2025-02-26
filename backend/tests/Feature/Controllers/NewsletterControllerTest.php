<?php

namespace Tests\Feature\Controllers;

use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_subscribe_to_newsletter()
    {
        // Données pour l'inscription
        $subscribeData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ];

        // Appeler la méthode subscribe
        $response = $this->postJson('/api/newsletter/subscribe', $subscribeData);

        // Vérifier la réponse
        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Inscription réussie!'
                 ]);

        // Vérifier que l'abonné a été créé en base de données
        $this->assertDatabaseHas('subscribers', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);
    }

    /** @test */
    public function subscribe_validates_input()
    {
        // Données incomplètes
        $subscribeData = [
            'email' => 'john.doe@example.com'
            // Manquent first_name et last_name
        ];

        // Appeler la méthode subscribe
        $response = $this->postJson('/api/newsletter/subscribe', $subscribeData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['first_name', 'last_name']);
    }

    /** @test */
    public function subscribe_validates_email_format()
    {
        // Données avec un format d'email invalide
        $subscribeData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'invalid-email'
        ];

        // Appeler la méthode subscribe
        $response = $this->postJson('/api/newsletter/subscribe', $subscribeData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function subscribe_enforces_unique_email()
    {
        // Créer un abonné existant
        Subscriber::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);

        // Données avec un email déjà utilisé
        $subscribeData = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'john.doe@example.com'  // email déjà utilisé
        ];

        // Appeler la méthode subscribe
        $response = $this->postJson('/api/newsletter/subscribe', $subscribeData);

        // Vérifier les erreurs de validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function unsubscribe_method_is_not_implemented()
    {
        // Tenter d'appeler une méthode de désinscription (qui n'existe pas)
        $response = $this->postJson('/api/newsletter/unsubscribe', [
            'email' => 'john.doe@example.com'
        ]);

        // Vérifier que la route n'existe pas
        $response->assertStatus(404);
    }
}