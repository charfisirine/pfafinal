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
            $table->string('reponse_propose');
            $table->string('type');
            $table->string('categorie');
            $table->float('note');
            $table->string('reponse_correcte');
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
