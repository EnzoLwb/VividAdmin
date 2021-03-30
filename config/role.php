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
            "uri"=>"#",
            "name"=>"Page List",
            "icon"=>"el-icon-files",
            "submenus"=>[
                [
                    "uri" => "/admin/page_list/main",
                    "name" => "main",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/page_list/common",
                    "name" => "common",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/page_list/client_account",
                    "name" => "client_account",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],
        //SEO List
        [
            "uri"=>"#",
            "name"=>"SEO List",
            "icon"=>"el-icon-files",
            "submenus"=>[
                [
                    "uri" => "/admin/seo_list/main",
                    "name" => "main",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/seo_list/common",
                    "name" => "common",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/seo_list/client_account",
                    "name" => "client_account",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],
        //Usr Roles
        [
            "uri"=>"#",
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



