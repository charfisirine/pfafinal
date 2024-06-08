<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;
    protected $fillable = [
        'categorie',
        'titre',
        'sub_categorie',
        'duree',
        'date',
        'pourcentage_reussite',
        'formateurID',
    ];


            public function formateurs()
        {
        return $this->belongsTo(Formateur::class,"formateurID");
        }






}
