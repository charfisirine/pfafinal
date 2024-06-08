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
        Schema::create('reponses', function (Blueprint $table) {
            $table->id();
            $table->string('ennonce_question')->nullable(); // Assurez-vous que cette ligne est présente
            $table->json('reponse_propose'); // Changed to json type
            $table->string('type');
            $table->string('categorie');
            $table->float('note');
            $table->json('reponse_correcte'); // Changed to json type


            
            $table->unsignedBigInteger('examenID');
            $table->foreign('examenID')
            ->references('id')
            ->on('examens')
            ->onDelete('restrict')
            ->onUpdate('restrict');

            $table->unsignedBigInteger('candidatID');
            $table->foreign('candidatID')
            ->references('id')
            ->on('candidats')
            ->onDelete('restrict')
            ->onUpdate('restrict');








            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reponses');
    }
};
