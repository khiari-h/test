<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ParticipantsTableSeeder::class,
            EventsTableSeeder::class,
            NewsTableSeeder::class,
            SubscribersTableSeeder::class,
           
        ]);
    }
}
