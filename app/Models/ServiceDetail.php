<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class ServiceDetail extends Model
{
    use SoftDeletes;
    use LogsActivity;
    protected $guarded = [];
    protected static $logName = '服务项目';
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
