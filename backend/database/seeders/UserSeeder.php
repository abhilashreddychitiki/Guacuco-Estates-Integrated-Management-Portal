<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $building_manager = User::create([
            'name' => 'Building Manager',
            'email' => 'building_manager@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'building_manager'
        ]);

        $garden_manager = User::create([
            'name' => 'Garden Manager',
            'email' => 'garden_manager@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'garden_manager'
        ]);

        $pool_manager = User::create([
            'name' => 'Pool Manager',
            'email' => 'pool_manager@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'pool_manager'
        ]);

        $security_manager = User::create([
            'name' => 'Security Manager',
            'email' => 'security_manager@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'security_manager'
        ]);

        $resident = User::create([
            'name' => 'Resident',
            'email' => 'resident@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'resident'
        ]);

        $visitor = User::create([
            'name' => 'Visitor',
            'email' => 'visitor@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'address' => fake()->address(),
            'role' => 'visitor'
        ]);
    }
}
