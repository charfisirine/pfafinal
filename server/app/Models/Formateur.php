<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Formateur extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'nom_complet',
        'email',
        'num_tel',
        'adresse',
        'specialite',
        'password',

    ];

    public function examens()
    {
    return $this->hasMany(Examen::class ,"formateurID");
    }

}