<?php

namespace App\Http\Middleware;

use App\Models\Role;
use App\Models\RouteSetting;
use App\Services\AuthService;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class MenuNorm
{
    /**
     * 控制权限 后台用户只能访问 其角色范围内的url
     * 先判断是否存在于所有路由中 如果存在于内 在判断是否存在于角色范围内 如果不存在于则禁止访问
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $cache_key = 'all_menus';//所有菜单
        $allMenu = Cache::get($cache_key, function () use($cache_key){
            $allMenus = RouteSetting::query()
                ->where('site',strtolower(session('site')))
                ->pluck('url')->toArray();
            Cache::put($cache_key, $allMenus, 3600*24);//存储24小时
            return $allMenus;
        });
        $site = session()->get('site');
        $role_id = $site == 'Service' ? Auth::user()->role_id :  Auth::user()->media_role_id;
        $policyMenu = json_decode( Role::query()->where('id',$role_id)
            ->value('policy_uri'),true);
        $pathInfo = $request->getPathInfo();
        if (in_array($pathInfo,$allMenu)){
            if (!in_array($pathInfo,$policyMenu)){
                //禁止访问
                abort(403, 'Unauthorized action.');
            }
        }
        return $next($request);
    }
}
