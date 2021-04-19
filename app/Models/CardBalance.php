<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CardBalance extends Model
{
    protected $guarded = [];
    static function getBalance($card_no){
        return self::query()->where('card_no',$card_no)->first();
    }
}
