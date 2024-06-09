<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::all();
        return $questions;
    }

    public function store(Request $request)
    {
        // $question = new Question([
        //     'ennonce_question' => $request->input('ennonce_question'),
        //     'reponse_correcte' => $request->input('reponse_correcte'), // No need to decode
        //     'type' => $request->input('type'),
        //     'reponse_propose' => $request->input('reponse_propose'), // No need to decode
        //     'categorie' => $request->input('categorie'),
        //     'note' => $request->input('note')
        // ]);
        $validatedData = $request->validate([
            'ennonce_question' => 'required|string',
            'type' => 'required|string',
            'reponse_correcte' => 'required|array',
            'reponse_correcte.*.key' => 'required|integer',
            'reponse_correcte.*.value' => 'required|string',
            'reponse_propose' => 'required|array',
            'reponse_propose.*.key' => 'required|integer',
            'reponse_propose.*.value' => 'required|string',
            'categorie' => 'required|string',
            'note' => 'required|numeric',
        ]);

        // Create a new instance of the model with validated data
        $question = new Question($validatedData);

        $question->save();

        return response()->json($question, 201);
    }

    public function show($id)
    {
        $question = Question::find($id);
        return response()->json($question);
    }

    public function update(Request $request, $id)
    {
        $question = Question::find($id);
        $question->update($request->all());
        return response()->json($question, 200);
    }

    public function destroy($id)
    {
        $question = Question::find($id);
        $question->delete();
        return response()->json('Catégorie supprimée !');
    }
}
