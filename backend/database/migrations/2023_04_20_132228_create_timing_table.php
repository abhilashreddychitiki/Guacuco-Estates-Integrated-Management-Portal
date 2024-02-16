<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('timings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('weekDays');
            $table->string('startTime');
            $table->string('endTime');
            $table->string('activity');
            $table->bigInteger('userId')->unsigned()->index()->nullable();
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->string('status')->default('Processing');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timings');
    }
};
