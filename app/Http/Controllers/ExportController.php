<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Exports\SurveyResponsesExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExportController extends Controller
{
    /**
     * Show the export options page
     */
    public function show(Survey $survey)
    {
        return Inertia::render('Exports/Show', [
            'survey' => $survey->loadCount('responses')
        ]);
    }

    /**
     * Handle the file download
     */
    public function download(Survey $survey, Request $request)
    {
        // Ensure there is data to export
        if ($survey->responses()->count() === 0) {
            return back()->with('error', 'No responses found to export.');
        }

        $format = $request->query('format', 'xlsx');
        $extension = ($format === 'csv') ? 'csv' : 'xlsx';
        $fileName = "responses_" . str_replace('-', '_', $survey->slug) . ".{$extension}";

        $export = new SurveyResponsesExport($survey);

        if ($format === 'csv') {
            return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
        }

        return Excel::download($export, $fileName);
    }
}