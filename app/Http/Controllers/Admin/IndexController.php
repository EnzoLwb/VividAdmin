<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    //首页
    public function home()
    {
        //查看是否有首页的权限 没有则权限列表第一个地址
        /*$role = Role::query()->findOrFail(\auth()->user()->role_id)->policy_uri;
        $policy_uri = json_decode($role,true);
        return redirect()->to(current($policy_uri));*/
        return redirect()->to("/admin/logs/list");
    }
}
