<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageListController extends Controller
{
    //list
    public function index()
    {
        return view('page_list.list');
    }
}
