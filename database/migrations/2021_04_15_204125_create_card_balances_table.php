<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_balances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('card_no')->unique();
            $table->unsignedDecimal('card_income')->comment('会员卡总收入额');
            $table->unsignedDecimal('card_outcome')->comment('会员卡总支出额');
            $table->unsignedDecimal('balance_fee')->comment('会员卡总余额');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card_balances');
    }
}
