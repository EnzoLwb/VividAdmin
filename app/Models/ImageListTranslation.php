<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageListTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'pages_pics_translations';
    public $timestamps = false;
    protected $guarded = [];

}
