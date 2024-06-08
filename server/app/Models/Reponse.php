<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Examen;
use App\Models\Candidat;

class Reponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'ennonce_question',
        'reponse_propose',
        'type',
        'categorie',
        'note',
        'reponse_correcte',
        'examenID',
        'candidatID',
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

    protected $casts = [
        'reponse_propose' => 'array',
        'reponse_correcte' => 'array'
    ];
}
