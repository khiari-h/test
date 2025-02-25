<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Partner::create([
            'name' => 'SonoPro',
            'description' => 'Fournisseur d\'équipement audio professionnel et partenaire technique officiel du festival.',
            'logo_url' => 'partners/sonopro.png',
            'website_url' => 'https://www.sonopro.example.com',
            'category' => 'Technique'
        ]);

        Partner::create([
            'name' => 'RadioMusic',
            'description' => 'Station de radio locale diffusant en direct depuis le festival et assurant sa promotion.',
            'logo_url' => 'partners/radiomusic.png',
            'website_url' => 'https://www.radiomusic.example.com',
            'category' => 'Média'
        ]);

        Partner::create([
            'name' => 'EcoFest',
            'description' => 'Organisation environnementale collaborant pour rendre le festival plus écologique et durable.',
            'logo_url' => 'partners/ecofest.png',
            'website_url' => 'https://www.ecofest.example.org',
            'category' => 'Environnement'
        ]);

        Partner::create([
            'name' => 'GoûtLocal',
            'description' => 'Collectif de restaurateurs locaux proposant une variété de plats et boissons durant l\'événement.',
            'logo_url' => 'partners/goutlocal.png',
            'website_url' => 'https://www.goutlocal.example.com',
            'category' => 'Restauration'
        ]);

        Partner::create([
            'name' => 'CultureCité',
            'description' => 'La municipalité soutient l\'événement en fournissant les espaces et une partie du financement.',
            'logo_url' => 'partners/culturecite.png',
            'website_url' => 'https://www.culturecite.example.gov',
            'category' => 'Institutionnel'
        ]);
    }
}