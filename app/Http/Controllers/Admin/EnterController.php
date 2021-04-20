<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CardCustomService;
use App\Models\CustomEnter;
use App\Models\MemberShip;
use App\Models\ServiceDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnterController extends Controller
{
    public function custom(Request $request){
        $custom_service = CardCustomService::query()->findOrFail($request->id);
        if ($custom_service->card_no != $request->card_no){
            return $this->json(1,[],'服务项目与该会员卡号信息不一致，请刷新再尝试');
        }
        if ($custom_service->degree <=0 ||  $custom_service->degree < abs( $request->decrease_number )){
            return $this->json(1,[],'剩余次数不足！请继续购买');
        }
        if ($custom_service->disable_date < date("Y-m-d") ){
            return $this->json(1,[],'服务已过期！请继续购买');
        }
        if ($custom_service->enable_date > date("Y-m-d") ){
            return $this->json(1,[],'服务未到生效日期！不能消费');
        }
        $service = \DB::transaction(function() use($request,$custom_service) {
            $obj = new CustomEnter();
            $obj->card_no = $request->card_no;
            $obj->type = 2;
            $obj->card_custom_services_id = $request->id;
            $obj->note = $request->note;
            $obj->decrease_number = abs( $request->decrease_number );
            $obj->admin_id = Auth::id();
            $obj->save();
            //扣除服务表次数
            $custom_service->decrement('degree',abs( $request->decrease_number ));
            return $custom_service;
        });
        if ($service){
            $name = ServiceDetail::find($custom_service->service_id);
            activity()
                ->useLog('消费入场')
                ->withProperties(['name'=> $request->card_no .' - '.$name->title??'' .$request->decrease_number.'次'])
                ->performedOn($service)
                ->log('消耗次数');
        }
        if (!$service) return $this->json(1,[],'入场失败');
        return $this->json(0,$service,'');
    }

    //普通入场
    public function normal(Request $request){
        $enter = new CustomEnter();
        $enter->card_no = $request->card_no;
        $enter->type = 1;
        $enter->decrease_number = 0;
        $enter->admin_id = Auth::id();
        $enter->save();
        if ($enter){
            activity()
                ->useLog('普通入场')
                ->withProperties(['name'=>MemberShip::query()->where('card_no',$request->card_no)->value('name')])
                ->performedOn($enter)
                ->log('普通入场');
        }
        if (!$enter) return $this->json(1,[],'入场失败');
        return $this->json(0,$enter,'');
    }

    //入场记录
    public function record(Request $request){
        $data = CustomEnter::query()
            ->leftJoin('card_custom_services','card_custom_services.id','custom_enters.card_custom_services_id')
            ->leftJoin('service_details','service_details.id','card_custom_services.service_id')
            ->leftJoin('admins','admins.id','custom_enters.admin_id')
            ->where('custom_enters.card_no',$request->card_no)
            ->select('custom_enters.type','custom_enters.decrease_number','custom_enters.created_at as date','custom_enters.note',
                'admins.real_name as operator','service_details.title')
            ->orderByDesc('custom_enters.id')
            ->paginate($this->page_size);
        return $this->json(0,$data,'');
    }
}
