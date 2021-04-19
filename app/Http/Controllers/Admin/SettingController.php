<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceDetail;
use App\Models\SystemSetting;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    //服务列表
    public function service(Request $request)
    {
        if ($request->isMethod('POST')){
            //验证名称是否重复
            if ($request->id){
                $valid = ServiceDetail::query()->where('title',$request->name)
                    ->where('id','!=',$request->id)->exists();
            }else{
                $valid = ServiceDetail::query()->where('title',$request->name)
                    ->exists();
            }
            if ($valid) return $this->json(1,[],'名称重复，请更换~');
            $obj = $request->id ? ServiceDetail::findOrFail($request->id) : new ServiceDetail();
            $obj->title = $request->name;
            $obj->note = $request->remark;
            $obj->save();
            return $this->json(0,[],'');
        }elseif($request->isMethod('GET')){
            return view('setting.service');
        }elseif ($request->isMethod('DELETE')){
            $obj = ServiceDetail::findOrFail($request->id);
           if ($obj->delete()) return $this->json(0,[],'');
        }
    }

    //服务项目列表
    public function list(){
        $data = ServiceDetail::query()->orderByDesc('id')->paginate($this->page_size);
        return $this->json(0,$data,'');
    }

    //首页设置
    public function home(Request $request)
    {
        if ($request->isMethod("GET")){
            $data = SystemSetting::pluck("val","name")->toArray();
            if (isset($data['login_code'])) $data['login_code'] = boolval($data['login_code']);
            if (isset($data['crontab_logs'])) $data['crontab_logs'] = boolval($data['crontab_logs']);
            return view('setting.home',[
                'data'=>$data,
            ]);
        }else{
            //保存
            $data['login_tip'] = $request->login_tip;//登陆页Tip
            $data['login_code'] = $request->login_code;//登陆验证码
            $data['crontab_logs'] = $request->crontab_logs;//是否需要定时删除日志
            //定时删除日志的日期
            if (isset($data['crontab_logs']) && $data['crontab_logs'])  $data['crontab_log_date'] = $request->crontab_log_date;
            foreach ($data as $name => $val){
                SystemSetting::query()->where('name',$name)->update(['val'=>$val]);
            }
            activity()->useLog('系统设置')
                ->log('修改');
            return $this->json(0,[],'');
        }

    }

}
