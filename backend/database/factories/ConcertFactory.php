<?php

namespace Database\Factories;

use App\Models\Concert;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class ConcertFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Concert::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['Rock', 'Pop', 'Jazz', 'Électronique', 'Hip-Hop', 'Classique', 'Folk', 'Reggae', 'Festival', 'Acoustic'];
        $venues = ['Scène Principale', 'Scène Acoustique', 'Scène du Lac', 'Chapiteau', 'Espace Underground', 'Théâtre de Plein Air'];
        
        // Génère une date entre maintenant et 3 mois dans le futur
        $date = $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d');
        
        // Génère une heure de début entre 18h et 21h
        $startHour = $this->faker->numberBetween(18, 21);
        $startTime = sprintf('%02d:00:00', $startHour);
        
        // Génère une heure de fin entre 2h et 4h après le début
        $endHour = $startHour + $this->faker->numberBetween(2, 4);
        $endTime = sprintf('%02d:00:00', $endHour);
        
        return [
            'name' => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraph(4),
            'image_url' => 'concerts/concert_' . $this->faker->numberBetween(1, 15) . '.jpg',
            'date' => $date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'venue' => $this->faker->randomElement($venues),
            'type' => $this->faker->randomElement($types),
        ];
    }
}