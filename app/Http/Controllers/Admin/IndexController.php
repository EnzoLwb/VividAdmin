<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\Role;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    //首页
    public function home()
    {
        //查看是否有首页的权限 没有则权限列表第一个地址
        $role = Role::query()->findOrFail(\auth()->user()->role_id)->policy_uri;
        $policy_uri = json_decode($role,true);
        return redirect()->to(current($policy_uri));
//        return redirect()->to("/admin/logs/list");
    }

    //表单中 根据选择site来返回所有的pages
    public function getPagesBySite()
    {
        $site = \request('site');
        $data = PageList::query()->where('website',$site)->select('name','url','page_id')->get();
        return $this->json(0,$data,'');
    }

    //翻译中 根据不同的Model 和 选择语种 返回翻译记录
    public function translateRecord()
    {
        $model = \request('model');
        $relate_id = \request('relate_id'); //例如pic_id meta_id
        $locale = \request('locale');
        $id = \request('id');
        $obj = "App\Models\\".$model;
        $obj = new $obj;
        $data = $obj->query()->where([
            $relate_id => $id,
            'locale' => $locale,
        ])->first();
        return $this->json(0,$data,'');
    }
}
