<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentList extends Model
{
    protected $primaryKey = 'key_id';
    protected $table = 'pages_contents';
    public $timestamps = false;
    protected $guarded = [];

}
