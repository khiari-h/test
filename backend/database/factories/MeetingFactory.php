<?php

namespace Database\Factories;

use App\Models\Meeting;
use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeetingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Meeting::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['Rencontre & Dédicace', 'Masterclass', 'Atelier', 'Q&A', 'Conférence', 'Projection & Discussion'];
        $venues = ['Espace Dédicaces', 'Salle d\'Atelier', 'Salon Littéraire', 'Espace Fan', 'Médiathèque', 'Salle de Conférence'];
        
        // Génère une date entre maintenant et 3 mois dans le futur
        $date = $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d');
        
        // Génère une heure de début entre 10h et 17h
        $startHour = $this->faker->numberBetween(10, 17);
        $startMinute = $this->faker->randomElement(['00', '30']);
        $startTime = sprintf('%02d:%s:00', $startHour, $startMinute);
        
        // Génère une durée entre 1h et 2h30
        $durationMinutes = $this->faker->numberBetween(60, 150);
        $endDateTime = (new \DateTime($startTime))->add(new \DateInterval('PT' . $durationMinutes . 'M'));
        $endTime = $endDateTime->format('H:i:s');
        
        // Récupère un artiste aléatoire ou utilise l'ID 1 si aucun n'existe
        $artistId = Artist::exists() ? Artist::inRandomOrder()->first()->id : 1;
        
        $type = $this->faker->randomElement($types);
        $artistName = Artist::find($artistId)->name ?? 'l\'artiste';
        
        return [
            'artist_id' => $artistId,
            'title' => $this->getMeetingTitle($type, $artistName),
            'description' => $this->faker->paragraph(3),
            'date' => $date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'venue' => $this->faker->randomElement($venues),
            'type' => $type,
        ];
    }
    
    /**
     * Génère un titre approprié en fonction du type de rencontre et du nom de l'artiste
     */
    private function getMeetingTitle($type, $artistName)
    {
        switch ($type) {
            case 'Rencontre & Dédicace':
                return "Rencontre avec $artistName";
            case 'Masterclass':
                return "Masterclass par $artistName";
            case 'Atelier':
                return "Atelier avec $artistName";
            case 'Q&A':
                return "Questions-Réponses avec $artistName";
            case 'Conférence':
                return "Conférence de $artistName";
            case 'Projection & Discussion':
                return "Projection & Discussion avec $artistName";
            default:
                return "Événement avec $artistName";
        }
    }
}