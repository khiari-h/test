<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminUser;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdminUser::create([
            'name' => 'Administrateur',
            'email' => 'admin@nationsounds.com',
            'password' => Hash::make('admin123'), // Changez ce mot de passe en production !
        ]);
    }
}