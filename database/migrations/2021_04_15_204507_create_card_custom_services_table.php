<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardCustomServicesTable extends Migration
{
    /**
     * Run the migrations.
     * 会员卡购买服务项目详情记录
     * @return void
     */
    public function up()
    {
        Schema::create('card_custom_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('card_no')->index();
            $table->integer('service_id')->comment('服务项目的id');
            $table->unsignedInteger('numbers')->comment('服务次数');
            $table->unsignedDecimal('fee')->comment('消费金额 0 表示赠送')->default(0.00);
            $table->date('enable_date')->comment('生效日期');
            $table->date('disable_date')->comment('失效日期');
            $table->string('other')->nullable()->comment('教练id');
            $table->string('note')->nullable()->comment('备注');
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
        Schema::dropIfExists('card_custom_services');
    }
}
