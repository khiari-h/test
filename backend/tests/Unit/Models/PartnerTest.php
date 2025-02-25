<?php

namespace Tests\Unit\Models;

use App\Models\Partner;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PartnerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        // Vérifier que les attributs attendus sont bien fillable
        $partner = new Partner();
        $fillable = $partner->getFillable();

        $this->assertEquals([
            'name',
            'description',
            'logo_url',
            'website_url',
            'category'
        ], $fillable);
    }

    /** @test */
    public function it_can_create_partner()
    {
        // Créer un partenaire
        $partner = Partner::create([
            'name' => 'Test Partner',
            'description' => 'This is a test partner',
            'logo_url' => 'https://example.com/logo.png',
            'website_url' => 'https://example.com',
            'category' => 'Sponsor'
        ]);

        // Vérifier que le partenaire a été créé
        $this->assertDatabaseHas('partners', [
            'name' => 'Test Partner',
            'description' => 'This is a test partner',
            'logo_url' => 'https://example.com/logo.png',
            'website_url' => 'https://example.com',
            'category' => 'Sponsor'
        ]);
    }

    /** @test */
    public function it_can_update_partner()
    {
        // Créer un partenaire
        $partner = Partner::create([
            'name' => 'Original Partner',
            'description' => 'Original Description',
            'category' => 'Sponsor'
        ]);

        // Mettre à jour le partenaire
        $partner->update([
            'name' => 'Updated Partner',
            'description' => 'Updated Description',
            'website_url' => 'https://updated-example.com'
        ]);

        // Vérifier que le partenaire a été mis à jour
        $this->assertDatabaseHas('partners', [
            'id' => $partner->id,
            'name' => 'Updated Partner',
            'description' => 'Updated Description',
            'website_url' => 'https://updated-example.com',
            'category' => 'Sponsor'
        ]);
    }

    /** @test */
    public function it_can_delete_partner()
    {
        // Créer un partenaire
        $partner = Partner::create([
            'name' => 'Partner to Delete',
            'description' => 'This partner will be deleted',
            'category' => 'Media'
        ]);

        // Récupérer l'ID pour vérification ultérieure
        $partnerId = $partner->id;

        // Supprimer le partenaire
        $partner->delete();

        // Vérifier que le partenaire a été supprimé
        $this->assertDatabaseMissing('partners', [
            'id' => $partnerId
        ]);
    }
}