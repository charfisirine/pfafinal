<?php

namespace App\Http\Controllers;

use App\Models\Reponse;
use Illuminate\Http\Request;

class ReponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reponses = Reponse::with('candidats','examens')->get();
        return $reponses;
    }
  
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ennonce_question' => 'required',
            'reponse_propose' => 'required|array', // Assurez-vous que la valeur de reponse_propose est une liste
            'reponse_propose.*' => 'string|nullable', // Assurez-vous que chaque élément de la liste est de type string ou nullable
            'type' => 'required',
            'categorie' => 'required',
            'note' => 'required',
            'reponse_correcte' => 'required|array', // Assurez-vous que la valeur de reponse_correcte est une liste
            'reponse_correcte.*' => 'string|nullable', // Assurez-vous que chaque élément de la liste est de type string ou nullable
            'examenID' => 'required',
            'candidatID' => 'required',
        ]);
    
        // Transforme les valeurs de reponse_propose et reponse_correcte en liste
        $reponse_propose = $request->get('reponse_propose');
        $reponse_correcte = $request->get('reponse_correcte');
    
        // Crée une nouvelle réponse
        $reponse = new Reponse([
            'ennonce_question' => $request->get('ennonce_question'),
            'reponse_propose' => json_encode($reponse_propose), // Convertit la liste en JSON
            'type' => $request->get('type'),
            'categorie' => $request->get('categorie'),
            'note' => $request->get('note'),
            'reponse_correcte' => json_encode($reponse_correcte), // Convertit la liste en JSON
            'examenID' => $request->get('examenID'),
            'candidatID' => $request->get('candidatID'),
        ]);
    
        $reponse->save(); // Sauvegarde la réponse
    
        return response()->json(['message' => 'Réponse créée avec succès', 'data' => $reponse], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reponse $reponse)
    {
        return response()->json($reponse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reponse $reponse)
    {
        $reponse->update($request->all());
        return response()->json($reponse, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reponse $reponse)
    {
        $reponse->delete();
        return response()->json('Reponse supprimée !');
    }
}
