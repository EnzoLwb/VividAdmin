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

    public function exchange()
    {
        $appKey = env('BEIJIXING_APP_KEY', "e75268578b09bf52"); //key
        $secret = env('BEIJIXING_APP_SECRET', "c33d37540b2cbcf79671bd5bfe555ddb3916e423"); //秘钥
        $timestamp = date('Y-m-d H:i:s');
        $format = 'json';
        $v = 1;
        $sign_method = 'MD5';
        $qr_code = \request('code');
        $open_shop_uuid = 'b4942aabff789433ad28b34ec2e2a182';
        $session = '6f06a05d12a47672c3abe3c9e3db682c9dbc04c2';

        $data = [
            'app_key' => $appKey,
            'timestamp' => $timestamp,
            'sign_method' => $sign_method,
            'format' => $format,
            'v' => $v,
            'session' => $session,
        ];
        $arr = [
            'requestid'=>'123',
            'receipt_code' => $qr_code,
            'open_shop_uuid' => $open_shop_uuid,
        ];
        $data = array_merge($data, $arr);
        ksort($data);
        $sign = $this->cal_sign($secret, $data);//获取签名
        $data['sign'] = $sign;
        $data = array_merge($data, $arr);
        $postdata = http_build_query($data);
        $url = 'https://openapi.dianping.com/router/tuangou/receipt/prepare';//输码查询券
        //$url = 'https://openapi.dianping.com/router/tuangou/receipt/consume';//验券
        $tmpInfo=$this->curl_post($url,$postdata);
        dd($tmpInfo);
    }

    /**
     * 计算签名
     *
     * @param $app_secret 三方app_secret
     * @param $req_param 请求参数集合，包括公共参数和业务参数
     * @return string md5签名
     */
    function cal_sign($app_secret, $req_param)
    {
        // 排序所有请求参数
        ksort($req_param);
        $src_value = "";
        // 按照key1value1key2value2...keynvaluen拼接
        foreach ($req_param as $key => $value) {
            $src_value .= ($key . $value);
        }
        //计算md5
        return md5($app_secret . $src_value . $app_secret);
    }

}
