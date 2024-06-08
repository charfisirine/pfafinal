<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // Ajout de l'importation de la classe Hash
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CandidatController extends Controller
{
    public function index()
    {
        $candidats = Candidat::all();
        return $candidats;
    }

    // public function store(Request $request)
    // {
    //     $candidat = new Candidat([
    //         'nom_complet' => $request->input('nom_complet'),
    //         'email' => $request->input('email'),
    //         'num_tel' => $request->input('num_tel'),
    //         'adresse' => $request->input('adresse'),
    //     ]);

    //     $candidat->save();

    //     return response()->json($candidat, 201);
    // }

    public function show($id)
    {
        $candidat = Candidat::find($id);
        return response()->json($candidat);
    }

    public function update(Request $request, $id)
    {
        $candidat = Candidat::find($id);
        $candidat->update($request->all());
        return response()->json($candidat, 200);
    }

    public function destroy($id)
    {
        $candidat = Candidat::find($id);
        $candidat->delete();
        return response()->json('Catégorie supprimée !');
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
        $existingCandidat = Candidat::where('email', $request->input('email'))->first();
        if ($existingCandidat) {
            return response()->json(['error' => 'The email has already been taken.'], 422);
        }
        $request->validate([
            'nom_complet' => 'required',
            'email' => 'required|email|unique:Candidats,email',
            'password' => 'required|min:6'
        ]);
        $Candidat = Candidat::create([
            'nom_complet' => $request->nom_complet,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'num_tel' => $request->num_tel,
            'adresse' => $request->adresse
        ]);
        $token = $Candidat->createToken('candidatToken')->plainTextToken;
        return response()->json([
            $Candidat,
            'status' => true,
            'message' => 'Candidat Created Successfully',
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
        $candidat = Candidat::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$candidat || !Hash::check($request->password, $candidat->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Generate a new token for the candidat
        $token = $candidat->createToken('candidatToken')->plainTextToken;

        return response()->json([
            'candidat' => $candidat,
            'message' => 'Candidat login Successfully',
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user('candidat')->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
