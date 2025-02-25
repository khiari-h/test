<?php
namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArtistController extends Controller
{
    /**
     * Afficher une liste des artistes
     */
    public function index()
    {
        $artists = Artist::all();
        return response()->json($artists);
    }

    /**
     * Enregistrer un nouvel artiste
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'genre' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $artist = Artist::create($request->all());
        return response()->json($artist, 201);
    }

    /**
     * Afficher un artiste spécifique
     */
    public function show(Artist $artist)
    {
        // Charger les relations pour avoir plus d'informations
        $artist->load(['concerts', 'meetings']);
        return response()->json($artist);
    }

    /**
     * Mettre à jour un artiste
     */
    public function update(Request $request, Artist $artist)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image_url' => 'nullable|string',
            'genre' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $artist->update($request->all());
        return response()->json($artist);
    }

    /**
     * Supprimer un artiste
     */
    public function destroy(Artist $artist)
    {
        $artist->delete();
        return response()->json(null, 204);
    }
}
