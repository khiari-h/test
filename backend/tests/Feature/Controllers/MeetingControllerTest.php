<?php
namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MeetingController extends Controller
{
    /**
     * Afficher une liste des rencontres
     */
    public function index()
    {
        $meetings = Meeting::with('artist')->get();
        return response()->json($meetings);
    }

    /**
     * Enregistrer une nouvelle rencontre
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'artist_id' => 'required|exists:artists,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'venue' => 'required|string|max:255',
            'type' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $meeting = Meeting::create($request->all());
        $meeting->load('artist');
        return response()->json($meeting, 201);
    }

    /**
     * Afficher une rencontre spécifique
     */
    public function show(Meeting $meeting)
    {
        $meeting->load('artist');
        return response()->json($meeting);
    }

    /**
     * Mettre à jour une rencontre
     */
    public function update(Request $request, Meeting $meeting)
    {
        $validator = Validator::make($request->all(), [
            'artist_id' => 'sometimes|required|exists:artists,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'start_time' => 'sometimes|required',
            'end_time' => 'sometimes|required',
            'venue' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $meeting->update($request->all());
        $meeting->load('artist');
        return response()->json($meeting);
    }

    /**
     * Supprimer une rencontre
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
        return response()->json(null, 204);
    }
}


