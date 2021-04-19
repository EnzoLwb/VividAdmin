<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AdminGroups;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    //首页
    public function index()
    {
        return view('index.home');
    }

    public function home()
    {
        //查看是否有首页的权限 没有则权限列表第一个地址
        /*$role = Role::query()->findOrFail(\auth()->user()->role_id)->policy_uri;
        $policy_uri = json_decode($role,true);
        return redirect()->to(current($policy_uri));*/
        return redirect()->to("/admin/home");
    }

    //获取人员下拉框内容
    public function userPost()
    {
        $users = Admin::query()->leftJoin('admin_group','admin_group.admin_id','admins.id')
            ->where('status',1)
            ->select('type','admin_id as value','real_name as label')->get()->toArray();
        $data =[];
        /*
        $data = [
            ["label"=>"教练",
                "options" =>
                [
                    ["label" =>"张三","value"=>11]
                    ["label" =>"李四","value"=>12]
                ]
            ],
            ["label"=>"销售",
                "options" =>
                [
                    ["label" =>"张三2","value"=>211]
                    ["label" =>"李四2","value"=>212]
                ]
            ],
        ];
        */
        foreach (AdminGroups::$post_desc as $type => $post){
            $data[$type] = [
                'label' => $post,'options' => []
            ];
        }
        foreach ($users as $user){
            $data[$user['type']]['options'][] = $user;
        }
        return $this->json(0,array_values($data),'');
    }
}
