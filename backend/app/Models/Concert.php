<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_url',
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
     * Les artistes qui participent à ce concert
     */
    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'concert_artist')
                    ->withPivot('is_headliner', 'performance_order');
    }
}
