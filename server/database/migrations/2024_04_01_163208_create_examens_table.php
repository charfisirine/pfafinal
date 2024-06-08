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
        Schema::create('examens', function (Blueprint $table) {
            $table->id();
            $table->string('categorie'); // categorie:informatique , fr, anglais
            $table->string('titre');
            $table->string('pourcentage_reussite');
            $table->string('description')->nullable();
            $table->string('sub_categorie'); // sub_categorie : html css
            $table->integer('duree');
            $table->date('date');
            //titre



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
        Schema::dropIfExists('examens');
    }
};
