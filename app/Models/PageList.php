<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageList extends Model
{
    protected $primaryKey = 'page_id';
    protected $table = 'pages';
    public $timestamps = false;
    protected $guarded = [];

}
