<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('concert_artist', function (Blueprint $table) {
            $table->foreignId('concert_id')->constrained()->onDelete('cascade');
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->boolean('is_headliner')->default(false);
            $table->integer('performance_order')->default(0);
            $table->primary(['concert_id', 'artist_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('concert_artist');
    }
};