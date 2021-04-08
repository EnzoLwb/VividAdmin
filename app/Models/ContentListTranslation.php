<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentListTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'pages_contents_translations';
    public $timestamps = false;
    protected $guarded = [];

}
