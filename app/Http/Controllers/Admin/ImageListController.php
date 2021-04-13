<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\PageList;
use App\Models\ImageList as Model;
use App\Models\ImageListTranslation as TranslationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImageListController extends Controller
{
    protected $model_name;
    protected $type_select;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'img_list';
        $this->type_select = [
            "Index","Our Service"
        ];
    }

    public function index(Request $request,$module='')
    {
        $site = $request->session()->get('site');
        $word_count = Model::query()
            ->leftJoin('pages','pages.page_id','pages_pics.page_id')
            ->where('website',$site)->sum('word_count');
        $type_select = $this->type_select;
        $group = AdminGroups::query()->where('admin_id',Auth::id())->value('type');
        return view($this->model_name.'.list',compact('module','type_select','word_count','group'));
    }

    public function add()
    {
        $obj = new \stdClass();
        $title = 'Add a Image';
        $type_select = $this->type_select;
        return view($this->model_name.'.form',compact('obj','title','type_select'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        $obj->descriptions = json_decode($obj->descriptions,true);
        //返回默认的site
        $site = PageList::query()->findOrFail($obj->page_id)->website;
        $title = 'Edit a Image';
        $type_select = $this->type_select;
        return view($this->model_name.'.form',compact('obj','type_select','site','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        $page_size = $request->per_page ?? $this->page_size;
        if ($request->has('module_id')) $module = "";//证明是搜索 即不考虑当前菜单的类别。
        $res = Model::query()
            ->leftJoin('pages','pages.page_id','pages_pics.page_id')
            ->leftJoin('pages_modules','pages_modules.module_id','pages.module_id')
            ->when($module,function ($query)use($module){//菜单中的类别
                return $query->where('pages_modules.module',$module);
            })
            ->when($request->name,function ($query)use($request){
                return $query->where('pages.name','like','%'.$request->name.'%');
            })
            ->when($request->type,function ($query)use($request){
                return $query->where('pages_pics.pic_type',$request->type);
            })
            ->when($request->title,function ($query)use($request){
                return $query->where('pages_pics.title','like','%'.$request->title.'%');
            })
            ->when($request->page_url,function ($query)use($request){
                return $query->where('pages.url','like','%'.$request->page_url.'%');
            })
            ->when($request->sort_order,function ($query)use($request){//排序
                $field = $request->sort_prop;
                $order = $request->sort_order;
                return $query->orderBy($field,$order);
            })
            ->where('pages.website',$site)
            ->select('pages.name','pages.url as page_url','pages_pics.pic_id as id','pages_pics.*','pages_modules.module')
            ->orderByDesc('pic_id')
            ->paginate($page_size);

        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();
        $data['descriptions'] = json_encode($data['descriptions']);
        $obj = Model::query()->updateOrInsert(
            ['pic_id' => $request->pic_id],
            $data
        );
        if ($obj) return $this->json(0,[],$data['pic_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['pic_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('id'));
        TranslationModel::query()->where('pic_id',\request('id'))->delete();
        return $this->json(!intval( $res->delete()),[],'');
    }

    public function translate(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = $request->all();
            if (!isset($data['locale'])) return $this->json(1,[],'locale is required');
            $data['descriptions'] = json_encode($data['descriptions']);
            //翻译内容 有则update 无则insert
            TranslationModel::query()->updateOrInsert(
                ['translation_id' => $request->translation_id],
                $data
            );
            return $this->json(0,[],'Translate Success');
        }else{
            $obj = Model::query()
                ->leftJoin('pages','pages.page_id','pages_pics.page_id')
                ->where('pages_pics.pic_id',\request('id'))
                ->select('pages_pics.*','pages.name as page_name','pages.website','pages.url as page_url')
                ->first();
            //语言词库
            $language_select = $this->language_select;
            $obj->descriptions = json_decode($obj->descriptions,true) ;
            return view($this->model_name.'.translate',compact('language_select','obj'));
        }
    }
}
