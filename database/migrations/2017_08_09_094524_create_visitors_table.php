<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVisitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('category_id')->index()->nullable();
            $table->unsignedInteger('course_id')->index()->nullable();
            
            $table->foreign('category_id')->references('id')->on('categories');

            $table->string('name')->nullable();

            $table->string('schoolId')->nullable();
            $table->string('year')->nullable();;
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
        Schema::dropIfExists('visitors');
    }
}
