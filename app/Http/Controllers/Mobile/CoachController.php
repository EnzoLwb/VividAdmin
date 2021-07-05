<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    //教练入驻静态页
    public function Recruit(){
        return view('mobile.coach.recruit');
    }

    //团操教练填报
    public function exerciseSettled(Request $request)
    {
        return view('mobile.coach.exercise_settled_form');
    }

    //私人教练填报
    public function privateSettled(Request $request)
    {
        return view('mobile.coach.private_settled_form');
    }
}
