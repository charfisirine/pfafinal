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
        'nbre_question',
        'duree',
        'date',
        'pourcentage_reussite',
        'formateurID',
        'description'
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }
    public function formateurs()
    {
        return $this->belongsTo(Formateur::class, "formateurID");
    }
    public function reponses()
    {
        return $this->hasMany(Reponse::class, "candidatID");
    }

}
