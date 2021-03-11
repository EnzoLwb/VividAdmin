<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MiniUser extends Model
{

    public $table = 'volunteer_mini_users';
    public $primaryKey = 'uid';
    public $guarded = [];

    static function getUidByOpenId($openid){
       return self::query()->where('open_id',$openid)->value('uid');
    }

    static function get_api_token($uid){
        return md5(\Illuminate\Support\Str::random(60) . date('U') . '__' . $uid);
    }
}
