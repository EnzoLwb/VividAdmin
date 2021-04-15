<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'test_role',
            'resources' => '["admin-mng"]',
            'policy_uri' => '["\/admin\/home","\/admin\/membership","\/admin\/membership\/add","\/admin\/card\/deposit","\/admin\/card\/consume","\/admin\/setting\/service","\/admin\/user\/list","\/admin\/role\/list","\/admin\/logs\/list"]',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
