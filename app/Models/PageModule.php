<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageModule extends Model
{
    protected $primaryKey = 'module_id';
    protected $table = 'pages_modules';
    public $timestamps = false;
    protected $guarded = [];

}
