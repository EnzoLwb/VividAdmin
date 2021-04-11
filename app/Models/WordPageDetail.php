<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WordPageDetail extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'words_pages_detail';
    public $timestamps = false;
    protected $guarded = [];

}
