<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class TestUserController extends Controller
{
    public function index()
    {
        //在用户列表显示每个用户最新发布的文章
        //优化前 扫描出全部post实例
        $list = User::query()->with(['posts'=>function($query){
            $query->where('status',Post::STATUS_NORMAL)->select('title','created_at');
        }])->orderByDesc('id')->paginate(20,['email','name']);

        //优化后 添加子查询 不出现post实例
        $users = User::query()->addSelect([
            'last_post_title' => Post::query()->select(['title'])
                ->whereColumn('user_id', 'users.id')
                ->where('status', Post::STATUS_NORMAL)
                ->orderByDesc('created_at')
                ->limit(1)
        ])->orderByDesc('id')->paginate(20, ['email','name']);
    }
}
