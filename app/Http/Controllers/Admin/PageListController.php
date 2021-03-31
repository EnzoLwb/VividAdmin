<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\PageModule;
use Illuminate\Http\Request;

class PageListController extends Controller
{
    public function index($module='')
    {
        $module_select = PageModule::query()->select('module_id as id','module as name')->get();
        return view('page_list.list',compact('module','module_select'));
    }

    public function list()
    {
        $res = PageList::query()
            ->leftJoin('pages_modules','pages_modules.module_id','pages.module_id')
            ->select('page_id as id','pages.*','pages_modules.module')
            ->orderByDesc('page_id')
            ->paginate($this->page_size);
        return $this->json(0,$res,'');
    }
}
