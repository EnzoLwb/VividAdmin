<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class MemberShip extends Model
{
    use LogsActivity;
    protected $guarded = [];
    static function getMemberByCardNo($card_no){
        return self::query()->where('card_no',$card_no)->first();
    }
    protected static $logName = '会员';
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
