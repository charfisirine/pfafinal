<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;


class ExamenController extends Controller
{
    public function index()
    {
        $examens = Examen::with('formateurs', 'questions')->get();
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
    public function assignQuestionsToExamen(Request $request, $examenId)
    {
        // Retrieve the examen instance
        $examen = Examen::findOrFail($examenId);

        // Validate the request
        $request->validate([
            'question_ids' => 'required|array', // Ensure question_ids is an array
            'question_ids.*' => 'exists:questions,id', // Ensure each question_id exists in the questions table
        ]);

        // Retrieve the question_ids from the request
        $questionIds = $request->input('question_ids');

        // Sync the questions for the examen
        $examen->questions()->sync($questionIds);

        return response()->json(['success' => true]);
    }

    public function show($id)
    {
        $examen = Examen::with('questions')->find($id);
        $questions = DB::table('examen_question')
            ->where('examen_id', $id)
            ->pluck('question_id');

        // return response()->json($examen);
        return response()->json([
            'examen' => $examen,
            'questions' => $questions, // Include the associated questions
        ]);
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

    public function searchSimple(Request $request)
    {
        $keyword = strtolower($request->query('keyword')); // Convertir en minuscules
        $examens = Examen::where('titre', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->get();
        return response()->json($examens);
    }



    
    
        public function generateExamenWithDifficulty(Request $request)
        {
            $request->validate([
                'titre' => 'required|string',
                'categorie' => 'required|string',
                'sub_categorie' => 'required|string',
                'nbre_question' => 'required|integer',
                'duree' => 'required|integer',
                'description' => 'string|nullable',
                'date' => 'required|date',
                'formateurID' => 'required|integer|exists:formateurs,id',
                'pourcentage_reussite' => 'required|integer',
            ]);
    
            // Create the Examen
            $examen = Examen::create($request->only([
                'titre', 'categorie', 'sub_categorie', 'nbre_question', 'duree', 'description', 'date', 'formateurID', 'pourcentage_reussite'
            ]));
    
            // Calculate the number of questions based on difficulty distribution
            $nbreQuestion = $request->input('nbre_question');
            $advancedQuestionsCount = round($nbreQuestion * 0.4); // 40% advanced
            $basicQuestionsCount = $nbreQuestion - $advancedQuestionsCount; // 60% basic
    
            // Fetch questions based on difficulty
            $advancedQuestions = Question::where('difficulte', 'advanced')->inRandomOrder()->take($advancedQuestionsCount)->pluck('id')->toArray();
            $basicQuestions = Question::where('difficulte', 'basic')->inRandomOrder()->take($basicQuestionsCount)->pluck('id')->toArray();
    
            $questionIds = array_merge($advancedQuestions, $basicQuestions);
    
            // Attach questions to the examen
            $examen->questions()->sync($questionIds);
    
            return response()->json(['success' => true, 'examen' => $examen], 201);
        }
  


}
