<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\VolunteerNews;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request,$type)
    {
        $search = \request('search');
        $status = \request('status');
        $leader = AdminGroups::leader();
        //基层工会人员看不到未上线
        $data = VolunteerNews::query()
            ->where('type',$type)
            ->when($search,function ($query) use($search){
                return $query->where('title','like','%'.$search.'%');
            })
            ->when(!$leader,function ($query) use($search){
                return $query->where('status',1);
            })
            ->select('id','cover','status','weight','title','tag','created_at')
            ->orderBy('weight','desc')
            ->paginate($this->page_size);
        $title = VolunteerNews::TYPE_NEWS[$type] ?? "";

        return view('volunteer.news.list',compact('title','status','data','search','leader'));
    }

    public function add(Request $request,$type=null)
    {
        $show=3;
        $article= json_encode(new \stdclass());
        $title = isset($type) ? VolunteerNews::TYPE_NEWS[$type] : "资讯";
        return view('volunteer.news.form',compact('title','type','show','article','type'));
    }

    public function save(Request $request)
    {
        if (!$request->title) return $this->json(1,[],'标题必填');
        if (!$request->cover) return $this->json(1,[],'封面必填');
        if (!\request('content')) return $this->json(1,[],'内容必填');

        $obj = $request->id ? VolunteerNews::find($request->id) : new VolunteerNews();
        $msg = $request->id ? '修改成功' : '新增成功';
        $obj->title = $request->title;
        $obj->weight = $request->weight;
        $obj->status = $request->status;
        $obj->type = $request->type ?? 'law';
        $obj->tag = implode('|',$request->tags);
        $obj->content = \request('content');
        $obj->cover = \request('cover');
        $obj->save();
        return $this->json(0,$obj,$msg);
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        VolunteerNews::find($id)->delete();
        return $this->json(0,[],'');
    }

    public function edit(VolunteerNews $article)
    {
        $show = 2;
        $article->tags = $article->tag ? explode('|', $article->tag):[];
        $title = isset($article->type) ? VolunteerNews::TYPE_NEWS[$article->type] : "资讯";
        $type = $article->type;
        return view('volunteer.news.form',compact('article','show','title','type'));
    }

    public function show(VolunteerNews $article)
    {
        $show = 1;
        $article->tags = explode('|', $article->tag);
        $title = isset($article->type) ? VolunteerNews::TYPE_NEWS[$article->type] : "资讯";
        $type = $article->type;
        return view('volunteer.news.form',compact('title','article','show','type'));
    }

}
