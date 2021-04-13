<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\PageList;
use App\Models\ContentList as Model;
use App\Models\ContentListTranslation as TranslationModel;
use App\Models\PageModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContentListController extends Controller
{
    protected $model_name;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'content_list';
    }

    public function index(Request $request,$module='')
    {
        $site = $request->session()->get('site');
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $word_count = Model::query()
            ->leftJoin('pages','pages.page_id','pages_contents.page_id')
            ->where('website',$site)->sum('word_count');
        $group = AdminGroups::query()->where('admin_id',Auth::id())->value('type');
        return view($this->model_name.'.list',compact('group','module','module_select','word_count'));
    }

    public function add()
    {
        $obj = new \stdClass();
        $title = 'Add a Column';
        return view($this->model_name.'.form',compact('obj','title'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        //返回默认的site
        $site = PageList::query()->findOrFail($obj->page_id)->website;
        $obj->key_value = json_decode($obj->key_value);
        $title = 'Edit a Page Content';
        return view($this->model_name.'.form',compact('obj','site','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        $page_size = $request->per_page ?? $this->page_size;
        if ($request->has('module_id')) $module = "";//证明是搜索 即不考虑当前菜单的类别。
        $res = Model::query()
            ->leftJoin('pages','pages.page_id','pages_contents.page_id')
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
            ->when($request->column_name,function ($query)use($request){
                return $query->where('pages_contents.key_name','like','%'.$request->column_name.'%');
            })
            ->when($request->name,function ($query)use($request){
                return $query->where('pages.name','like','%'.$request->name.'%');
            })
            ->when($request->sort_order,function ($query)use($request){//排序
                $field = $request->sort_prop;
                $order = $request->sort_order;
                return $query->orderBy($field,$order);
            })
            ->where('pages.website',$site)
            ->select('pages.name','pages.url','pages_contents.key_id as id','pages_contents.*','pages_modules.module')
            ->orderByDesc('key_id')
            ->paginate($page_size);
        foreach ($res->items() as $item){
            $item->key_value = json_decode($item->key_value,true) ;
        }
        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();
        $data['key_value'] = json_encode($data['key_value']);
        //单词数
        $obj = Model::query()->updateOrInsert(
            ['key_id' => $request->key_id],
            $data
        );
        if ($obj) return $this->json(0,[],$data['key_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['key_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('id'));
        TranslationModel::query()->where('key_id',\request('id'))->delete();
        return $this->json(!intval( $res->delete()),[],'');
    }

    public function translate(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = $request->all();
            if (!isset($data['locale'])) return $this->json(1,[],'locale is required');
            $data['key_value'] = json_encode($data['key_value']);

            //翻译内容 有则update 无则insert
            TranslationModel::query()->updateOrInsert(
                ['translation_id' => $request->translation_id],
                $data
            );
            return $this->json(0,[],'Translate Success');
        }else{
            $obj = Model::query()
                ->leftJoin('pages','pages.page_id','pages_contents.page_id')
                ->where('pages_contents.key_id',\request('id'))
                ->select('pages_contents.*','pages.name as page_name','pages.website','pages.url')
                ->first();
            //语言词库
            $language_select = $this->language_select;
            $obj->key_value = json_decode($obj->key_value,true) ;
            return view($this->model_name.'.translate',compact('language_select','obj'));
        }
    }
}
