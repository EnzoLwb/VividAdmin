<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Log;
use Config;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use Illuminate\Http\Request;

class AuthService
{

    static public function checkUri($uri)
    {
        if (false !== $pos = strpos($uri, '?')) {
            $uri = substr($uri, 0, $pos);
        }

        if ( strlen($uri) > 1 && ( $uri[strlen($uri) - 1] == '/' || $uri[strlen($uri) - 1] == '\\'))
    	{
    		$lastValidPos = strlen($uri) - 1;
    		for ($i=strlen($uri) - 1; $i >= 0; $i--)
    		{
    			if ($uri[$i] == '/' || $uri[$i] == '\\')
    			{
    				$lastValidPos = $i - 1;
    			}
    			else
    			{
    				break;
    			}
    		}

    		if ($lastValidPos <=0) $lastValidPos = 0;

    		$uri = substr($uri,0,$lastValidPos+1);
    	}

    	//查看uri是否在白名单中
    	if (in_array($uri, \Config::get('role.free_uri')))
    	{
    		//白名单中返回true
    		return true;
    	}

    	$authUris = self::getUserUris();
    	if (empty($authUris))
    	{
    		return false;
    	}

    	return in_array($uri,$authUris);
    }


    static public function getUserUris()
    {
    	static $uris = false;
    	if ($uris !== false)
    	{
    		return $uris;
    	}

    	//获取用户的权限列表
    	$roleId = Auth::user()->role_id;
    	if (empty($roleId))
    	{
    		return false;
    	}

    	//获取相对权限
    	$role = Role::find($roleId);
    	if (empty($role) || empty($role->resources))
    	{
    		return false;
    	}

    	//获取资源列表
    	$authUri = [];
    	$allKeys = \Config::get("role.resources");
    	$arrKeys = json_decode($role->resources);
    	foreach ($arrKeys as $key)
    	{
    		$res = Arr::get($allKeys, $key);
    		if (!empty($res))
    		{
    			$authUri = array_merge($authUri,$res['urls']);
    		}
    	}

    	$uris = $authUri;
    	return $authUri;
    }




    static public function getAuthedMenus()
    {
    	$allMenus = \Config::get("role.menu");
		$authMenus = [];
        $policy_menu = json_decode( Role::query()->where('id',Auth::user()->role_id)->value('policy_uri'),true);
    	foreach ($allMenus as $menu)
    	{
    		$authMenu = self::getAuthMenu($menu,$policy_menu);
    		if (!empty($authMenu))
    		{
    			$authMenus[] = $authMenu;
    		}
    	}

    	return $authMenus;
    }

    //返回所有菜单
    static public function getAllMenu($menu){
        $rtnmenu = [];
        foreach ($menu as $submenu)
        {
            if ($submenu['uri']!='#'){
                //单独的链接 没有下拉
                $rtnmenu[] = $submenu['uri'];
            }else{
                $new_arr = self::getAllMenu($submenu['submenus']);
                if (count($new_arr) > 0) $rtnmenu = array_merge($new_arr,$rtnmenu);
            }
        }

        return $rtnmenu;
    }

    static public function getAuthMenu($menu,$policy_menu = [])
    {
    	$rtnmenu = [];
   		$rtnmenu['submenus'] = [];
    	if (!empty($menu['submenus']))
    	{
    		foreach ($menu['submenus'] as $submenu)
    		{
    			$subauthmenu = self::getAuthMenu($submenu,$policy_menu);
    			if (!empty($subauthmenu))
    			{
    				$rtnmenu['submenus'][] = $subauthmenu;
    			}
    		}
    	}


    	//子节点是否授权
    	if (empty($rtnmenu['submenus']))
    	{
	    	//本menu是否授权
	    	if ($menu['uri'] == "#" || !in_array($menu['uri'],$policy_menu))
	    	{
	    		return false;
	    	}

	    	return $menu;
    	}

    	//有子节点授权情况下
    	else
    	{
    		if (!in_array($menu['uri'],$policy_menu))
    		{
    			$rtnmenu['uri'] = "#";
    		}

    		$rtnmenu['uri'] = $menu['uri'];
    		$rtnmenu['name'] = $menu['name'];
    		$rtnmenu['icon'] = $menu['icon'];
    	}

    	return $rtnmenu;
    }

}
