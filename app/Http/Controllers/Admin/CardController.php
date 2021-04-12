<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CardController extends Controller
{
    //充值
    public function deposit()
    {
        return view('card.deposit');
    }

    //消费买课
    public function consume()
    {
        return view('card.consume');
    }
}
