<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_group', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->tinyInteger('type')->comment('Model 中定义');
            $table->integer('grid_id')->comment('其他管理ID')->nullable();
            $table->integer('admin_id')->comment('管理员id');
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
        Schema::dropIfExists('admin_group');
    }
}
