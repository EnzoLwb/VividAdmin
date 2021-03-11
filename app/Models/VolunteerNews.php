<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class VolunteerNews extends Model
{
    use LogsActivity;
    public $table = 'volunteer_news';
    public $primaryKey = 'id';
    public $guarded = [];
    protected $casts = [
        'status'=>'boolean'
    ];
    const TYPE_NEWS = [
        'zzyl' => '政治引领',
        'jjjf' => '家教家风',
        'hdzs' => '活动展示',
        'law' => '法律心理',
    ];
    protected static $logName = '资讯';
    protected static $logUnguarded = true;//记录修改的字段
    protected static $logOnlyDirty = true;//只记录修改的字段json
    public function getDescriptionForEvent(string $eventName): string
    {
        switch ($eventName) {
            case 'created':
                $description = '新增';
                break;
            case 'updated':
                $description = '修改';
                break;
            case 'deleted':
                $description = '删除';
                break;
            default:
                $description = $eventName;
                break;
        }
        return $description;
    }
}
