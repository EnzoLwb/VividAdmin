<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstantListTranslation extends Model
{
    protected $primaryKey = 'translation_id';
    protected $table = 'pages_constant_translations';
    public $timestamps = false;
    protected $guarded = [];

}
