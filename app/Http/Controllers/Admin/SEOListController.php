<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SEOListController extends Controller
{
    //list
    public function index()
    {
        return view('seo_list.list');
    }
}
