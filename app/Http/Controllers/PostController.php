<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Post;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PostController extends Controller
{
    public function index()
    {
        return $this->formatDate("2021-07-31");
        $status = Post::selectRaw('COUNT(CASE WHEN `status` = 0 then 1 END) AS draft_count')
            ->selectRaw('COUNT(CASE WHEN `status` = 1 then 1 END) AS audit_count')
            ->selectRaw('COUNT(CASE WHEN `status` = 2 then 1 END) AS normal_count')
            ->first();//统计查询 count(case when status = 0 then 1 end)
        $posts = Post::query()->with(['author:email',])->orderByDesc('created_at')->paginate(100);
        //对于一个已加载的模型实例，要对其关联模型进行渴求式加载，可以通过 load 方法实现「懒惰渴求式加载」
//        $post->load(['author:id,name', 'comments', 'comments.author:id,name']);
        //        $posts = Post::query()->rightJoin('users','users.id','posts.user_id')->orderByDesc('posts.created_at')->paginate(100);
//        return view('post.index', ['posts' => $posts,'status'=>$status]);
    }

    public function formatDate($date)
    {
        $res = strtotime("-1 month".$date);
        $res = date("Y-m-d",$res);
        //随机产生n学生 算出及格线
        $n = 10;
        $students = [];
        for ($i = 0;$i<$n;$i++){
            $students[] = rand(0,100);
        }
//        $students = [9,18,22,29,29,100,20,40,10,70];
        // 如果都大约60 则及格线为60 （先排序 若最小的大于则符合）
        // 60%的人及格 则排序结果中 大于第四个人
        //及格线是10的倍数  则 大于第四个人的数需要为向上取整的10的倍数
        $jige_score = 0;
        for ($i = 0;$i<count($students);$i++){
            for ($j = $i+1;$j<=count($students)-1;$j++){
                if ($students[$i] >= $students[$j] ){
                    $temp = $students[$j] ;
                    $students[$j] = $students[$i];
                    $students[$i] = $temp;
                }
            }

        }
        if ($students[0] > 60) {
            $jige_score = 60;
        }else{
            $jige_score = floor($students[3] / 10) * 10;
        }
        dd($jige_score,$students);
    }
}
