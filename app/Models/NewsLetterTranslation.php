<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsLetterTranslation extends Model
{
    protected $primaryKey = 'translationId';
    protected $table = 'cm_eml_template_translations';
    public $timestamps = false;
    protected $guarded = [];

}
