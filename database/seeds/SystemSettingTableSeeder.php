<?php

use Illuminate\Database\Seeder;

class SystemSettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('system_settings')->insert([
            'name' => 'login_tip',
            'val' => '高新区工会办事处联系电话：xxxxx',
        ]);
        DB::table('admin_group')->insert([
            'name' => 'ads_switch',
            'val' => 1,
        ]);
    }
}
