<?php
namespace App\Http\Controllers;

use App\Models\News;

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
        $newsItem = News::find($id);

        if (!$newsItem) {
            return response()->json(['message' => 'News item not found'], 404);
        }

        return response()->json($newsItem);
    }
}


