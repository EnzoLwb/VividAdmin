<?php

use Illuminate\Database\Seeder;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'username' => 'test',
            'real_name' => '测试',
            'role_id' => 1,
            'media_role_id' => 2,
            'password' => \Illuminate\Support\Facades\Hash::make('test'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('admin_group')->insert([
            'type' => 1,
            'admin_id' => 1000,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
