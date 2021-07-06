<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CoachSettled;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    public function settled(){
        $req = request()->all();
        //验证是否重复
        if (CoachSettled::query()->where('id_number',$req['id_number'])
            ->orWhere('phone',$req['phone'])
            ->exists()) return $this->json(1,[],'您已经申请过了~');
        $req['qualification'] = json_encode($req['screenshots']);
        $req['created_at'] = date("Y-m-d H:i:s");
        unset($req['screenshots']);
        $data = CoachSettled::query()->insert($req);
        if ($data) return $this->json(0);
        return $this->json(1,'验证失败~');
    }
}
