<?php

namespace Database\Seeders;

use App\Models\File;
use App\Models\User;
use Illuminate\Database\Seeder;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        // Create routes folder
        $routesFolder = File::create([
            'name' => 'routes',
            'type' => 'folder',
            'path' => '/routes',
            'user_id' => $user->id
        ]);

        // Create web.php file
        File::create([
            'name' => 'web.php',
            'type' => 'file',
            'path' => '/routes/web.php',
            'extension' => 'php',
            'parent_id' => $routesFolder->id,
            'user_id' => $user->id
        ]);

        // Create settings.php file
        File::create([
            'name' => 'settings.php', 
            'type' => 'file',
            'path' => '/routes/settings.php',
            'extension' => 'php',
            'parent_id' => $routesFolder->id,
            'user_id' => $user->id
        ]);
    }
}