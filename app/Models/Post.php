<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    const STATUS_DRAFT = 0;   // 草稿
    const STATUS_AUDIT = 1;   // 待审核
    const STATUS_NORMAL = 2;  // 已发布
    public function author()
    {
        return $this->belongsTo(TestUser::class,'user_id');
    }
}
