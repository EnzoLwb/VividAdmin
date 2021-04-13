<?php
if (!function_exists('cdn')) {

    /**
     * 统一处理资源文件路径，方面以后切换cdn
     *
     * @author lwb
     * @param $path
     * @return string
     */
    function cdn($path)
    {
        return asset($path);
    }
}
if (!function_exists('filter_excel_str')) {

    function filter_excel_str($name, $str) //name 企业名称 str工会名称
    {
        $name = trim($name);
        if (!empty($name)) return $name;
        $str = trim($str);
        if (strripos($str,'工会')){
            return substr($str,0,strripos($str,'工会'));
        }elseif (strripos($str,'团支部')){
            return substr($str,0,strripos($str,'团支部'));
        }elseif (strripos($str,'妇联')){
            return substr($str,0,strripos($str,'妇联'));
        }else{//什么都没有的
            return $str;
        }
    }
}

if (!function_exists('array2csv')) {
    /**
     * @param array $array
     * @return csv格式的数据
     */
    function array2file(array &$array)
    {
        if (count($array) == 0) {
            return null;
        }
        $path = '/tmp/' . date('Y_m_d_H_i_s').md5(date('YmdHis').mt_rand(10000,99999)).'.csv';
        $df = fopen($path, 'w');
        fputcsv($df, array_keys(reset($array)));
        foreach ($array as $row) {
            fputcsv($df, $row);
        }
        fclose($df);
        return $path;
    }
}

function allModulesMenu($first_menu,$pid=0){
    $modules = ['main','common','client_account','client_order','client_project',
        'client_support','provider_account','provider_support','provider_test','other'];
    $data = [];
    foreach ($modules as $module){
        $data[] = [
            "url" => "/admin/".$first_menu."/".$module,
            "name" => $module,
            "icon" => "",
            "pid" => $pid,
            "site" => "service",
        ];
    }
    return $data;
}
function wordCount($sentence){
    return count( explode(' ',trim($sentence)) );
}
