<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->comment('Constant List');
            $table->string('icon')->nullable()->comment('el-icon-files');
            $table->string('url')->default('#')->comment('/admin/constant_list');
            $table->integer('pid')->default(0);
            $table->string('site')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('route_settings');
    }
}
