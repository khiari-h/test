<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;

class NewsTableSeeder extends Seeder
{
    public function run()
    {
        News::create([
            'title' => 'Nouveau Festival Annoncé',
            'description' => 'Un nouveau festival d\'été aura lieu cette année, avec des artistes de renom et de nombreuses activités pour tous les âges. Ne manquez pas cet événement exceptionnel !',
            'category' => 'Festival',
            'importance' => 1,
        ]);

        News::create([
            'title' => 'Ouverture de l\'Expo d\'Art',
            'description' => 'Rejoignez-nous pour l\'inauguration de notre expo d\'art, où vous pourrez découvrir les œuvres de divers artistes locaux et internationaux. Venez explorer l\'art sous toutes ses formes.',
            'category' => 'Exposition',
            'importance' => 2,
        ]);

    }
}
