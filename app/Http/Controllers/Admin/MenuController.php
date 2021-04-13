<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RouteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{

    public function leftMenu()
    {
        return $this->json(0,$this->getAllMenu(),'');
    }

    //登陆角色的权限 的一级菜单
    public function headerMenu()
    {
        $current_roles = Role::query()->find(Auth::user()->role_id)->value('policy_uri');
        $policy_uri = json_decode($current_roles,true);
        $roles = RouteSetting::query()->whereIn('url',$policy_uri)->where('pid',0)
            ->orderBy('id','asc')
            ->select('name','url as uri')->get();
        return $this->json(0,$roles,'');
    }

    public function changeSite(Request $request)
    {
        if (!$request->site) return $this->json(1,[],'error param');
        $request->session()->put('site',$request->site);
        return $this->json(0,[],'');
    }

    //获取当前角色的全部级别菜单
    public function getAllMenu()
    {
        $current_roles = Role::query()->find(Auth::user()->role_id)->value('policy_uri');
        $policy_uri = json_decode($current_roles,true);
        $roles = RouteSetting::query()->whereIn('url',$policy_uri)->where('pid',0)
            ->orderBy('id','asc')
            ->select('name','url as uri','icon','id')->get()->toArray();
        //不递归 直接查询 因为稍后也是缓存
        foreach ($roles as $k=>$first_menu){
            //查询二级菜单 在所属权限内的菜单
            $sec_menu = RouteSetting::query()->whereIn('url',$policy_uri)->where('pid',$first_menu['id'])
                ->select('name','url as uri','icon')->get();
            //虽然没有三级菜单 但还是需要返回submenus key
            $sec_menu->each(function ($item,$key){
                $item->submenus = [];
            });
            $roles[$k]['submenus'] = $sec_menu;
        }
        return $roles;
    }
}
