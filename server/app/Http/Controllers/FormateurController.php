<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // Ajout de l'importation de la classe Hash
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FormateurController extends Controller
{
    public function index()
    {
        $formateurs = Formateur::all();
        return $formateurs;
    }

    // public function store(Request $request)
    // {
    //     $formateur = new Formateur([
    //         'nom_complet' => $request->input('nom_complet'),
    //         'email' => $request->input('email'),
    //         'num_tel' => $request->input('num_tel'),
    //         'adresse' => $request->input('adresse'),
    //         'specialite' => $request->input('specialite')
    //     ]);

    //     $formateur->save();

    //     return response()->json($formateur, 201);
    // }

    public function show($id)
    {
        $formateur = Formateur::find($id);
        return response()->json($formateur);
    }

    public function update(Request $request, $id)
    {
        $formateur = Formateur::find($id);
        $formateur->update($request->all());
        return response()->json($formateur, 200);
    }

    public function destroy($id)
    {
        $formateur = Formateur::find($id);
        $formateur->delete();
        return response()->json('Formateur supprimé !');
    }

    public function register(Request $request)
    {
        $phone = $request->input('phone');

        // Check if the phone is exactly 8 digits using regular expression
        if($phone){
            if (!preg_match('/^\d{8}$/', $phone)) {
                return response()->json(['error' => 'The phone number must be exactly 8 digits.'], 422);
            }
        }
        $existingFormateur = Formateur::where('email', $request->input('email'))->first();
        if ($existingFormateur) {
            return response()->json(['error' => 'The email has already been taken.'], 422);
        }
        $request->validate([
            'nom_complet' => 'required',
            'email' => 'required|email|unique:Formateurs,email',
            'password' => 'required|min:6'
        ]);
        $Formateur = Formateur::create([
            'nom_complet' => $request->nom_complet,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'num_tel' => $request->num_tel,
            'adresse' => $request->adresse,
            'specialite' => $request->adresse,

        ]);
        $token = $Formateur->createToken('formateur Token')->plainTextToken;
        return response()->json([
            $Formateur,
            'status' => true,
            'message' => 'Formateur Created Successfully',
            'token' => $token
        ], 200);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Manually find the user by email
        $formateur  = Formateur::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$formateur  || !Hash::check($request->password, $formateur ->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Generate a new token for the formateur
        $token = $formateur ->createToken('formateur Token')->plainTextToken;

        return response()->json([
            'user' => $formateur ,
            'message' => 'Formateur login Successfully',
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user('formateur')->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
