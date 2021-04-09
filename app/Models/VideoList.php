<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoList extends Model
{
    protected $primaryKey = 'video_id';
    protected $table = 'pages_video';
    public $timestamps = false;
    protected $guarded = [];

}
