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
        //Usr Roles
        [
            "uri"=>"/admin/role/list",
            "name"=>"User Roles",
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



