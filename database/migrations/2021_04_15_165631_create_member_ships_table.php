<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberShipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_ships', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('card_no')->unique()->comment('会员卡号');
            $table->string('name');
            $table->unsignedDecimal('account')->comment('会员卡余额')->default(0.00);
            $table->string('id_number')->nullable()->comment('身份证号');
            $table->string('phone')->nullable()->comment('手机号');
            $table->tinyInteger('gender')->comment('1男,2女');
            $table->date('register_time')->comment('入会时间');
            $table->string('coach')->comment('教练 逗号连接id')->nullable();
            $table->integer('pic_id')->comment('照片 file_id')->nullable();
            $table->string('pic_path')->comment('照片 file_path')->nullable();
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
        Schema::dropIfExists('member_ships');
    }
}
