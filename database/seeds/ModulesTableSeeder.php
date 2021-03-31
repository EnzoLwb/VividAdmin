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
        DB::table('pages_modules')->insert([
           ['module' => 'main','note' => 'main'],
           ['module' => 'common','note' => 'common'],
           ['module' => 'client_account','note' => 'client_account'],
        ]);

    }
}
