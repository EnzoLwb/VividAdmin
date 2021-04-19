<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AdminGroups extends Model
{
    public $table = 'admin_group';
    public $primaryKey = 'id';
    protected $fillable = [
        'id',
        'type',
        'grid_id',
        'admin_id',
    ];
    const POST_ADMIN = 1;
    const POST_COACH = 2;
    const POST_SELL = 3;
    const POST_OTHER = 4;
    static $post_desc = [
        self::POST_ADMIN => '管理人员',
        self::POST_COACH => '私教',
        self::POST_SELL => '销售人员',
        self::POST_OTHER => '其他',
    ];
    public static function leader()
    {
        return static::query()->whereIn("type",[self::GH_LEADER,self::GRID_MEMBER])
            ->where('admin_id',Auth::id())->exists();
    }

}
