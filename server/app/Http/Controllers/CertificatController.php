<?php

namespace App\Http\Controllers;

use App\Models\Certificat;
use Illuminate\Http\Request;

class CertificatController extends Controller
{
    /**
     * Display a listing of the resource.
     */



    public function index()
{
$certificats = Certificat::all();
return $certificats;
}

public function store(Request $request)
{
    // Assurez-vous que l'image est présente dans la requête
    if ($request->hasFile('image')) {
        // Récupérez le fichier image de la requête
        $image = $request->file('image');

        // Enregistrez le fichier image dans le répertoire 'images' et récupérez son chemin
        $imagePath = $image->store('public/images');

        // Créez un nouveau certificat avec les données fournies
        $certificat = new Certificat([
            'titre' => $request->input('titre'),
            'categorie' => $request->input('categorie'),
            'sub_categorie' => $request->input('sub_categorie'),
            'description' => $request->input('description'),
            'image' => $imagePath,
        ]);

        // Sauvegardez le certificat dans la base de données
        $certificat->save();

        // Récupérez l'URL de l'image nouvellement téléchargée
        $imageUrl = asset('storage/' . $imagePath);

        // Ajoutez l'URL de l'image à la réponse JSON
        $response = [
            'certificat' => $certificat,
            'imageUrl' => $imageUrl
        ];

        // Retournez une réponse JSON avec le certificat et l'URL de l'image
        return response()->json($response, 201);
    } else {
        // Retournez une erreur si aucune image n'a été téléchargée
        return response()->json(['error' => 'Aucune image n\'a été téléchargée.'], 400);
    }
}


public function show($id)
{
$certificat = Certificat::find($id);
return response()->json($certificat);
}

public function update(Request $request, $id)
{
$certificat = Certificat::find($id);
$certificat->update($request->all());
return response()->json($certificat,200);
}

public function destroy($id)
{
$certificat = Certificat::find($id);
$certificat->delete();
return response()->json('certificat supprimée !');
}
}