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
    $question = new Question([
    'ennonce_question' => $request->input('ennonce_question'),
    'reponse_propose' => $request->input('reponse_propose'),
    'type' => $request->input('type'),
    'reponse_correcte' => $request->input('reponse_correcte'),
    'categorie' => $request->input('categorie'),
    'note' => $request->input('note')

    ]);


    $question->save();

    return response()->json($question, 201);
    }
    public function show($id)
    {
    $question = question::find($id);
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
