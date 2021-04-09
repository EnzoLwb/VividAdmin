<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsLetter extends Model
{
    protected $primaryKey = 'emailId';
    protected $table = 'cm_eml_template';
    public $timestamps = false;
    protected $guarded = [];

}
