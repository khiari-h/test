<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meeting;
use App\Models\Artist;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupération des artistes
        $electroPulse = Artist::where('name', 'Électro Pulse')->first();
        $etoilesJazz = Artist::where('name', 'Les Étoiles du Jazz')->first();
        $marieChanson = Artist::where('name', 'Marie Chanson')->first();
        $rockFusion = Artist::where('name', 'Rock Fusion')->first();

        // Création des rencontres avec les artistes
        if ($electroPulse) {
            Meeting::create([
                'artist_id' => $electroPulse->id,
                'title' => 'Rencontre avec Électro Pulse',
                'description' => 'Échangez avec les membres du duo sur leur processus créatif et leur vision de la musique électronique.',
                'date' => '2025-07-16',
                'start_time' => '14:00:00',
                'end_time' => '15:30:00',
                'venue' => 'Espace Dédicaces',
                'type' => 'Rencontre & Dédicace'
            ]);
        }

        if ($etoilesJazz) {
            Meeting::create([
                'artist_id' => $etoilesJazz->id,
                'title' => 'Masterclass Jazz',
                'description' => 'Les Étoiles du Jazz partagent leurs techniques et leur approche du jazz contemporain lors d\'une masterclass interactive.',
                'date' => '2025-07-17',
                'start_time' => '10:00:00',
                'end_time' => '12:00:00',
                'venue' => 'Salle d\'Atelier',
                'type' => 'Masterclass'
            ]);
        }

        if ($marieChanson) {
            Meeting::create([
                'artist_id' => $marieChanson->id,
                'title' => 'Atelier d\'écriture avec Marie Chanson',
                'description' => 'Apprenez l\'art d\'écrire des paroles de chansons avec l\'une des meilleures auteures-compositrices françaises.',
                'date' => '2025-07-15',
                'start_time' => '15:00:00',
                'end_time' => '17:00:00',
                'venue' => 'Salon Littéraire',
                'type' => 'Atelier'
            ]);
        }

        if ($rockFusion) {
            Meeting::create([
                'artist_id' => $rockFusion->id,
                'title' => 'Session de questions-réponses',
                'description' => 'Une occasion unique de poser vos questions aux membres de Rock Fusion sur leur carrière et leur musique.',
                'date' => '2025-07-18',
                'start_time' => '16:30:00',
                'end_time' => '18:00:00',
                'venue' => 'Espace Fan',
                'type' => 'Q&A'
            ]);
        }
    }
}