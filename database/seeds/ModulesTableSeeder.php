<?php

use Illuminate\Database\Seeder;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = [
            'main','common','client_account','client_order','client_project',
            'client_support','provider_account','provider_support','provider_test','other'
        ];
        $data = [];
        foreach ($modules as $module){
            $data[] =  ['module' => $module,'note' => $module];
        }
        DB::table('pages_modules')->insert($data);

    }
}
