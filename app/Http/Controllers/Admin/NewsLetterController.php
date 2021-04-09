<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\NewsLetter as Model;
use App\Models\NewsLetterTranslation as TranslationModel;
use Illuminate\Http\Request;

class NewsLetterController extends Controller
{
    protected $model_name;
    public function __construct()
    {
        parent::__construct();
        $this->model_name = 'news_letter';
    }

    public function index(Request $request)
    {
        $word_count = Model::query()->sum('wordCount');
        return view($this->model_name.'.list',compact('word_count'));
    }

    public function add()
    {
        $obj = new \stdClass();
        $title = 'Add a Template';
        return view($this->model_name.'.form',compact('obj','title'));
    }

    public function edit()
    {
        $obj = Model::query()->findOrFail(\request('id'));
        //返回默认的site
        $site = PageList::query()->findOrFail($obj->page_id)->website;
        $title = 'Edit Template';
        return view($this->model_name.'.form',compact('obj','site','title'));
    }

    public function list(Request $request)
    {
        $page_size = $request->per_page ?? $this->page_size;
        $res = Model::query()
            ->when($request->name,function ($query)use($request){
                return $query->where('emailName','like','%'.$request->name.'%');
            })
            ->when($request->subject,function ($query)use($request){
                return $query->where('emailSubject','like','%'.$request->subject.'%');
            })
            ->when($request->sort_order,function ($query)use($request){//排序
                $field = $request->sort_prop;
                $order = $request->sort_order;
                return $query->orderBy($field,$order);
            })
            ->orderByDesc('emailId')
            ->paginate($page_size);

        return $this->json(0,$res,'');
    }

    public function save(Request $request){
        $data = $request->all();
        //单词数
        $obj = Model::query()->updateOrInsert(
            ['emailId' => $request->emailId],
            $data
        );
        if ($obj) return $this->json(0,[],$data['emailId'] ? 'Edit Success!':'Add Success!');
        if (!$obj) return $this->json(1,[],$data['emailId'] ? 'Edit Failed!':'Add Failed!');
    }

    public function delete()
    {
        $res = Model::findorFail(\request('emailId'));
        return $this->json(!intval( $res->delete()),[],'');
    }

    public function translate(Request $request)
    {
        if ($request->isMethod('POST')){
            $data = $request->all();
            if (!isset($data['locale'])) return $this->json(1,[],'locale is required');
            //翻译内容 有则update 无则insert
            TranslationModel::query()->updateOrInsert(
                ['translationId' => $request->translation_id],
                $data
            );
            return $this->json(0,[],'Translate Success');
        }else{
            $obj = Model::findOrFail($request->emailId);
            //语言词库
            $language_select = $this->language_select;
            return view($this->model_name.'.translate',compact('language_select','obj'));
        }
    }
}
