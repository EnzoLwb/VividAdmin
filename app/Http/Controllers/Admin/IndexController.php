<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AdminGroups;
use App\Models\CardCustomService;
use App\Models\DepositRecord;
use App\Models\MemberShip;
use App\Models\ServiceDetail;
use App\Models\UploadedFile;
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

    public function recordDetail()
    {
        $res = DepositRecord::query()->find(\request('record_id'));
        if ($res->type == 1){
            $res->name = MemberShip::query()->where('card_no',$res->card_no)->value('name');
            $res->pic_path = $res->file_id ? UploadedFile::query()->find($res->file_id)->file_path : "";
            $res->seller = Admin::query()->where('id',$res->other)->value('real_name');
        }else{
            //消费
            $res = CardCustomService::query()->withTrashed()->find($res->custom_id);
            $res->service = ServiceDetail::query()->find($res->service_id)->title;
            $res->name = MemberShip::query()->where('card_no',$res->card_no)->value('name');
            $res->type = $res->fee != 0 ? 1:2;
            $res->coach = Admin::query()->where('id',$res->other)->value('real_name');
            $res->expire_date = [$res->enable_date,$res->disable_date];
        }
        return $this->json(0,$res,'');
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
        $result = [];
        foreach (array_values($data) as $item){
            if ($item['options']!=[]) $result[] = $item;
        }
        return $this->json(0,$result,'');
    }
}
