<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageList extends Model
{
    protected $primaryKey = 'pic_id';
    protected $table = 'pages_pics';
    public $timestamps = false;
    protected $guarded = [];

}
