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
            "name"=>"公众号相关",
            "icon"=>"el-icon-s-custom",
            "submenus"=>[
                [
                    "uri" => "/admin/wechat/coach-recruit",
                    "name" => "教练招募记录",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/wechat/redeem-code",
                    "name" => "兑换码核销记录",
                    "icon" => "",
                    "submenus" => [],
                ],
                [
                    "uri" => "/admin/wechat/config",
                    "name" => "相关配置",
                    "icon" => "",
                    "submenus" => [],
                ],
            ]
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
                [
                    "uri" => "/admin/card/record",
                    "name" => "会员充值/消费记录",
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
                    "name" => "服务项目管理",
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
            "uri"=>"/admin/logs/list",
            "name"=>"查看日志",
            "icon"=>"el-icon-tickets",
            "submenus"=>[],
        ],
        /*系统设置*/
        [
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
        ],

    ],
];



