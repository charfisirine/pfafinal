<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

 class ExamenController extends Controller
{
    public function index()
    {
        $examens = Examen::with('formateurs')->get();
        return $examens;
    }

    public function store(Request $request)
    {
        $examen = new Examen([
            'titre' => $request->input('titre'),
            'categorie' => $request->input('categorie'),
            'sub_categorie' => $request->input('sub_categorie'),
            'nbre_question' => $request->input('nbre_question'),
            'duree' => $request->input('duree'),
            'description' => $request->input('description'),
            'date' => $request->input('date'),
            'formateurID' => $request->input('formateurID'),
            'pourcentage_reussite' => $request->input('pourcentage_reussite'),
            
        ]);

        $examen->save();

        return response()->json($examen, 201);
    }

    public function show($id)
    {
        $examen = Examen::find($id);
        return response()->json($examen);
    }
    // public function show($id)
    // {
    //     $examen = Examen::findOrFail($id);
    //     return view('examen.show', compact('examen'));
    // }

    public function update(Request $request, $id)
    {
        $examen = Examen::find($id);
        $examen->update($request->all());
        return response()->json($examen, 200);
    }

    public function destroy($id)
    {
        $examen = Examen::find($id);
        $examen->delete();
        return response()->json('Examen supprimé !');
    }
}
