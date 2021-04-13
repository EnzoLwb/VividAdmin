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
/*    public function addRole()
    {
        if (\request('id')){
            //编辑 返回
            $role = Role::find(\request('id'));
            $policy_uri = json_decode( $role->policy_uri,true);
        }else{
            $role= json_encode(new \stdclass());
            $policy_uri = [];
        }
        $show =3;

        return view('auth.addrole',compact('role','roles','show','policy_uri'));
    }*/

    public function save_role(Request $request)
    {
    	$rolename = $request->input("name");
    	if (empty($rolename)) 
    	{
    		return $this->json(1,[],"请填写角色名");
    	}
    	//去除#
        $policy_uri = array_values(array_diff($request->input("policy_uri"), ['#', true]));
        if (!count($policy_uri)) return $this->json(1,[],"至少选择一种权限");
    	//规范角色
        if (!$request->id){
            //添加角色
            $role = new Role();
            $msg = '新增角色成功';$log_desc = '新增';
        }else{
            $role = Role::find($request->id);$msg = '修改角色成功';$log_desc = '修改';
        }
        $role->resources = json_encode(["admin-mng"]);
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
    		return $this->json(1,[],"请刷新重试");
    	}
        //需要判断该权限下是否有用户
        $cou = Admin::query()->where("role_id",$id)->where("status",1)->count();
    	if ($cou>0) return $this->json(1,[],"该权限组下已分配用户,请修改用户后再进行删除！");
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
        $roles = RouteSetting::query()->where('pid',0)
            ->orderBy('id','asc')
            ->select('name','url','icon','id','pid')->get()->toArray();

        foreach ($roles as $k=>$first_menu){
            //查询二级菜单 在所属权限内的菜单
            $sec_menu = RouteSetting::query()->where('pid',$first_menu['id'])
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
