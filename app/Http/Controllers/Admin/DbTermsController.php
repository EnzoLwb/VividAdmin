<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\PageList;
use App\Models\DbTerm as Model;
use App\Models\DbTermsTranslation as TranslationModel;
use App\Models\PageModule;
use App\Models\WordPageDetail as PageDetailModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DbTermsController extends Controller
{
    protected $model_name;
    protected $page_detail_table;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'db_terms';
        $this->page_detail_table = 'words_pages_detail';
    }

    public function index(Request $request,$module='')
    {
        $language_select = $this->language_select;
        $group = AdminGroups::query()->where('admin_id',Auth::id())->value('type');
        return view($this->model_name.'.list',compact('module','language_select','group'));
    }

    public function add()
    {
        $obj = new \stdClass();
        $title = 'New Word';
        return view($this->model_name.'.form',compact('obj','title'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        $obj->page_ids = PageDetailModel::query()->where('word_id',\request('id'))
            ->pluck('page_id')->toArray();
        //返回默认的site
        $site = PageList::query()->where('page_id',current($obj->page_ids))->value('website');
        $title = 'Edit Word';
        return view($this->model_name.'.form',compact('obj','site','title'));
    }

    public function list(Request $request, $module='')
    {
        $site = $request->session()->get('site');
        $page_size = $request->per_page ?? $this->page_size;
        $module_id = PageModule::query()->where('module',$module)->value('module_id');
        $page_list = PageList::query()
            ->when($module_id,function ($query)use($module_id){
                return $query->where('module_id',$module_id);
            })
            ->where('website',$site)->pluck('page_id')->toArray();

        $res = Model::query()
            ->leftJoin($this->page_detail_table,$this->page_detail_table.'.word_id','words.word_id')
            ->when($request->word,function ($query)use($request){
                return $query->where('word','like','%'.$request->word.'%');
            })
            ->when($module_id,function ($query)use($module_id,$page_list){
                return $query->whereIn('page_id',$page_list);
            },function ($query) use($module){
                if ($module)  return $query->where('page_id',0);//没有page_id 则返回空数据 $module 一级菜单就不遵循了
            })
            ->when(count($page_list),function ($query)use($page_list){
                return $query->whereIn('page_id',$page_list);
            })
            ->when($request->sort_order,function ($query)use($request){//排序
                $field = $request->sort_prop;
                $order = $request->sort_order;
                return $query->orderBy($field,$order);
            })
            ->groupBy('words.word_id')
            ->select('words.*')
            ->orderByDesc('word_id')
            ->paginate($page_size);
        foreach ($res->items() as $item){
            $item->page_detail = [];
            $pages = PageDetailModel::query()->where('word_id',$item->word_id)->pluck('page_id')->toArray();
            $item->page_detail = PageList::query()
                ->leftJoin('pages_modules','pages_modules.module_id','pages.module_id')
                ->whereIn('page_id',$pages)->select('pages.*','pages_modules.module')->get();

            //翻译结果 默认是不查询翻译的
            $item->translate = "";
            if(\request('locale')){
                $item->translate = TranslationModel::query()->where([
                    'word_id' => $item->word_id,
                    'locale' => \request('locale'),
                ])->value('word');
            }
        }
        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();
        $page_ids = $data['page_ids'];
        unset($data['page_ids']);
        if ($request->word_id){
            //Update 先删除之前记录 然后再insert到关联表
            $obj = Model::query()->find($request->word_id);
            $obj->update($data);
            PageDetailModel::query()->where('word_id',$request->word_id)->delete();
            $obj = $request->word_id;
        }else{
            //Insert 直接插入到关联表
            $obj = Model::query()->insertGetId($data);
        }
        $detail = [];
        foreach ($page_ids as $page_id){
            $detail[] = [
                'word_id' => $obj,
                'page_id' => $page_id,
            ];
        }
        PageDetailModel::query()->insert($detail);
        if ($obj) return $this->json(0,[],$data['word_id'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['word_id'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('id'));
        PageDetailModel::query()->where('word_id',\request('id'))->delete();
        TranslationModel::query()->where('word_id',\request('id'))->delete();
        return $this->json(!intval( $res->delete()),[],'');
    }

    public function translate(Request $request)
    {
        if ($request->isMethod('POST')){
            //更新翻译结果
            $data = $request->all();
            if (!isset($data['locale'])) return $this->json(1,[],'locale is required');
            $result = TranslationModel::query()
                ->where(['word_id' => $request->word_id,'locale' => $data['locale']])->exists();
            //翻译内容 有则update 无则insert
            TranslationModel::query()->updateOrInsert(
                ['word_id' => $request->word_id,'locale' => $data['locale'],],
                ['word' => $data['translate']]
            );
            return $this->json(0,[],$result ? 'Translate Update Success' : 'Translate Add Success');
        }
        if ($request->isMethod('GET')){
            //返回翻译结果
            $word_ids = explode(',',$request->word_ids);
            $res = TranslationModel::query()
                ->where('locale',\request('locale'))
                ->whereIn('word_id',$word_ids)->pluck('word','word_id')->toArray();
            return $this->json(0,$res,'');
        }
    }
}
