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
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('senderId')->unsigned()->index()->nullable();
            $table->foreign('senderId')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('receiverId')->unsigned()->index()->nullable();
            $table->foreign('receiverId')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('read')->default(false);
            $table->string('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
