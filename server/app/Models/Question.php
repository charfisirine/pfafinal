<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'ennonce_question',
        'type',
        'reponse_correcte',
        'categorie',
        'note',
        'reponse_propose'
    ];

    protected $casts = [
        'reponse_propose' => 'array', // Cast reponse_propose to array
        'reponse_correcte' => 'array',
    ];

    public function examen()
    {
        return $this->belongsToMany(Examen::class);
    }
}
