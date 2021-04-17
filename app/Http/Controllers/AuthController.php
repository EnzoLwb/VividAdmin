<?php

namespace App\Http\Controllers;

use App\Models\RouteSetting;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Admin;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Auth;
use Session;
use Redirect;
use Config;
use Hash;

class AuthController extends Controller
{
    public function save_role(Request $request)
    {
    	$rolename = $request->input("name");
    	if (empty($rolename)) 
    	{
    		return $this->json(1,[],"Please Enter Title");
    	}
        if (empty($request->input("resources")))
        {
            return $this->json(1,[],"Please Select Site");
        }
    	//去除#
        $policy_uri = array_values(array_diff($request->input("policy_uri"), ['#', true]));
        if (!count($policy_uri)) return $this->json(1,[],"Please Select Url");
    	//规范角色
        if (!$request->id){
            //添加角色
            $role = new Role();
            $msg = 'Role added successfully';$log_desc = 'add';
        }else{
            $role = Role::find($request->id);$msg = 'Role modified successfully';$log_desc = 'edit';
        }
        $role->resources = $request->input("resources");
        $role->name = $rolename;
        $role->policy_uri = json_encode($policy_uri);
        $role->save();
        activity()
            ->useLog('角色')
            ->performedOn(Role::find($role->id))
            ->log($log_desc);
    	return $this->json(0,[],$msg);
    }

    public function deleteRolePost(Request $request)
    {
    	$id = $request->input("id");
    	if (empty($id)) 
    	{
    		return $this->json(1,[],"Please refresh and try again!");
    	}
    	if ($id == 1){
            return $this->json(1,[],"Administrator auth cannot be deleted!");
        }
        //需要判断该权限下是否有用户
        $cou = Admin::query()->where("role_id",$id)->orWhere('media_role_id',$id)
            ->count();
    	if ($cou>0) return $this->json(1,[],"Users have been assigned to this permission group. Please modify the users before deleting them！");
    	$obj = Role::find($id);
    	$name = $obj->name;
        $obj->delete();
        activity()
            ->useLog('角色')
            ->log('删除'.$name);
    	return $this->json(0);
    }

    public function roleList(Request $request)
    {
        $params = $request->all();

    	$roles = Role::orderBy('id','desc')->paginate(20);

    	return view("auth.rolelist",compact('roles','params'));
    }

    //获取全部权限树
    public function getMenuRole()
    {
        $site = \request('site');
        $roles = RouteSetting::query()->where('pid',0)
            ->when($site,function ($query)use($site){
                return $query->where('site',$site);
            })
            ->orderBy('id','asc')
            ->select('name','url','icon','id','pid')->get()->toArray();

        foreach ($roles as $k=>$first_menu){
            //查询二级菜单 在所属权限内的菜单
            $sec_menu = RouteSetting::query()->where('pid',$first_menu['id'])
                ->when($site,function ($query)use($site){
                    return $query->where('site',$site);
                })
                ->select('name','url','icon','pid','id')->get();
            //虽然没有三级菜单 但还是需要返回submenus key
            $sec_menu->each(function ($item,$key){
                $item->submenus = [];
            });
            $roles[$k]['submenus'] = $sec_menu;
        }
        return $this->json(0,$roles,'');
    }
}
