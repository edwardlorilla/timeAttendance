<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('times', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('visitor_id');
            $table->foreign('visitor_id')->references('id')->on('visitors');
            $table->string('LocaleDate')->nullable();
            $table->bigInteger('LocaleStartTime')->nullable();
            $table->boolean('disabled')->default(false);
            $table->dateTime('tempStartTime')->nullable();
            $table->dateTime('LocaleEndTime')->nullable();
            $table->string('duration')->nullable();
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
        Schema::dropIfExists('times');
    }
}
