<?php

return [

    //uri无需权限白名单
    "free_uri" => [
        "",
        "/",
        "/admin/changepassword"
    ],

    "menu" => [
        //Page List
        [
            "uri"=>"/admin/page_list",
            "name"=>"Page List",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('page_list')
        ],
        //SEO List
        [
            "uri"=>"/admin/seo_list",
            "name"=>"SEO List",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('seo_list')
        ],
        //Content List
        [
            "uri"=>"/admin/content_list",
            "name"=>"Page Content",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('content_list')
        ],
        //Constant List
        [
            "uri"=>"/admin/constant_list",
            "name"=>"Constant List",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('constant_list')
        ],
        //Newsletter
        [
            "uri"=>"/admin/news_letter",
            "name"=>"Newsletter",
            "icon"=>"el-icon-files",
            "submenus"=> []
        ],
        //Image List
        [
            "uri"=>"/admin/img_list",
            "name"=>"Image List",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('img_list')
        ],
        //Video List
        [
            "uri"=>"/admin/video_list",
            "name"=>"Video List",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('video_list')
        ],
        //DB Terms
        [
            "uri"=>"/admin/db_terms",
            "name"=>"DB Terms",
            "icon"=>"el-icon-files",
            "submenus"=> allModulesMenu('db_terms')
        ],
        //Usr Roles Settings
        [
            "uri"=>"/admin/settings",
            "name"=>"Settings",
            "icon"=>"el-icon-files",
            "submenus"=>[
                [
                    "uri" => "/admin/role/list",
                    "name" => "Role List",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/user/list",
                    "name" => "User Authorization",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],
    ],
];



