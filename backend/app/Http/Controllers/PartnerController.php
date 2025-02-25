<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartnerController extends Controller
{
    /**
     * Afficher une liste des partenaires
     */
    public function index()
    {
        $partners = Partner::all();
        return response()->json($partners);
    }

    /**
     * Enregistrer un nouveau partenaire
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo_url' => 'nullable|string',
            'website_url' => 'nullable|url',
            'category' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partner = Partner::create($request->all());
        return response()->json($partner, 201);
    }

    /**
     * Afficher un partenaire spécifique
     */
    public function show(Partner $partner)
    {
        return response()->json($partner);
    }

    /**
     * Mettre à jour un partenaire
     */
    public function update(Request $request, Partner $partner)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'logo_url' => 'nullable|string',
            'website_url' => 'nullable|url',
            'category' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partner->update($request->all());
        return response()->json($partner);
    }

    /**
     * Supprimer un partenaire
     */
    public function destroy(Partner $partner)
    {
        $partner->delete();
        return response()->json(null, 204);
    }
}



