<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public  $page_size;
    public function __construct()
    {
        $this->page_size = request('per_page',10);
    }
    /**
     * 将xml转为array
     * @param string $xml
     * return array
     */
    public function xml_to_array($xml){
        if(!$xml){
            return false;
        }
        //将XML转为array
        //禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $data = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
        return $data;
    }

    //部门树 $child 无子关联时是否需要返回 children字段
    function getTree($data, $pId,$child = true)
    {
        $tree = [];
        foreach ($data as $k => $v) {
            $data[$k]['show-'.$v['id']] = false;
            if ($v['p_id'] == $pId) {
                $children = $this->getTree($data, $v['id'],$child);
                if ($child || $children!==[]){
                    $v['children'] = $children;
                }
                $tree[] = $v;
            }
        }
        return $tree;
    }

    public function json($code,$data=[],$message='')
    {
        return response()->json(compact('code','message','data'));
    }

    //0 表示成功  其他看message返回
    public function list_json($code,$list=[],$message='',$total=0)
    {
        return response()->json(compact('code','message','list','total'));
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
