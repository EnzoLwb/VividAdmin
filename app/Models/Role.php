<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB as DBF;
use Auth;
use Session;
use Config;
use DB;
use Hash;
use Cookie;
use Log;

class Role extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    protected $primaryKey = 'id';

    protected $fillable = [
                            'id',
                            'name',
                            'resources',
                            'created_at',
                            'updated_at'
                        ];

     public static function addRole($name,$res)
     {
     	self::insert(['name'=>$name,"resources" => json_encode($res)]);
     }

     public function hasResource($res)
     {
     	return in_array($res,json_decode($this->resources,true));
     }

     public function updateResource($name,$res)
     {
     	$this->name = $name;
     	$this->resources = json_encode($res);
     	$this->save();
     }

     public static function getServiceRoles()
     {
		     return DB::select('select id,name from roles where resources="service" ');
     }

    public static function getMediaRoles()
    {
        return DB::select('select id,name from roles where resources="media" ');
    }
}
