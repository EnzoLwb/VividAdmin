<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RouteSetting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    //首页
    public function index()
    {
        return redirect()->to('/admin/settings/user');
    }

    public function routes(Request $request)
    {
        if ($request->isMethod('POST')){
            $obj = $request->id ? RouteSetting::query()->find($request->id) : new RouteSetting();
            $obj->name = $request->name;
            $obj->pid = $request->pid;
            $obj->url = $request->url;
            $obj->icon = $request->icon;
            $obj->site = $request->site;
            $obj->save();
            return $this->json(0,$obj,'');
        }else if ($request->isMethod('GET')){
            return  view('auth.routes');
        }else if ($request->isMethod('DELETE')){
            RouteSetting::query()->where('id',$request->id)->orWhere('pid',$request->id)->delete();
            return  $this->json(0,[],'');
        }
    }
}
