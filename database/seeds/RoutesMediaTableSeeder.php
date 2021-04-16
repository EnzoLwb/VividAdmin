<?php

use Illuminate\Database\Seeder;

class RoutesMediaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $firstMenu = [
            'Page List' => 'page_list',
            'SEO List' => 'seo_list',
            'Page Content' => 'content_list',
            'Constant List' => 'constant_list',
            'Image List' => 'img_list',
            'Video List' => 'video_list',
            'DB Terms' => 'db_terms',
        ];
        foreach ($firstMenu as $name => $menu){
            $id = DB::table('route_settings')->insertGetId([
                'name' => $name,
                'icon' => 'el-icon-files',
                'url' => '/admin/'.$menu,
                'pid' => 0,
                'site' => 'media',
            ]);
            DB::table('route_settings')->insert(allModulesMenu($menu,$id));
        }

        //Newsletter
        DB::table('route_settings')->insert([
            'name' => 'Newsletter',
            'icon' => 'el-icon-files',
            'url' => '/admin/news_letter',
            'pid' => 0,
            'site' => 'media',
        ]);

        //Setting
        $s_id = DB::table('route_settings')->insertGetId([
            'name' => 'Settings',
            'icon' => 'el-icon-files',
            'url' => '/admin/settings',
            'pid' => 0,
            'site' => 'media',
        ]);
        DB::table('route_settings')->insert([
            'name' => 'Role List',
            'icon' => 'el-icon-s-check',
            'url' => '/admin/settings/role',
            'pid' => $s_id,
            'site' => 'media',
        ]);
        DB::table('route_settings')->insert([
            'name' => 'SubModule List',
            'icon' => 'el-icon-menu',
            'url' => '/admin/settings/routes',
            'pid' => $s_id,
            'site' => 'media',
        ]);
        DB::table('route_settings')->insert([
            'name' => 'User Authorization',
            'icon' => 'el-icon-s-custom',
            'url' => '/admin/settings/user',
            'pid' => $s_id,
            'site' => 'media',
        ]);
    }
}
