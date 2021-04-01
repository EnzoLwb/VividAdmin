<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoList extends Model
{
    protected $primaryKey = 'meta_id';
    protected $table = 'pages_seo_meta';
    public $timestamps = false;
    protected $guarded = [];

}
