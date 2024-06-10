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
        $reponses = Reponse::with('candidats','examens', 'formateurs')->get();
        return response()->json($reponses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'reponse_choisis' => 'required|array', // Ensure reponse_choisis is an array
            'reponse_choisis.*' => 'array|nullable', // Ensure each element within reponse_choisis is an array or nullable
            'examenID' => 'required',
            'candidatID' => 'required',
            'candidatName' => 'required',
            'formateurID' => 'required',
        ]);

        // Retrieve the validated data
        $reponse_choisis = $validatedData['reponse_choisis'];

        // Create a new Reponse instance
        $reponse = new Reponse([
            'reponse_choisis' => json_encode($reponse_choisis), // Convert the array to JSON
            'examenID' => $validatedData['examenID'],
            'candidatID' => $validatedData['candidatID'],
            'candidatName' => $validatedData['candidatName'],
            'formateurID' => $validatedData['formateurID'],
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
