<?php
namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    // Affiche toutes les actualités
    public function index()
    {
        $news = News::all();
        return response()->json($news);
    }

    // Affiche une actualité spécifique
    public function show($id)
    {
        $newsItem = News::findOrFail($id);
        return response()->json($newsItem);
    }

    // Création d'une nouvelle actualité
    public function store(Request $request)
    {
        // Log détaillé des données reçues
        Log::info('Données reçues pour création de news:', $request->all());

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'importance' => 'required|in:Faible,Moyenne,Haute'
        ]);

        if ($validator->fails()) {
            Log::error('Erreurs de validation:', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $news = News::create($request->all());
            
            // Log de la news créée
            Log::info('News créée avec succès:', $news->toArray());
            
            return response()->json($news, 201);
        } catch (\Exception $e) {
            // Log de l'erreur complète
            Log::error('Erreur lors de la création de la news: ' . $e->getMessage());
            Log::error('Trace de l\'erreur: ' . $e->getTraceAsString());

            return response()->json([
                'error' => 'Erreur lors de la création de l\'actualité', 
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Mise à jour d'une actualité
    public function update(Request $request, $id)
    {
        $newsItem = News::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:100',
            'importance' => 'sometimes|required|in:Faible,Moyenne,Haute'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $newsItem->update($request->all());
            return response()->json($newsItem);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour de l\'actualité', 
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Suppression d'une actualité
    public function destroy($id)
    {
        $newsItem = News::findOrFail($id);
        
        try {
            $newsItem->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression de l\'actualité', 
                'message' => $e->getMessage()
            ], 500);
        }
    }
}