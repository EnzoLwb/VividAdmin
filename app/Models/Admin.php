<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Session;
use Config;
use DB;
use Hash;
use Cookie;
use Log;

class Admin extends Authenticatable
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'admins';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    protected $primaryKey = 'id';

    protected $fillable = [
                            'id',
                            'username',
                            'real_name',
                            'work_no',
                            'password',
                            'status',
                            'role_id',
                            'created_at',
                            'updated_at',
                            'remember_token'
                            ];

    public static function updateUser($userId,$params,$update_psd = false)
    {
        if ($update_psd) {
            $params['password'] = Hash::make($params['password']);
            Admin::where('id',$userId)->update($params);
            activity()
                ->useLog('系统用户')
                ->performedOn(Admin::find($userId))
                ->log('修改密码');
        }else{
            $update_param = [
                'username' => $params['username'],
                'real_name' => $params['real_name'],
                'mobile' => $params['mobile'],
                'work_no' => $params['work_no'] ?? 1000,
                'status' => $params['status'],
                'role_id' => $params['role_id'],
            ];

            Admin::where('id',$userId)->update($update_param);
            AdminGroups::query()->where('admin_id',$userId)->update([
                'type' => $params['group'],
            ]);

            activity()
                ->useLog('系统用户')
                ->performedOn(Admin::find($userId))
                ->log('修改个人信息');
        }


    }

    public static function updateUserStatus($userId,$updateStatus)
    {
        self::where("id",$userId)->update(['status'=>$updateStatus]);
    }

    public function role()
    {
        return $this->hasOne("App\Models\Role","id","role_id");
    }

    public function group()
    {
        return $this->hasOne("App\Models\AdminGroups","admin_id","id");
    }

}
