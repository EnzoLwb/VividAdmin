<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\PageList;
use App\Models\PageList as Model;
use App\Models\PageModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageListController extends Controller
{
    protected $model_name;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'page_list';
    }

    public function index($module='')
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $group = AdminGroups::query()->where('admin_id',Auth::id())->value('type');
        return view($this->model_name.'.list',compact('module','module_select','group'));
    }

    public function add()
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $obj = new \stdClass();
        $title = 'Add New Page';
        return view($this->model_name.'.form',compact('module_select','obj','title'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        $screenshots = explode(',',$obj->screenshots);
        $data = [];//由字符串改为数组
        foreach ($screenshots as $screenshot){
            $data[] = ['url' => $screenshot];
        }
        $obj->screenshots = $data;
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $title = 'Edit Page';
        return view($this->model_name.'.form',compact('module_select','obj','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        $page_size = $request->per_page ?? $this->page_size;
        if ($request->has('module_id')) $module = "";//证明是搜索 即不考虑当前菜单的类别。
        $res = Model::query()
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
            ->when($request->sort_order,function ($query)use($request){//排序
                $field = $request->sort_prop;
                $order = $request->sort_order;
                return $query->orderBy($field,$order);
            })
            ->where('website',$site)
            ->select('page_id as id','pages.*','pages_modules.module')
            ->orderByDesc('page_id')
            ->paginate($page_size);

        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();

        //url 唯一 且 统一格式( 添加https:// 去除最后的/)
        $data['url'] = rtrim(strpos($data['url'],'http') !== false ? $data['url'] : ('https://'.$data['url']),'/');
        if (PageList::query()->where('url',$data['url'])->exists()) return $this->json(1,[],'Page Url Already exists');
        //图片根据需求 逗号链接
        $screenshots = [];
        foreach ($data['screenshots'] as $screenshot){
            $screenshots[] = $screenshot['url'];
        }
        $data['screenshots'] = implode(',',$screenshots );
        $obj = Model::query()->updateOrInsert(
            ['page_id' => $request->page_id],
            $data
        );
        if ($obj) return $this->json(0,[],$data['page_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['page_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('id'));
        //暂时不删除 其他关联的数据
        return $this->json(!intval( $res->delete()),[],'');
    }
}
