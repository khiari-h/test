<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'importance'
    ];

    // Accesseur pour convertir l'importance en texte
    public function getImportanceAttribute($value)
    {
        $importanceMap = [
            0 => 'Faible',
            1 => 'Moyenne',
            2 => 'Haute'
        ];
        return $importanceMap[$value] ?? 'Faible';
    }

    // Mutateur pour convertir l'importance en entier
    public function setImportanceAttribute($value)
    {
        $importanceMap = [
            'Faible' => 0,
            'Moyenne' => 1,
            'Haute' => 2
        ];
        $this->attributes['importance'] = $importanceMap[$value] ?? 0;
    }

    // Permet de masquer la valeur réelle de l'importance lors de la sérialisation
    protected $appends = ['importance'];
}