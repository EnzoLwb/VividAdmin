<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\CardBalance;
use App\Models\CardCustomService;
use App\Models\DepositRecord;
use App\Models\MemberShip;
use App\Models\ServiceDetail;
use App\Models\UploadedFile;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        return view('membership.list');
    }

    public function add()
    {
        return view('membership.register');
    }

    public function save(Request $request)
    {
        //验证会员卡号 是否重复
        if (MemberShip::query()->where('card_no',$request->card_no)->exists()) return $this->json(1,[],'此卡号已注册');
        $balance = \DB::transaction(function() use($request) {
            $member = new MemberShip();
            $member->name = $request->name;
            $member->card_no = $request->card_no;
            $member->id_number = $request->id_number;
            $member->phone = $request->phone;
            $member->gender = $request->gender;
            $member->register_time = $request->register_date;
            $member->coach = implode(',',$request->coach);
            $member->pic_id = $request->pic_id;
            $member->save();
            //卡内余额初始化
            $balance = new CardBalance();
            $balance->card_no = $member->card_no;
            $balance->card_income = 0.00;
            $balance->card_outcome = 0.00;
            $balance->balance_fee = 0.00;
            $balance->save();
            return $balance;
        });
        if (!$balance) return $this->json(1,[],'注册失败');
        return $this->json(0,[],'');
    }

    //会员卡记录
    public function cardRecord()
    {
        $detail = DepositRecord::query()->where('card_no',\request('card_no'))
            ->paginate($this->page_size);
        foreach ($detail->items() as $item){
            if ($item->type ===1 ){
                $item->type = '充值';
                $item->account = '+ '.$item->account;
            }else{
                $custom_detail = CardCustomService::query()->withTrashed()->find($item->custom_id);
                $item->type = ($custom_detail->fee == 0 ? '赠送' : '购买' ) . ' - ' .
                    ServiceDetail::find($custom_detail->service_id)->title;
                if ($custom_detail->deleted_at){
                    $item->type = $item->type.'<i>（服务项目已被手动取消）</i>';
                }
                $item->account = '- '.$item->account;
            }
            $item->operator = Admin::find($item->admin_id)->real_name;
        }
        return $this->json(0,$detail,'');
    }

    public function getMember()
    {
        $data = MemberShip::getMemberByCardNo(\request('card_no'));
        if (\request('balance') && $data){
            $data->balance = CardBalance::getBalance(\request('card_no')) ;
        }
        return $this->json(0,$data,'');
    }
}
