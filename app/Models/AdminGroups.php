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
        'company_id',
        'company_name',
        'admin_id',
    ];
    const GH_LEADER = 1;  // 工会家领导
    const GRASS_ROOTS_GH = 2;    // 基层工会
    const GRASS_ROOTS_TZZ = 3;         // 基层团组织
    const GRASS_ROOTS_FL = 4;   // 基层妇联
    const GRID_MEMBER = 5;   // 网格员
    const GH_TZZ = 6;   // 基层工会、团组织
    const GH_FL = 7;   // 基层工会、妇联
    const TZZ_FL = 8;   // 基层团组织、妇联
    const GH_TZZ_FL = 9;   // 基层工会、团组织、妇联
    public static function leader()
    {
        return static::query()->whereIn("type",[self::GH_LEADER,self::GRID_MEMBER])
            ->where('admin_id',Auth::id())->exists();
    }
    //提供前三职务中的一个 返回包含该职务的所有职务
    static function formatDuties($detail_duty)
    {
        switch ($detail_duty){
            case self::GRASS_ROOTS_GH:
                return [self::GRASS_ROOTS_GH,self::GH_TZZ,self::GH_FL,self::GH_TZZ_FL];
                break;
            case self::GRASS_ROOTS_TZZ:
                return [self::GRASS_ROOTS_TZZ,self::GH_TZZ,self::TZZ_FL,self::GH_TZZ_FL];
                break;
            case self::GRASS_ROOTS_FL:
                return [self::GRASS_ROOTS_FL,self::TZZ_FL,self::GH_FL,self::GH_TZZ_FL];
                break;
        }
    }
    //提供多选职务中的一个 返回包含该职务的所有职务
    static function formatDutiesByMulti($detail_duty)
    {
        switch ($detail_duty){
            case self::GH_TZZ:
                return [self::GRASS_ROOTS_GH,self::GRASS_ROOTS_TZZ,];
                break;
            case self::GH_FL:
                return [self::GRASS_ROOTS_GH,self::GRASS_ROOTS_FL,];
                break;
            case self::TZZ_FL:
                return [self::GRASS_ROOTS_FL,self::GRASS_ROOTS_TZZ,];
                break;
            case self::GH_TZZ_FL:
                return [self::GRASS_ROOTS_FL,self::GRASS_ROOTS_TZZ,self::GRASS_ROOTS_GH,];
                break;
            default:
                return [$detail_duty];
        }
    }
    //判断公司是不是在所属网格范围内
    public static function gridAdminAction($corp_id){
        $admin_id = Auth::id();
        $grid_admin = static::query()->where("admin_id",$admin_id)
            ->where("type",self::GRID_MEMBER)->first();
        if ($grid_admin){
            //是网格员
            $grid_id = $grid_admin->grid_id;
            if (is_array($corp_id)){
                //传递多个公司
                $corp_grid = Company::query()->whereIn('id',$corp_id)->groupBy("level_id")->pluck('level_id');
                if (count($corp_grid)>1 || count($corp_grid)==0) return false;//网格员现阶段只能管一个网格
                $corp_grid = $corp_grid[0] ;
            }else{
                $corp_grid = Company::query()->find($corp_id)->level_id;
            }
            if ($grid_id != $corp_grid) return false;
        }
        return true;//是领导和网格下
    }
}
