<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\SeoList as Model;
use App\Models\SeoListTranslation as TranslationModel;
use App\Models\PageModule;
use Illuminate\Http\Request;

class SEOListController extends Controller
{
    protected $model_name;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'seo_list';
    }

    public function index($module='')
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        $word_count = Model::query()->sum('word_count');
        return view($this->model_name.'.list',compact('module','module_select','word_count'));
    }

    public function add()
    {
        $obj = new \stdClass();
        $title = 'Add SEO Column';
        return view($this->model_name.'.form',compact('obj','title'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        //返回默认的site
        $site = PageList::query()->findOrFail($obj->page_id)->website;
        $title = 'Edit SEO Column';
        return view($this->model_name.'.form',compact('obj','site','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        $page_size = $request->per_page ?? $this->page_size;
        if ($request->has('module_id')) $module = "";//证明是搜索 即不考虑当前菜单的类别。
        $res = Model::query()
            ->leftJoin('pages','pages.page_id','pages_seo_meta.page_id')
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
                return $query->where('pages_seo_meta.key_name','like','%'.$request->column_name.'%');
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
            ->select('pages.name','pages.url','pages_seo_meta.meta_id as id','pages_seo_meta.*','pages_modules.module')
            ->orderByDesc('meta_id')
            ->paginate($page_size);

        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();
        //单词数
        $obj = Model::query()->updateOrInsert(
            ['meta_id' => $request->meta_id],
            $data
        );
        if ($obj) return $this->json(0,[],$data['meta_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['meta_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('id'));
        return $this->json(!intval( $res->delete()),[],'');
    }

    public function translate(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = $request->all();
            if (!isset($data['locale'])) return $this->json(1,[],'locale is required');
            //翻译内容 有则update 无则insert
            TranslationModel::query()->updateOrInsert(
                ['translation_id' => $request->translation_id],
                $data
            );
            return $this->json(0,[],'');
        }else{
            $obj = Model::query()
                ->leftJoin('pages','pages.page_id','pages_seo_meta.page_id')
                ->where('pages_seo_meta.meta_id',\request('id'))
                ->select('pages_seo_meta.*','pages.name as page_name','pages.website','pages.url')
                ->first();
            //语言词库
            $language_select = [
                'Chinese' => 'zh',
                'English' => 'en',
            ];
            return view($this->model_name.'.translate',compact('language_select','obj'));
        }
    }
}
