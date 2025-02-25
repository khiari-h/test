<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Concert;
use App\Models\Artist;

class ConcertSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Création des concerts
        $concert1 = Concert::create([
            'name' => 'Nuit Électronique',
            'description' => 'Une soirée vibrante de musique électronique sous les étoiles avec les meilleurs artistes du genre.',
            'image_url' => 'concerts/nuit_electronique.jpg',
            'date' => '2025-07-15',
            'start_time' => '20:00:00',
            'end_time' => '02:00:00',
            'venue' => 'Scène Principale',
            'type' => 'Électronique'
        ]);

        $concert2 = Concert::create([
            'name' => 'Soirée Jazz',
            'description' => 'Une ambiance feutrée pour découvrir le meilleur du jazz contemporain dans un cadre intime.',
            'image_url' => 'concerts/soiree_jazz.jpg',
            'date' => '2025-07-16',
            'start_time' => '19:30:00',
            'end_time' => '23:00:00',
            'venue' => 'Scène Acoustique',
            'type' => 'Jazz'
        ]);

        $concert3 = Concert::create([
            'name' => 'Pop & Chanson',
            'description' => 'Célébration de la chanson française et de la pop internationale avec des artistes de renom.',
            'image_url' => 'concerts/pop_chanson.jpg',
            'date' => '2025-07-17',
            'start_time' => '18:00:00',
            'end_time' => '22:30:00',
            'venue' => 'Scène du Lac',
            'type' => 'Pop/Chanson'
        ]);

        $concert4 = Concert::create([
            'name' => 'Rock en Scène',
            'description' => 'Pour les amateurs de guitares et de rythmes puissants, une soirée dédiée au rock sous toutes ses formes.',
            'image_url' => 'concerts/rock_scene.jpg',
            'date' => '2025-07-18',
            'start_time' => '21:00:00',
            'end_time' => '01:00:00',
            'venue' => 'Scène Principale',
            'type' => 'Rock'
        ]);

        // Association des artistes aux concerts avec les informations de pivot
        // Récupération des artistes depuis la base de données
        $electroPulse = Artist::where('name', 'Électro Pulse')->first();
        $etoilesJazz = Artist::where('name', 'Les Étoiles du Jazz')->first();
        $marieChanson = Artist::where('name', 'Marie Chanson')->first();
        $rockFusion = Artist::where('name', 'Rock Fusion')->first();

        // Association pour le concert électronique
        if ($electroPulse) {
            $concert1->artists()->attach($electroPulse->id, [
                'is_headliner' => true, 
                'performance_order' => 2
            ]);
        }

        // Association pour le concert jazz
        if ($etoilesJazz) {
            $concert2->artists()->attach($etoilesJazz->id, [
                'is_headliner' => true, 
                'performance_order' => 1
            ]);
        }

        // Association pour le concert de chanson
        if ($marieChanson) {
            $concert3->artists()->attach($marieChanson->id, [
                'is_headliner' => true, 
                'performance_order' => 2
            ]);
        }

        // Association pour le concert rock
        if ($rockFusion) {
            $concert4->artists()->attach($rockFusion->id, [
                'is_headliner' => true, 
                'performance_order' => 1
            ]);
        }

        // Quelques artistes participent à plusieurs concerts
        if ($electroPulse) {
            $concert4->artists()->attach($electroPulse->id, [
                'is_headliner' => false, 
                'performance_order' => 2
            ]);
        }

        if ($marieChanson) {
            $concert2->artists()->attach($marieChanson->id, [
                'is_headliner' => false, 
                'performance_order' => 2
            ]);
        }
    }
}