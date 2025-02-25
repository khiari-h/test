<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artist;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Artist::create([
            'name' => 'Électro Pulse',
            'description' => 'Duo de musique électronique connu pour leurs performances énergiques et leurs rythmes innovants.',
            'image_url' => 'artists/electro_pulse.jpg',
            'genre' => 'Électronique'
        ]);

        Artist::create([
            'name' => 'Les Étoiles du Jazz',
            'description' => 'Groupe de jazz contemporain mélangeant des influences traditionnelles avec des éléments modernes.',
            'image_url' => 'artists/etoiles_jazz.jpg',
            'genre' => 'Jazz'
        ]);

        Artist::create([
            'name' => 'Marie Chanson',
            'description' => 'Auteure-compositrice-interprète française avec une voix mélodieuse et des paroles poétiques.',
            'image_url' => 'artists/marie_chanson.jpg',
            'genre' => 'Chanson française'
        ]);

        Artist::create([
            'name' => 'Rock Fusion',
            'description' => 'Quatuor de rock progressif repoussant les limites du genre avec des compositions complexes.',
            'image_url' => 'artists/rock_fusion.jpg',
            'genre' => 'Rock progressif'
        ]);
    }
}