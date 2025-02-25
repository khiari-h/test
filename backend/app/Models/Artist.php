<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_url',
        'genre'
    ];

    /**
     * Les concerts auxquels l'artiste participe
     */
    public function concerts()
    {
        return $this->belongsToMany(Concert::class, 'concert_artist')
                    ->withPivot('is_headliner', 'performance_order');
    }

    /**
     * Les rencontres programmées avec cet artiste
     */
    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }
}

