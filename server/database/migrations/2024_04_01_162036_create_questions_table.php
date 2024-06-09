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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            // type : choix multiple , seule reponse
            $table->string('ennonce_question')->nullable(); // Assurez-vous que cette ligne est présente
            $table->json('reponse_propose'); // Changed to json type
            $table->string('type');
            $table->string('difficulte');
            $table->float('note');
            $table->json('reponse_correcte'); // Changed to json type
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
