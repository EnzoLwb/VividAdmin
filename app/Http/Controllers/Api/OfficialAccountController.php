<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MiniUser;
use Illuminate\Http\Request;

class OfficialAccountController extends Controller
{
    protected $wx_app_id;
    protected $wx_app_secret;
    protected $wx_app_key;
    protected $wx_merchant_id;


    public function __construct()
    {
        $this->wx_app_id = env('WX_APP_ID','wxca33695e8de6ef81');
        $this->wx_app_secret = env('WX_APP_SECRET','8decb7a670630e29c1d9567c8b1a093f');
        $this->wx_app_key = env('WX_KEY','16d9d66e55034e0789f823d3e4044639');//商户的key  不是appid
        $this->wx_merchant_id = env('WX_MCH_ID','1556517321');
    }

    //登录
    public function login(Request $request)
    {
        $appId = $this->wx_app_id;;
        $secret = $this->wx_app_secret;
        $code = $request->code;
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appId}&secret={$secret}&js_code={$code}&grant_type=authorization_code";

        //查询数据库是否有该用户注册
        $data = json_decode(self::curl_get($url),true);
        $weappOpenid = $data['openid'];
        $nickname = $request->nickname;
        $avatar = $request->avatar;//拿到分辨率高点的头像

        //找到 openid 对应的用户
        $user = MiniUser::where('open_id', $weappOpenid)->first();

        //没有，就注册一个用户
        if (!$user) {
            $user = MiniUser::create([
                'platform' => 2,
                'open_id' => $weappOpenid,
                'avatar' => $avatar,
                'nickname' => $nickname,
            ]);
            $user->volunteer = '';
        }else{
            $user->avatar = $avatar;
            $user->nickname = $nickname;
            $user->save();
            //查询是否是志愿者
        }
        return $this->list_json(0,$user,'');
    }
}
