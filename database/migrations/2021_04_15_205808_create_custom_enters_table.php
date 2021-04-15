<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomEntersTable extends Migration
{
    /**
     * Run the migrations.
     * 消费入场扣除记录
     * @return void
     */
    public function up()
    {
        Schema::create('custom_enters', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('card_no')->index();
            $table->tinyInteger('type')->comment('普通入场 1 消费项目入场2')->default(1);
            $table->bigInteger('card_custom_services_id')->nullable()->comment('关联消费项目的ID');
            $table->integer('decrease_number')->comment('扣除次数')->default(1);
            $table->integer('admin_id')->comment('操作人');
            $table->string('note')->comment('备注')->nullable();
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
        Schema::dropIfExists('custom_enters');
    }
}
