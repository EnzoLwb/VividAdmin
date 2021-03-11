<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Spatie\Activitylog\Models\Activity;

class LogsController extends Controller
{
    public function logList(Request $request)
    {
        $page_size = \request('page_size',10);
        $causer_id = \request('causer_id');
        $model = \request('model');
        $action = \request('action');
        $date = \request('date');
        $model_options = Activity::query()->groupBy('log_name')->select('log_name as label')->get();
        $action_options = Activity::query()->groupBy('description')->select('description as label')->get();
        $data = Activity::query()->leftJoin('admins','admins.id','activity_log.causer_id')
            ->when($causer_id,function ($query)use($causer_id){
                return $query->where('admins.real_name','like',$causer_id.'%');
            })
            ->when($action,function ($query)use(&$action){
                $action = explode(',',$action);
                return $query->whereIn('activity_log.description',$action);
            })
            ->when($model,function ($query)use(&$model){
                $model = explode(',',$model);
                return $query->whereIn('activity_log.log_name',$model);
            })
            ->when($date,function ($query)use($date){
                $date_arr = explode(',',$date);
                $begin = $date_arr[0].' 00:00:00';
                $end = $date_arr[1].' 23:59:59';
                return $query->whereBetween('activity_log.created_at',[$begin,$end]);
            })
            ->select('activity_log.*','admins.real_name')
            ->latest()
            ->paginate($page_size);

        //日志具体内容展现
        foreach ($data->items() as &$v){
            $v->content = $this->filterLog($v);
        }

        return view('logs.list',[
            'data'=>$data,
            'modelOptions'=>$model_options,
            'actionOptions'=>$action_options,
            'queryConfig'=>[
                'causer_id'=>$causer_id,
                'model'=>$model,
                'action'=>$action,
                'date'=>explode(',',$date)//日期选择器 需要返回数组 正常来讲直接 $request->all()
            ]
        ]);
    }

    public function filterLog($data){
        $content = '';
        switch ($data->log_name) {
            case '工会层级-组织管理':
                if($data->description =='新增'){
                    $content = '层级-'.$data->properties['attributes']['name'] ?? '未知';
                }else if($data->description =='修改'){
                    if( isset ($data->properties['old']['name'])) $content = '层级-'.$data->properties['attributes']['name'] ;
                }else if($data->description =='删除'){

                    $content = '层级-'.$data->properties['name'] ?? '';//之前直接写死的
                }
                break;
            case '企业单位':
                if($data->description =='新增'){
                    $content = '企业-'.$data->properties['attributes']['name'] ?? '未知';
                }else if($data->description =='修改'){
                    if( isset ($data->properties['old']['level_id'])) $content = '企业所在层级';
                }else if($data->description =='删除'){
                    $content = '企业-'.$data->properties['name'] ?? '未知';//之前直接写死的
                }
                break;
            case 'admin':
                $content = '';
                break;
        }
        return $content;
    }

    //获取日志记录中的模型名称
    public function getModelNameById()
    {
        $id = \request('id');
        $obj = Activity::find($id);
        $model = $obj->subject_type;
        $name = '';
        if ($model == 'App\Models\Admin') {
            $name = $model::find($obj->subject_id)->real_name ?? '';
        }else if (isset($obj->properties['name'])) {//手动存储的
            $name = $obj->properties['name'];
        } else{
            $obj = $model::find($obj->subject_id);
            if (isset($obj->name)){
                $name = $obj->name;
            }else if (isset($obj->title)){
                $name = $obj->title;
            }
        }
        return $this->json($name==''?1:0,['name'=>$name],'');
    }

    //删除日志
    public function delete($id){
        $response = Gate::inspect('leader-action',Auth::user());
        if ($response->allowed()) {
            // The action is authorized...
           Activity::find($id)->delete();
        } else {
            $code = 1;
            $msg = $response->message();
        }
        return $this->json($code ?? 0,[],$msg??'');
    }
}
