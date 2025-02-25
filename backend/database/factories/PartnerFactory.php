<?php

namespace Database\Factories;

use App\Models\Partner;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Partner::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = ['Technique', 'Média', 'Environnement', 'Restauration', 'Institutionnel', 'Transport', 'Hébergement', 'Sponsor', 'Financement'];
        
        $companyName = $this->faker->company();
        $domain = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $companyName));
        
        $tlds = ['.com', '.fr', '.org', '.net', '.io'];
        $websiteUrl = 'https://www.' . $domain . $this->faker->randomElement($tlds);
        
        return [
            'name' => $companyName,
            'description' => $this->faker->paragraph(2),
            'logo_url' => 'partners/partner_' . $this->faker->numberBetween(1, 30) . '.png',
            'website_url' => $websiteUrl,
            'category' => $this->faker->randomElement($categories),
        ];
    }
}