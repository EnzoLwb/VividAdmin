<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Tag extends Model
{
    use LogsActivity;
    public $table = 'tags';
    public $primaryKey = 'id';
    public $guarded = [];

    protected static $logName = '标签';
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
