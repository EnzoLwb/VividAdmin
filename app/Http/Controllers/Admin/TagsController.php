<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
class TagsController extends Controller
{
    public function index()
    {
        $page_size = \request('page_size',10);
        $real_name = \request('real_name');
        $name = \request('name');
        $data = Tag::query()->leftJoin('admins','admins.id','tags.admin_id')
            ->where('tags.status',1)
            ->when($name,function ($query)use($name){
                return $query->where('tags.name','like','%'.$name.'%');
            })
            ->when($real_name,function ($query)use($real_name){
                return $query->where('admins.real_name','like','%'.$real_name.'%');
            })
            ->select('tags.*','admins.real_name')
            ->latest()
            ->paginate($page_size);
        return view('tags.list',[
            'data'=>$data,
            'queryConfig'=>[
                'real_name'=>$real_name,
                'name'=>$name,
            ]
        ]);
    }

    public function search(Request $request)
    {
        $name = \request('tag');
        $data = Tag::query()
            ->where('status',1)
            ->where('name','like','%'.trim($name).'%')
            ->select('name','desc','type')
            ->latest()
            ->get();

        return $this->json(0,$data,'');
    }

    public function update(Request $request)
    {
        $response = Gate::inspect('leader-action',Auth::user());
        $code = 0;
        if ($response->allowed()) {
            //不能有重复
            $id = \request('id');
            $tag = Tag::query()
                ->where('name',\request('name'))
                ->where('status',1)
                ->value('id');
            if (($id && $tag && ($tag !=$id) ) ||(!$id && $tag)) return $this->json(1,[],'标签名称重复');

            $obj = $id ? Tag::find($id) : new Tag() ;
            $obj->name = \request('name');
            $obj->desc = \request('desc');
            $obj->type = \request('type','primary');
            $obj->admin_id = Auth::id();
            $obj->save();
            $msg = $id ? '编辑成功':'新增成功';
        } else {
            $code = 1;
            $msg = $response->message();
        }
        return $this->json($code,[],$msg);
    }

    //删除
    public function delete($id){
        $response = Gate::inspect('leader-action',Auth::user());
        if ($response->allowed()) {
            activity()->disableLogging();
            $tag = Tag::findOrfail($id);
            $tag->update(['status'=>2]);
            activity()->enableLogging();
            activity()
                ->useLog('标签')
                ->performedOn($tag)
                ->withProperties(['name' => $tag->name])
                ->log('删除');
        } else {
            $code = 1;
            $msg = $response->message();
        }
        return $this->json($code ?? 0,[],$msg??'');
    }
}
