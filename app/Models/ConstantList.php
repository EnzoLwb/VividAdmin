<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstantList extends Model
{
    protected $primaryKey = 'key_id';
    protected $table = 'pages_constant';
    public $timestamps = false;
    protected $guarded = [];

}
