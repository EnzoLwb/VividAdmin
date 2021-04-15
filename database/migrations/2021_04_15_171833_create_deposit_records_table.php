<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepositRecordsTable extends Migration
{
    /**
     * Run the migrations.
     * 会员卡充值/消费变动详情
     * @return void
     */
    public function up()
    {
        Schema::create('deposit_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('card_no')->index();
            $table->unsignedDecimal('account')->comment('变动金额');
            $table->unsignedDecimal('deposit_account')->comment('原充值金额')->default(0.00);
            $table->unsignedDecimal('give_account')->comment('赠送金额')->default(0.00);
            $table->tinyInteger('type')->comment('类型 1 充值 2 消费金额');
            $table->string('other')->comment('销售人员|教练 等')->nullable();
            $table->integer('custom_id')->comment('关联ID 关联消费表')->nullable();
            $table->integer('file_id')->comment('上传凭证文件')->nullable();
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
        Schema::dropIfExists('deposit_records');
    }
}
