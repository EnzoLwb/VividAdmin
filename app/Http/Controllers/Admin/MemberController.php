<?php

namespace App\Http\Controllers\Admin;

use App\Exports\MembersExport;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\CardBalance;
use App\Models\CardCustomService;
use App\Models\DepositRecord;
use App\Models\MemberShip;
use App\Models\ServiceDetail;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = MemberShip::query()
                ->when($request->card_no,function ($query){
                    return $query->where('card_no','like','%'.\request('card_no').'%');
                })
                ->when($request->name,function ($query){
                    return $query->where('name','like','%'.\request('name').'%');
                })
                ->when($request->gender,function ($query){
                    return $query->where('gender',\request('gender'));
                })
                ->when($request->register_date,function ($query){
                    $start_time = \request('register_date')[0];
                    $end_time = \request('register_date')[1];
                    return $query->where('created_at','>=',$start_time)->where('created_at','<=',$end_time);
                })
                ->orderByDesc('id')
                ->paginate($this->page_size);

            // 获取教练
            foreach ($data->items() as $item){
                if ($item->coach){
                    $coach_ids = explode(',',$item->coach);
                    $names = Admin::query()->whereIn('id',$coach_ids)->pluck('real_name')->toArray();
                    $item->coach = implode($names,' ');
                }
            }
            return $this->json(0,$data,'');
        }
        return view('membership.list');
    }

    public function export(Request $request){
        $data = MemberShip::query()
            ->whereIn('id',$request->data)
            ->orderByDesc('id')
            ->select('card_no','name','id_number','phone','gender','register_time')
            ->get()->toArray();
        foreach ($data as $item){
            $item['gender'] =  $item['gender'] == 1 ? '男':'女';
        }
        $header = ['卡号','姓名','身份证号','手机号','性别','入会时间'];
        $disk = 'export';//保存的磁盘地址
        $file_name = date('mdHi').rand(1000,9999).'.xls';
        Excel::store(new MembersExport($data,$header),$file_name,$disk);
        $res['data'] = route('download', ['file' => $file_name,'type' => $disk]);
        return $this->json(0,$res,1);
    }

    public function add()
    {
        return view('membership.register');
    }
    public function edit()
    {
        $card_no = \request('card_no');
        $obj = MemberShip::getMemberByCardNo($card_no);
        $obj->pic_path = $obj->pic_id ? UploadedFile::find($obj->pic_id)->file_path : '';
        $obj->register_date = $obj->register_time ;
        if (!$obj) abort(404);
        return view('membership.form',compact('obj'));
    }


    public function save(Request $request)
    {
        //验证会员卡号 是否重复
        if (!$request->id &&
            MemberShip::query()->where('card_no',$request->card_no)->exists()
        ) return $this->json(1,[],'此卡号已注册');
        if (!$request->id &&
            MemberShip::query()->where('phone',$request->phone)->exists()
        ) return $this->json(1,[],'此手机号已注册');
        $balance = \DB::transaction(function() use($request) {
            if ($request->id){
                $member = MemberShip::find($request->id);
                $member->name = $request->name;
                $member->card_no = $request->card_no;
                $member->id_number = $request->id_number;
                $member->phone = $request->phone;
                $member->gender = $request->gender;
                $member->register_time = $request->register_date;
                $member->coach = implode(',',$request->coach);
                $member->pic_id = $request->pic_id;
                $member->save();
                $balance = true;
            }else{
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
            }
            return $balance;
        });
        if (!$balance) return $this->json(1,[]);
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
            $data->balance = CardBalance::getBalance($data->card_no) ;
        }
        return $this->json(0,$data,'');
    }
}
