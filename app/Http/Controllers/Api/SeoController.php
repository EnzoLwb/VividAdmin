<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageList;
use App\Models\SeoList;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function detail()
    {
        $page_name = \request('page_name');
        $locale = \request('locale');
        $page = PageList::query()->where('name',$page_name)->first();
        if (!$page) return $this->json(1,[],'Page Name Not Found');
        if ($locale){
            $data = SeoList::query()
                ->leftJoin('pages_seo_meta_translations','pages_seo_meta_translations.meta_id','pages_seo_meta.meta_id')
                ->where('page_id',$page->page_id)
                ->where('pages_seo_meta_translations.locale',$locale)
                ->select('pages_seo_meta.key_name','pages_seo_meta_translations.key_value')->get();
        }else{
            //默认英文
            $data = SeoList::query()->where('page_id',$page->page_id)
                ->select('key_name','key_value')->get();
        }
        return $this->json(0,$data,'');
    }
}
