<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoachSettled;
use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfficialController extends Controller
{
    public function coachRecruit(Request $request){
        if ($request->isMethod('GET')){
            return view('admin.gzh.coach_recruit');
        }else if ($request->isMethod('DELETE')){
            $obj = CoachSettled::findOrFail($request->id);
            activity()
                ->useLog('教练招募')
                ->performedOn($obj)
                ->causedBy(Auth::id())
                ->withProperties(['name' => $obj->name])->log('删除信息');
            if ($obj->delete()) return $this->json(0,[],'');
        } else{
            $data = CoachSettled::query()
                ->when($request->created_at,function ($query){
                    return $query->where('created_at','>',\request('created_at')[0])->where('created_at','<',\request('created_at')[1]);
                })
                ->when($request->phone,function ($query){
                    return $query->where('phone','like','%'.\request('phone').'%');
                })
                ->when($request->name,function ($query){
                    return $query->where('name','like','%'.\request('name').'%');
                })
                ->when($request->type,function ($query){
                    return $query->where('type',\request('type'));
                })
                ->paginate();
            foreach ($data as &$datum){
                $datum->photos = json_decode($datum->qualification);
            }
            return $this->json(0,$data);
        }
    }

    public function redeemCode(Request $request){

    }

    public function setting(Request $request){
        if ($request->isMethod('GET')){
            $data = SystemSetting::pluck("val","name")->toArray();
            return view('admin.gzh.setting',compact('data'));
        }else{
            $data = \request()->all();
            foreach ($data as $name => $val){
                SystemSetting::query()->where('name',$name)->update(['val'=>$val]);
            }
            activity()->useLog('系统设置')
                ->log('修改');
            return $this->json(0,[],'');
        }
    }
}
