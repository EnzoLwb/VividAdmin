<?php

namespace App\Http\Controllers;

use App\Models\AdminGroups;
use App\Models\Language;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public  $page_size;
    public  $language_select;
    public function __construct()
    {
        $this->page_size = 10;
        $languages = Cache::rememberForever('languages', function () {
            return Language::query()
                ->where('vcShortName','!=','')
                ->whereNotNull('lno')
                ->where('lStatus','verified')
                ->orderBy('vcLangName','asc')
                ->pluck('vcShortName','vcLangName');
        });
        $this->language_select = $languages;
    }

    public function json($code,$data=[],$message='')
    {
        return response()->json(compact('code','message','data'));
    }

    //  get请求
    public static function curl_get($url,$cookie=null){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        if ($cookie) curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);//设置cookie信息保存在指定的文件夹中
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    //  post请求
    public static function curl_post($url, $curlPost)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }


}
