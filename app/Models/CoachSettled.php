<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CoachSettled extends Model
{
    protected $guarded = [];
    protected $casts = [
        "date" => "register_date",
        "json" => "qualification",
    ];
}
