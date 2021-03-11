<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username')->unique();
            $table->string('real_name')->default('');
            $table->string('mobile')->nullable();
            $table->string('work_no')->default('1000');
            $table->string('password')->default('');
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('role_id')->default(0);
            $table->date('login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE `admins` AUTO_INCREMENT=1000");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
