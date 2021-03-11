<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app_users', function (Blueprint $table) {
            $table->increments('uid');
            $table->string('phone')->nullable();
            $table->string('password')->nullable();
            $table->string('ip')->nullable();
            $table->string('api_token')->nullable();
            $table->string('nickname');
            $table->string('avatar');
            $table->unsignedTinyInteger('platform')->default(2)->comment('1 表示 pc网页 2表示 小程序 3表示其他');
            $table->string('open_id')->unique();
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
        Schema::dropIfExists('app_users');
    }
}
