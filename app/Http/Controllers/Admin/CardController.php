<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CardBalance;
use App\Models\CardCustomService;
use App\Models\DepositRecord;
use App\Models\MemberShip;
use App\Models\ServiceDetail;
use Illuminate\Http\Request;

class CardController extends Controller
{
    //充值消费记录
    public function record(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = DepositRecord::query()
                ->leftJoin('member_ships','member_ships.card_no','deposit_records.card_no')
                ->when($request->type,function ($query){
                    return $query->where('type',\request('type'));
                })
                ->when($request->min_account > 0,function ($query){
                    return $query->where('deposit_records.account','>=',\request('min_account'));
                })
                ->when($request->max_account > 0,function ($query){
                    return $query->where('deposit_records.account','<=',\request('max_account'));
                })
                ->when($request->card_no,function ($query){
                    return $query->where('deposit_records.card_no',\request('card_no'));
                })
                ->when($request->name,function ($query){
                    return $query->where('member_ships.name','like','%'.\request('name').'%');
                })
                ->when($request->register_date,function ($query){
                    $start_time = \request('register_date')[0];
                    $end_time = \request('register_date')[1];
                    return $query->where('created_at','>=',$start_time)->where('created_at','<=',$end_time);
                })
                ->when($request->sort_order,function ($query)use($request){//排序
                    $field = $request->sort_prop;
                    $order = $request->sort_order;
                    return $query->orderBy($field,$order);
                })
                ->orderByDesc('deposit_records.id')
                ->select('deposit_records.*','member_ships.name')
                ->paginate($this->page_size);

            return $this->json(0,$data,'');
        }else{
            return view('card.record');
        }
    }
    //充值
    public function deposit(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = $request->all();
            $balance = \DB::transaction(function() use($data) {
                $account = abs($data['account']);
                $record = new DepositRecord();
                $record->card_no = $data['card_no'];
                $record->account = $account;
                $record->deposit_account = $data['origin_account'];
                $record->give_account = $data['gift_account'];
                $record->type = 1;
                $record->other = $data['seller'];
                $record->remark = $data['remark'];
                $record->file_id = $data['receipt_id'];
                $record->save();
                //卡内余额变更
                $balance = CardBalance::getBalance($data['card_no']);
                $balance->card_income = $account;
                $balance->card_outcome = 0.00;
                $balance->balance_fee = $balance->balance_fee + $account;
                $balance->save();
                return $balance;
            });
            if ($balance){
                activity()
                    ->useLog('会员卡')
                    ->withProperties($data)
                    ->performedOn($balance)
                    ->log('充值');
            }
            if (!$balance) return $this->json(1,[],'注册失败');
            return $this->json(0,[],'');
        }else{
            return view('card.deposit');
        }
    }

    //消费买课
    public function consume(Request $request)
    {
        if ($request->isMethod('POST')){
            $order = \DB::transaction(function() use($request) {
                $order = new CardCustomService();
                $order->card_no = $request->card_no;
                $order->numbers = $request->numbers;
                $order->service_id = $request->service;
                $order->fee = $request->type == 1 ? $request->account : 0.00;
                $order->enable_date = $request->expire_date[0];
                $order->disable_date = $request->expire_date[1];
                $order->other = $request->coach;
                $order->note = $request->remark;
                $order->save();
                //消费记录
                $record = new DepositRecord();
                $record->card_no = $request->card_no;
                $record->remark = $request->remark;
                $record->account = $request->type == 1 ? $request->account : 0.00;
                $record->type = 2;
                $record->custom_id = $order->id;//管理消费表
                $record->save();
                return $order;
            });
            if ($order){
                activity()
                    ->useLog('会员卡')
                    ->withProperties($request->all())
                    ->performedOn($order)
                    ->log('购买服务');
            }
            return $this->json(0,[],'');
        }else{
            $courses = ServiceDetail::all();
            return view('card.consume',compact('courses'));
        }

    }
}
