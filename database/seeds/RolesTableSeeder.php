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
            'policy_uri' => '["\/admin\/page_list","\/admin\/page_list\/main","\/admin\/page_list\/common","\/admin\/page_list\/client_account","\/admin\/page_list\/client_order","\/admin\/page_list\/client_project","\/admin\/page_list\/client_support","\/admin\/page_list\/provider_account","\/admin\/page_list\/provider_support","\/admin\/page_list\/provider_test","\/admin\/page_list\/other","\/admin\/seo_list","\/admin\/seo_list\/provider_support","\/admin\/seo_list\/provider_account","\/admin\/seo_list\/client_support","\/admin\/seo_list\/client_order","\/admin\/seo_list\/client_project","\/admin\/seo_list\/client_account","\/admin\/seo_list\/common","\/admin\/seo_list\/main","\/admin\/seo_list\/provider_test","\/admin\/seo_list\/other","\/admin\/content_list","\/admin\/content_list\/main","\/admin\/content_list\/common","\/admin\/content_list\/client_account","\/admin\/content_list\/client_order","\/admin\/content_list\/client_project","\/admin\/content_list\/client_support","\/admin\/content_list\/provider_account","\/admin\/content_list\/provider_support","\/admin\/content_list\/provider_test","\/admin\/content_list\/other","\/admin\/constant_list","\/admin\/constant_list\/main","\/admin\/constant_list\/common","\/admin\/constant_list\/client_account","\/admin\/constant_list\/client_order","\/admin\/constant_list\/client_project","\/admin\/constant_list\/client_support","\/admin\/constant_list\/provider_account","\/admin\/constant_list\/provider_support","\/admin\/constant_list\/provider_test","\/admin\/constant_list\/other","\/admin\/img_list","\/admin\/img_list\/main","\/admin\/img_list\/common","\/admin\/img_list\/client_account","\/admin\/img_list\/client_order","\/admin\/img_list\/client_project","\/admin\/img_list\/client_support","\/admin\/img_list\/provider_account","\/admin\/img_list\/provider_support","\/admin\/img_list\/provider_test","\/admin\/img_list\/other","\/admin\/video_list","\/admin\/video_list\/main","\/admin\/video_list\/common","\/admin\/video_list\/client_account","\/admin\/video_list\/client_order","\/admin\/video_list\/client_project","\/admin\/video_list\/client_support","\/admin\/video_list\/provider_account","\/admin\/video_list\/provider_support","\/admin\/video_list\/provider_test","\/admin\/video_list\/other","\/admin\/db_terms","\/admin\/db_terms\/main","\/admin\/db_terms\/common","\/admin\/db_terms\/client_account","\/admin\/db_terms\/client_order","\/admin\/db_terms\/client_project","\/admin\/db_terms\/client_support","\/admin\/db_terms\/provider_account","\/admin\/db_terms\/provider_support","\/admin\/db_terms\/provider_test","\/admin\/db_terms\/other","\/admin\/news_letter","\/admin\/settings","\/admin\/settings\/role","\/admin\/settings\/routes","\/admin\/settings\/user"]',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
