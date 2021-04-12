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
        [
            "uri"=>"/admin/home",
            "name"=>"首页",
            "icon"=>"el-icon-house",
            "submenus"=>[]
        ],
        [
            "uri"=>"#",
            "name"=>"会员管理",
            "icon"=>"el-icon-s-custom",
            "submenus"=>[
                [
                    "uri" => "/admin/membership",
                    "name" => "会员列表",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/membership/add",
                    "name" => "会员注册",
                    "icon" => "",
                    "submenus" => [],
                ],
            ]
        ],
        [
            "uri"=>"#",
            "name"=>"会员卡管理",
            "icon"=>"el-icon-postcard",
            "submenus"=>[
                [
                    "uri" => "/admin/card/deposit",
                    "name" => "卡充值",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/card/consume",
                    "name" => "卡消费服务",
                    "icon" => "",
                    "submenus" => [],
                ],
            ]
        ],
        [
            "uri"=>"#",
            "name"=>"业务设置",
            "icon"=>"el-icon-setting",
            "submenus"=>[
                [
                    "uri" => "/admin/setting/service",
                    "name" => "服务列表",
                    "icon" => "",
                    "submenus" => [],
                ],

            ]
        ],
        [
            "uri"=>"#",
            "name"=>"权限管理",
            "icon"=>"el-icon-s-check",
            "submenus"=>[
                [
                    "uri" => "/admin/user/list",
                    "name" => "员工管理",
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
/*        [
            "uri"=>"#",
            "name"=>"其他",
            "icon"=>"el-icon-setting",
            "submenus"=>[
                [
                    "uri" => "/admin/setting/home",
                    "name" => "系统设置",
                    "icon" => "",
                    "submenus" => [],
                ],
            ],
        ],*/

    ],
];



