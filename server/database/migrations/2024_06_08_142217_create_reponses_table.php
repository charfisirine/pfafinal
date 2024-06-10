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
            $table->json('reponse_choisis'); // Changed to json type

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

            $table->string('candidatName');

            $table->unsignedBigInteger('formateurID');
            $table->foreign('formateurID')
            ->references('id')
            ->on('formateurs')
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
