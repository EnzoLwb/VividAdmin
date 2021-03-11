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
            'policy_uri' => '["\/admin\/wyw\/zzjs","\/admin\/wyw\/zzgl","\/admin\/trade_union\/company_census","\/admin\/trade_union\/census","\/admin\/committee\/dw_census","\/admin\/committee\/fl_census","\/admin\/trade_union\/jhsq","\/admin\/contest\/encouragement","\/admin\/contest\/manage","\/admin\/contest\/lsyj","\/admin\/contest\/lsyj\/verify","\/admin\/federation\/xltf","\/admin\/contest\/form_design","\/admin\/contest\/common","\/admin\/federation\/workers_training","\/admin\/news","\/admin\/news\/add","\/admin\/federation\/declaration_honor","\/admin\/user\/list","\/admin\/role\/list","\/admin\/tags\/list","\/admin\/logs\/list","\/admin\/message\/manage","\/admin\/setting\/ads","\/admin\/setting\/home"]',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
