<?php

namespace App\Http\Controllers;

use App\Models\AdminGroups;
use App\Models\SystemSetting;
use App\Models\UploadedFile;
use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Admin;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Session;
use Redirect;
use Hash;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    protected $redirectToSessionKey = 'redirect_to';
    public function login(Request $request)
    {
        if (Auth::id()) {
            return redirect('/');
        }
        if (!$request->session()->has($this->redirectToSessionKey)) {//储存源网页地址 登录成功后 跳到源网页
            $request->session()->put($this->redirectToSessionKey, URL::previous());
        }

        $tips = "";
        return view('passport.login',compact('tips'));
    }

    //登录操作
    public function loginPost(Request $request)
    {
        //参数校验
        $email = $request->input("username");
        $password = $request->input("password");
        //清除缓存
        Cache::flush();
        if (empty($email) || empty($password)) return $this->json(1,[],"请输入正确的用户名(手机号)和密码");

        //用户信息校验
        $userInfo = Admin::Where("username",$email)->orWhere("mobile",$email)->first();
        if (empty($userInfo))  return $this->json(1,[],"此用户未注册");

        //密码校验
        if (!Hash::check($password,$userInfo->password))  return $this->json(1,[],"密码错误");
        if ($userInfo->status == 0)  return $this->json(1,[],"该用户已被禁用");

        //进行登录
//        Auth::loginUsingId($userInfo->id);
        Auth::login($userInfo);
        $userInfo->login_at = date("Y-m-d");
        $userInfo->save();
        activity()
            ->useLog('系统用户')
            ->performedOn(Admin::find($userInfo['id']))
            ->log('登录');
        $request = app(Request::class);
        $redirectTo = $request->session()->get($this->redirectToSessionKey);
        $request->session()->forget($this->redirectToSessionKey);
        return $this->json(0,['redirectTo'=>$redirectTo??''],'');

    }

    //退出登录
    public function logout()
    {
        Cache::flush();//清除所有缓存内容
        Auth::logout();
        return Redirect('/');
    }

    //获取权限下拉框
    public function roles()
    {
        $roles = \DB::select('select id,name from roles where id !=1');
        return $this->json(0,['roles'=>$roles],'');
    }

    //用户管理
    public function addUser()
    {
        $roles = Role::getRoles();
        $show = 3;
        $article= json_encode(new \stdclass());
        return view('admin.form',compact('roles','show','article'));
    }

    //编辑用户
    public function editUser(Request $request)
    {
        $id = $request->input("id");
        if (empty($id))
        {
            return Redirect('/admin/user/add');
        }

        $user = Admin::find($id);
        if (empty($user))
        {
            return Redirect('/admin/user/add');
        }

        $roles = Role::getRoles();
        $show = 2;
        $article= $user;
        return view('admin.form',compact('user','roles','show','article'));
    }

    //更新用户
    public function updateUserPost(Request $request)
    {
        $params = $request->input();
        if (!$request->username
            || !$request->real_name
            || !$request->password
            || !$request->role_id
        )
        {
            return $this->json(1,[],"请完善用户信息");
        }
        if ($request->id){
            //查询是否有相同用户名
            if (Admin::query()->where('username',$request->username)->where('id','!=',$request->id)->value('id')) return $this->json(1,[],"已存在该登录名！");
            //处理参数
            $userId = $params['id'];
            unset($params['id']);
            unset($params['_token']);
            Admin::updateUser($userId,$params);
            $msg = '修改成功';
        }else{
            //查询是否有相同用户名
            if (Admin::query()->where('username',$request->username)->value('id')) return $this->json(1,[],"已存在该登录名！");
            $msg = '新增成功';
            $update_param = [
                'username' => $params['username'],
                'real_name' => $params['real_name'],
                'mobile' => $params['mobile'],
                'work_no' => $params['work_no'] ?? 1000,
                'status' => $params['status'],
                'role_id' => $params['role_id'],
                'created_at' => date("Y-m-d H:i:s")
            ];
            $update_param['password'] = Hash::make($params['password']);
            \DB::transaction(function() use($update_param,$params){
                $id = Admin::query()->insertGetId($update_param);
                /*AdminGroups::insert([
                    'type' => $params['group'],
                    'admin_id' => $id,
                    'grid_id' => $params['grid_id'],
                    'company_name' => $params['company_name'],
                    'company_id' => $params['company_id'],
                ]);*/
                activity()
                    ->useLog('系统用户')
                    ->performedOn(Admin::find($id))
                    ->log('新增用户');
            });

        }
        return $this->json(0,[],$msg);
    }

    //用户列表
    public function userList(Request $request)
    {
        if ($request->isMethod('POST')){
            $users = Admin::query()->leftJoin('roles','roles.id','admins.role_id')
                ->leftJoin('admin_group','admin_group.admin_id','admins.id');
            $page_size = \request('per_page',15);

            $role_id = $request->input('role_id');
            if (!empty($role_id))
            {
                $users = $users->where('role_id',$role_id);
            }
            $group = $request->input('group');
            if (!empty($group))
            {
                $users = $users->where('type',$group);
            }
            $status = $request->input('status');
            if (isset($status))
            {
                $users = $users->where('status',$status);
            }
            $realName = $request->input("real_name");
            if (!empty($realName))
            {
                $users = $users->where('real_name','like',"%$realName%");
            }

            $users = $users->select('admins.*','admin_group.type as group','admin_group.company_name','admin_group.company_id','admin_group.grid_id','roles.id as role_id','roles.name')
                ->orderBy('admins.id','desc')
                ->paginate($page_size);
            return $this->json(0,$users,'');
        }else{
            $roles = Role::getRoles();
            return view('admin.adminlist',compact('roles'));
        }


    }

    //删除用户
    public function deleteUser(Request $request)
    {
        $id = $request->input("id");
        if (empty($id))
        {
            return $this->json(1,[],"请刷新重试");
        }

        Admin::updateUserStatus($id,$request->updateStatus);
        activity()
            ->useLog('系统用户')
            ->performedOn(Admin::find($id))
            ->log($request->updateStatus==1?'取消禁用用户':'禁用用户');
        return $this->json(0,[],$request->updateStatus==1 ? '取消禁用成功':'禁用成功');
    }

    //修改密码
    public function changepassword(Request $request)
    {
        return view("passport.changepassword");
    }

    //修改密码post
    public function changepasswordPost(Request $request)
    {
        $prepassword = $request->input("prepassword");
        if (empty($prepassword))
        {
            return $this->json(1,[],"请输入原来密码");
        }

        $password = $request->input("password");
        if (empty($password))
        {
            return $this->json(1,[],"请输入新密码");
        }

        $user = Auth::user();
        if (!Hash::check($prepassword,$user->password))  return $this->json(1,[],"原密码错误");

        //更新密码
        Admin::updateUser($user->id,['password'=>$password],true);

        return $this->json(0,[],'修改密码成功');
    }

    //清除缓存
    public function clearCache()
    {
        Cache::flush();
        return redirect()->back();
    }

    public function updateRememberToken()
    {
        Admin::query()->where('id',Auth::id())->update(['remember_token'=>time()]);
    }

    //个人介绍
    public function profile()
    {
        $articles = Admin::query()
            ->leftJoin('admin_group','admin_group.admin_id','admins.id')
            ->where('admins.id',Auth::id())
            ->select('admins.*','admin_group.type as group','admin_group.company_name','admin_group.company_id','admin_group.grid_id')
            ->first();
        return view('passport.profile',compact('articles'));
    }

    public function userGroup()
    {
        $type = \request('type');
        $obj = new AdminGroups();
        $admin_group = $obj->query()->where('admin_id',Auth::id())->first();
        //消息
        $data = Auth::user()->notifications;//unreadNotifications 未读 $notification->markAsRead();标记为已读； $user->notifications()->delete();
        $message_data = [];

        return $this->json(0,[
            'admin_group' => $admin_group,
            'message' => $message_data,
        ],'');
    }
}
