<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DbTerm extends Model
{
    protected $primaryKey = 'word_id';
    protected $table = 'words';
    public $timestamps = false;
    protected $guarded = [];

}
