<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    protected $primaryKey = 'file_id';
    public $timestamps = true;

    // 不可被批量赋值的属性，反之其他的字段都可被批量赋值
    protected $guarded = [
        'file_id'
    ];

}
