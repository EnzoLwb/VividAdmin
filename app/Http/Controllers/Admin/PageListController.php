<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\PageModule;
use Illuminate\Http\Request;

class PageListController extends Controller
{
    public function index($module='')
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        return view('page_list.list',compact('module','module_select'));
    }

    public function add()
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $obj = new \stdClass();
        $title = 'Add New Page';
        return view('page_list.form',compact('module_select','obj','title'));
    }

    public function edit()
    {
        $obj = PageList::query()->findOrFail(\request('id'));
        $screenshots = explode(',',$obj->screenshots);
        $data = [];//由字符串改为数组
        foreach ($screenshots as $screenshot){
            $data[] = ['url' => $screenshot];
        }
        $obj->screenshots = $data;
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $title = 'Edit Page';
        return view('page_list.form',compact('module_select','obj','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        if ($request->has('module_id')) $module = "";//证明是搜索 即不考虑当前菜单的类别。
        $res = PageList::query()
            ->leftJoin('pages_modules','pages_modules.module_id','pages.module_id')
            ->when($module,function ($query)use($module){//菜单中的类别
                return $query->where('pages_modules.module',$module);
            })
            ->when($request->module_id,function ($query)use($request){//搜索中的类别
                return $query->where('pages.module_id',$request->module_id);
            })
            ->when($request->url,function ($query)use($request){
                return $query->where('pages.url','like','%'.$request->url.'%');
            })
            ->when($request->page_name,function ($query)use($request){
                return $query->where('pages.name','like','%'.$request->page_name.'%');
            })
            ->where('website',$site)
            ->select('page_id as id','pages.*','pages_modules.module')
            ->orderByDesc('page_id')
            ->paginate($this->page_size);

        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        //图片根据需求 逗号链接
        $data = $request->all();
        $screenshots = [];
        foreach ($data['screenshots'] as $screenshot){
            $screenshots[] = $screenshot['url'];
        }
        $data['screenshots'] = implode(',',$screenshots );
        $obj = PageList::query()->updateOrInsert(
            ['page_id' => $request->page_id],
            $data
        );
        if ($obj) return $this->json(0,[],$data['page_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['page_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = PageList::findorFail(\request('id'));
        return $this->json(!intval( $res->delete()),[],'');
    }
}
