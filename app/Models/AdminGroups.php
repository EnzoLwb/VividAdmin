<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AdminGroups extends Model
{
    public $table = 'admin_group';
    public $primaryKey = 'id';
    protected $guarded = [];
    const GROUP_ADMIN = 1;
    const GROUP_EDITOR = 2;
    const GROUP_TRANSLATOR = 3;

    public static function isEditor()
    {
        return static::query()->whereIn("type",[self::GROUP_ADMIN,self::GROUP_EDITOR])
            ->where('admin_id',Auth::id())->exists();
    }
    public static function isTranslator()
    {
        return static::query()->whereIn("type",[self::GROUP_ADMIN,self::GROUP_TRANSLATOR])
            ->where('admin_id',Auth::id())->exists();
    }
}
