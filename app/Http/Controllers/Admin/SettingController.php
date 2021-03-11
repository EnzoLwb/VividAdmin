<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    //首页设置
    public function home(Request $request)
    {
        if ($request->isMethod("GET")){
            $data = SystemSetting::pluck("val","name")->toArray();
            if (isset($data['ads_switch'])) $data['ads_switch'] = boolval($data['ads_switch']);
            return view('setting.home',[
                'data'=>$data,
            ]);
        }else{
            //保存
            $data['ads_switch'] = $request->ads_switch;
            $data['login_tip'] = $request->login_tip;
            foreach ($data as $name => $val){
                SystemSetting::query()->where('name',$name)->update(['val'=>$val]);
            }
            activity()->useLog('系统设置')
                ->log('修改');
            return $this->json(0,[],'');
        }

    }

}
