<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CardBalance;
use App\Models\MemberShip;
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

    public function getMember()
    {
        $data = MemberShip::getMemberByCardNo(\request('card_no'));
        return $this->json(0,$data,'');
    }
}
