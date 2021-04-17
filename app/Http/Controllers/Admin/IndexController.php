<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    //首页
    public function home()
    {
        //查看是否有首页的权限 没有则权限列表第一个地址
        $site = session()->get('site');
        $role_id = $site == 'Service' ? Auth::user()->role_id :  Auth::user()->media_role_id;
        $role = Role::query()->findOrFail($role_id)->policy_uri;
        $policy_uri = json_decode($role,true);
        return redirect()->to(current($policy_uri));
//        return redirect()->to("/admin/logs/list");
    }

    //表单中 根据选择site来返回所有的pages
    public function getPagesBySite()
    {
        $site = \request('site');
        $data = PageList::query()->where('website',$site)
            ->select('name','url','page_id')->get();
        return $this->json(0,$data,'');
    }

    //筛选出除去该实体下的page_id 的page
    public function getPagesByCopy()
    {
        $model = \request('model');
        $meta_key = \request('meta_name_key');
        $meta_val = \request('meta_name_val');
        $obj_name = "App\Models\\".$model;
        $obj = new $obj_name;
        $exists_page_ids = $obj->where($meta_key,$meta_val)->pluck('page_id')->toArray();
        if (count($exists_page_ids) > 0 ){
            $site = PageList::find(current($exists_page_ids))->website;
            $pages = PageList::query()->where('website',$site)
                ->whereNotIn('page_id',$exists_page_ids)
                ->select('name','url','page_id')->get();
            return $this->json(0,$pages,'');
        }
        return $this->json(1,[],'Parent Page Not Exists!');
    }

    public function paste(Request $request)
    {

        $obj_name = "App\Models\\".$request->model;
        $obj = new $obj_name;
        $origin_obj = $obj->find($request->origin_id)->toArray();
        $primary_key = $obj->getKeyName();
        unset($origin_obj[$primary_key]);
        $origin_obj['page_id'] = $request->page_id;
        $data = new $obj_name();
        $new_data = $data->create($origin_obj);
        return $this->json(0,$new_data,'');
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

    public function repeatWord()
    {
        $model = \request('model');
        $key = \request('key'); //检查的字段
        $value = \request('value');
        $current_id = \request('current_id');
        $obj = "App\Models\\".$model;
        $obj = new $obj;
        $primary_key = $obj->getKeyName();
        $data = $obj->query()->where($key,$value)
            ->where($primary_key,'!=',$current_id)
            ->exists();
        return $this->json(0,['exist'=>$data],'');
    }
}
