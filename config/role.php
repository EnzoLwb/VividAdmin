<?php

return [

    //uri无需权限白名单
    "free_uri" => [
        "",
        "/",
        "/admin/changepassword"
    ],

    //菜单列表
    "menu" => [
        /*权限管理菜单*/
        [
            "uri"=>"#",
            "name"=>"权限管理",
            "icon"=>"el-icon-s-check",
            "submenus"=>[
                [
                    "uri" => "/admin/user/list",
                    "name" => "人员管理",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/role/list",
                    "name" => "角色管理",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],
        /*标签管理*/
        /*[
            "uri"=>"#",
            "name"=>"标签管理",
            "icon"=>"el-icon-collection-tag",
            "submenus"=>[
                [
                    "uri" => "/admin/tags/list",
                    "name" => "标签列表",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],*/
        /*日志管理*/
        [
            "uri"=>"#",
            "name"=>"日志管理",
            "icon"=>"el-icon-tickets",
            "submenus"=>[
                [
                    "uri" => "/admin/logs/list",
                    "name" => "日志查看",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],
        /*系统设置*/
        [
            "uri"=>"#",
            "name"=>"其他",
            "icon"=>"el-icon-setting",
            "submenus"=>[
                [
                    "uri" => "/admin/setting/home",
                    "name" => "设置",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],

    ],
];



