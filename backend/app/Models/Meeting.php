<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'venue',
        'type'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * L'artiste associé à cette rencontre
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}