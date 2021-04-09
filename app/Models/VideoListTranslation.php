<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoListTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'pages_video_translations';
    public $timestamps = false;
    protected $guarded = [];

}
