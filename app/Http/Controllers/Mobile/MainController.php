<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//静态网页
class MainController extends Controller
{
    //加入门店群
    public function qrcode(Request $request)
    {
        return view('mobile.contact.qrcode');
    }

    //联系我们
    public function contactUs(Request $request)
    {
        return view('mobile.contact.contact_us');
    }
}
