<?php

namespace Database\Factories;

use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArtistFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Artist::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $genres = ['Rock', 'Pop', 'Jazz', 'Électronique', 'Hip-Hop', 'Classique', 'Folk', 'Reggae', 'Blues', 'Metal', 'R&B', 'Chanson française'];
        
        return [
            'name' => $this->faker->unique()->company(),
            'description' => $this->faker->paragraph(3),
            'image_url' => 'artists/artist_' . $this->faker->numberBetween(1, 20) . '.jpg',
            'genre' => $this->faker->randomElement($genres),
        ];
    }
}