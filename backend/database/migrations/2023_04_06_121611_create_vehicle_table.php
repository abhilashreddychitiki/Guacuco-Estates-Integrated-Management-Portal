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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('tag_no');
            $table->string('driving_license');
            $table->string('number_plate');
            $table->string('phone');
            $table->longText('address');
            $table->bigInteger('userId')->unsigned()->index()->nullable();
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
