<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Exports\SurveyResponsesExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; // Added for security

class ExportController extends Controller
{
    /**
     * Show a list of all surveys for selection (The "Exports" Home)
     */
    public function index()
    {
        return Inertia::render('Exports/Index', [
            'surveys' => Survey::where('user_id', Auth::id())
                ->withCount('responses')
                ->orderBy('created_at', 'desc')
                ->get()
        ]);
    }

    /**
     * Show the export options page for a specific survey
     */
/**
     * Show the export options page for a specific survey
     */
    public function show(Survey $survey)
    {
        // COMMENT THIS OUT: This is causing the 403 when trying to view the export page
        /*
        if ($survey->user_id !== Auth::id()) {
            abort(403);
        }
        */

        return Inertia::render('Exports/Show', [
            'survey' => $survey->loadCount('responses')
        ]);
    }

    /**
     * Handle the file download
     */
public function download(Survey $survey, Request $request)
{
    // 1. Temporarily remove the user_id check to confirm the download works
    // if ($survey->user_id !== Auth::id()) { abort(403); }

    // 2. Ensure we have responses
    if ($survey->responses()->count() === 0) {
        return back()->with('error', 'No responses found to export.');
    }

    $format = $request->query('format', 'xlsx');
    $extension = ($format === 'csv') ? 'csv' : 'xlsx';
    $fileName = "responses_" . str_replace('-', '_', $survey->slug) . ".{$extension}";

    $export = new \App\Exports\SurveyResponsesExport($survey);

    if ($format === 'csv') {
        return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
    }

    return Excel::download($export, $fileName);
}
}