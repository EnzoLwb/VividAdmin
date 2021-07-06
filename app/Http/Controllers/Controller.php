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
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    //post请求
    private function curl_post2($url,$postdata){
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检测
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Expect:'
        )); // 解决数据包大不能提交
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
// curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        $tmpInfo = curl_exec($curl); // 执行操作
        if (curl_errno($curl)) {
            echo 'Errno' . curl_error($curl);
        }
        curl_close($curl); // 关键CURL会话
        $tmpInfo=json_decode($tmpInfo,true);
        return $tmpInfo;
    }

}
