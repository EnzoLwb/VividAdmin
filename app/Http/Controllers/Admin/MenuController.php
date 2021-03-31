<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;


class MenuController extends Controller
{
    public function leftMenu()
    {
        $cache_key = 'auth_menus';
        $data = Cache::get($cache_key, function () use($cache_key){
            $val = AuthService::getAuthedMenus();
            Cache::put($cache_key, $val, 3600);//存储1小时
            return $val;
        });
        return $this->json(0,$data,'');
    }

    public function headerMenu()
    {
        $role = Config::get('role');
        $menus = $role['menu'];
        $roles = [];
        foreach ($menus as $menu){
            $roles[] = [
                'name' => $menu['name'],
                'uri' => $menu['uri'],
            ];
        }
        return $this->json(0,$roles,'');
    }
}
