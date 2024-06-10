<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Examen;
use App\Models\Candidat;
use App\Models\Formateur;

class Reponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'reponse_choisis',
        'examenID',
        'candidatID',
        'candidatName',
        'formateurID'
    ];

    // Relation avec l'examen
    public function examens()
    {
        return $this->belongsTo(Examen::class, 'examenID');
    }

    // Relation avec le candidat
    public function candidats()
    {
        return $this->belongsTo(Candidat::class, 'candidatID');
    }

    public function formateurs()
    {
        return $this->belongsTo(Formateur::class, 'formateurID');
    }
    protected $casts = [
        'reponse_choisis' => 'array'
    ];
}
