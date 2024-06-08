<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = [
        'ennonce_question',
        'reponse_propose',
        'type',
        'reponse_correcte',
        'categorie',
        'note'
   
    ];


}


