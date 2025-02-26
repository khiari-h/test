namespace Tests\Feature;

use App\Models\Concert;
use App\Models\Artist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ConcertControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test de la méthode index pour récupérer la liste des concerts.
     */
    public function test_index()
    {
        $concert = Concert::factory()->create();

        $response = $this->getJson(route('concerts.index'));

        $response->assertStatus(200)
                 ->assertJsonCount(1)  // On s'assure qu'il y a bien un concert dans la réponse.
                 ->assertJsonStructure([
                     '*' => [
                         'id', 'name', 'description', 'image_url', 'date', 'start_time', 'end_time', 'venue', 'type', 'artists',
                     ]
                 ]);
    }

    /**
     * Test de la méthode store pour créer un concert.
     */
    public function test_store()
    {
        $artist = Artist::factory()->create();

        $data = [
            'name' => 'Concert Test',
            'description' => 'Description du concert',
            'date' => now()->format('Y-m-d'),
            'start_time' => now()->format('H:i:s'),
            'end_time' => now()->addHours(2)->format('H:i:s'),
            'venue' => 'Salle Test',
            'type' => 'Type Test',
            'artists' => [
                [
                    'id' => $artist->id,
                    'is_headliner' => true,
                    'performance_order' => 1,
                ],
            ]
        ];

        $response = $this->postJson(route('concerts.store'), $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'name' => 'Concert Test',
                     'description' => 'Description du concert',
                     'venue' => 'Salle Test',
                 ]);
    }

    /**
     * Test de la méthode show pour afficher un concert spécifique.
     */
    public function test_show()
    {
        $concert = Concert::factory()->create();

        $response = $this->getJson(route('concerts.show', $concert->id));

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $concert->id,
                     'name' => $concert->name,
                 ]);
    }

    /**
     * Test de la méthode update pour mettre à jour un concert.
     */
    public function test_update()
    {
        $concert = Concert::factory()->create();
        $artist = Artist::factory()->create();

        $data = [
            'name' => 'Concert Mis à Jour',
            'description' => 'Nouvelle description',
            'date' => now()->format('Y-m-d'),
            'start_time' => now()->format('H:i:s'),
            'end_time' => now()->addHours(2)->format('H:i:s'),
            'venue' => 'Salle Mise à Jour',
            'type' => 'Type Mis à Jour',
            'artists' => [
                [
                    'id' => $artist->id,
                    'is_headliner' => false,
                    'performance_order' => 2,
                ],
            ]
        ];

        $response = $this->putJson(route('concerts.update', $concert->id), $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'name' => 'Concert Mis à Jour',
                     'venue' => 'Salle Mise à Jour',
                 ]);
    }

    /**
     * Test de la méthode destroy pour supprimer un concert.
     */
    public function test_destroy()
    {
        $concert = Concert::factory()->create();

        $response = $this->deleteJson(route('concerts.destroy', $concert->id));

        $response->assertStatus(204);
        $this->assertDatabaseMissing('concerts', ['id' => $concert->id]);
    }
}
