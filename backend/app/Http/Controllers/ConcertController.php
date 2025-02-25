<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConcertController extends Controller
{
    /**
     * Afficher une liste des concerts
     */
    public function index()
    {
        $concerts = Concert::with('artists')->get();
        return response()->json($concerts);
    }

    /**
     * Enregistrer un nouveau concert
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'venue' => 'required|string|max:255',
            'type' => 'nullable|string|max:100',
            'artists' => 'sometimes|array',
            'artists.*.id' => 'required|exists:artists,id',
            'artists.*.is_headliner' => 'boolean',
            'artists.*.performance_order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $concert = Concert::create($request->except('artists'));

        // Si des artistes sont fournis, les associer au concert
        if ($request->has('artists')) {
            foreach ($request->artists as $artistData) {
                $concert->artists()->attach($artistData['id'], [
                    'is_headliner' => $artistData['is_headliner'] ?? false,
                    'performance_order' => $artistData['performance_order'] ?? 0,
                ]);
            }
        }

        $concert->load('artists');
        return response()->json($concert, 201);
    }

    /**
     * Afficher un concert spécifique
     */
    public function show(Concert $concert)
    {
        $concert->load('artists');
        return response()->json($concert);
    }

    /**
     * Mettre à jour un concert
     */
    public function update(Request $request, Concert $concert)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image_url' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'start_time' => 'sometimes|required',
            'end_time' => 'sometimes|required',
            'venue' => 'sometimes|required|string|max:255',
            'type' => 'nullable|string|max:100',
            'artists' => 'sometimes|array',
            'artists.*.id' => 'required|exists:artists,id',
            'artists.*.is_headliner' => 'boolean',
            'artists.*.performance_order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $concert->update($request->except('artists'));

        // Si des artistes sont fournis, synchroniser la relation
        if ($request->has('artists')) {
            $artistSync = [];
            foreach ($request->artists as $artistData) {
                $artistSync[$artistData['id']] = [
                    'is_headliner' => $artistData['is_headliner'] ?? false,
                    'performance_order' => $artistData['performance_order'] ?? 0,
                ];
            }
            $concert->artists()->sync($artistSync);
        }

        $concert->load('artists');
        return response()->json($concert);
    }

    /**
     * Supprimer un concert
     */
    public function destroy(Concert $concert)
    {
        $concert->delete();
        return response()->json(null, 204);
    }
}
