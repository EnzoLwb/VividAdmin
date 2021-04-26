<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContentList;
use App\Models\ContentListTranslation;
use App\Models\ImageList;
use App\Models\ImageListTranslation;
use App\Models\PageList;
use App\Models\SeoList;
use App\Models\SeoListTranslation;
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

    /*1、model:Seo|PageContent|Image|Constant|Video|DBTerms|NewLetter*/
    public function allData(Request $request)
    {
        $page_url = \request('url');
        $locale = \request('locale');
        $page = PageList::query()->where('url',$page_url)->first();//唯一
        if (!$page) return $this->json(1,[],'Page Name Not Found');
        $models = explode('|',$request->model);
        $result = [];
        foreach ($models as $model){
            switch ($model){
                case 'Seo':
                    $result['Seo'] = $this->getSeo($page,$locale);
                case 'PageContent':
                    $result['PageContent'] = $this->getPageContent($page,$locale);
                case 'Image':
                    $result['Image'] = $this->getImage($page,$locale);
            }
        }
        return $this->json(0,$result,'');
    }

    public function getImage($page,$locale=''){
        //默认英文 不适用pluck 因为可以直接处理有locale 的情况
        $data = ImageList::query()->where('page_id',$page->page_id)
            ->where('display',1)
            ->get()->toArray();
        if ($locale){
            $meta_ids = [];
            foreach ($data as $val){
                $meta_ids[] = $val['pic_id'];
            }
            $translate = ImageListTranslation::query()
                ->where('locale',$locale)
                ->whereIn('pic_id',$meta_ids)
                ->pluck('descriptions','pic_id')->toArray();
            //更换值 为翻译的值
            foreach ($data as &$item){
                if (isset($translate[$item['pic_id']])){
                    $item['descriptions'] = $translate[$item['pic_id']];
                }
            }
        }
        foreach ($data as &$value){
            $value['descriptions'] = json_decode($value['descriptions']);
        }
        return $data;
    }


    public function getPageContent($page,$locale=''){
        //默认英文 不适用pluck 因为可以直接处理有locale 的情况
        $data = ContentList::query()->where('page_id',$page->page_id)
            ->select('key_id as id','key_value','key_name')->get()->toArray();
        if ($locale){
            $meta_ids = [];
            foreach ($data as $val){
                $meta_ids[] = $val['id'];
            }
            $translate = ContentListTranslation::query()
                ->where('locale',$locale)
                ->whereIn('key_id',$meta_ids)
                ->pluck('key_value','key_id')->toArray();
            //更换值 为翻译的值
            foreach ($data as &$item){
                if (isset($translate[$item['id']])){
                    $item['key_value'] = $translate[$item['id']];
                }
            }
        }
        $result = [];
        foreach ($data as $value){
            $result[$value['key_name']] = json_decode($value['key_value']);
        }
        return $result;
    }

    public function getSeo($page,$locale=''){
        //默认英文 不适用pluck 因为可以直接处理有locale 的情况
        $data = SeoList::query()->where('page_id',$page->page_id)
            ->select('meta_id as id','key_value','key_name')->get()->toArray();
        if ($locale){
            $meta_ids = [];
            foreach ($data as $val){
                $meta_ids[] = $val['id'];
            }
            $translate = SeoListTranslation::query()
                ->where('locale',$locale)
                ->whereIn('meta_id',$meta_ids)
                ->pluck('key_value','meta_id')->toArray();
            //更换值 为翻译的值
            foreach ($data as &$item){
                if (isset($translate[$item['id']])){
                    $item['key_value'] = $translate[$item['id']];
                }
            }
        }
        $result = [];
        foreach ($data as $value){
            $result[$value['key_name']] = $value['key_value'];
        }
        return $result;
    }
}
