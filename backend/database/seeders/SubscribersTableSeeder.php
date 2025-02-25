<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscriber;

class SubscribersTableSeeder extends Seeder
{
    public function run()
    {
        Subscriber::create([
            'first_name' => 'Alice',
            'last_name' => 'Johnson',
            'email' => 'alice.johnson@example.com',
        ]);

        Subscriber::create([
            'first_name' => 'Bob',
            'last_name' => 'Williams',
            'email' => 'bob.williams@example.com',
        ]);

      
    }
}
