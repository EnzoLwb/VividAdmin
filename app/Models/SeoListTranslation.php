<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoListTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'pages_seo_meta_translations';
    public $timestamps = false;
    protected $guarded = [];

}
