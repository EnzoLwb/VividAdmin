<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DbTermsTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'words_translations';
    public $timestamps = false;
    protected $guarded = [];

}
