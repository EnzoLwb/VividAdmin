<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\CardBalance;
use App\Models\DepositRecord;
use App\Models\MemberShip;
use Illuminate\Http\Request;

class CardController extends Controller
{
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
    public function consume()
    {
        return view('card.consume');
    }
}
