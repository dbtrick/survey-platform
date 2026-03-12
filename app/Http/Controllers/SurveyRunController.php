<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SurveyRunController extends Controller
{
    /**
     * Researcher: Render the Survey Builder
     */
    public function create()
    {
        return Inertia::render('SurveyRuns/Create');
    }

    /**
     * Researcher: Save the Survey Blueprint
     */
    public function store(Request $request)
    {
        // Validate that we have a title and blocks
        $request->validate([
            'title' => 'required|string|max:255',
            'blocks' => 'required|array',
        ]);

        // Generate a unique URL slug
        $slug = Str::slug($request->title) . '-' . Str::lower(Str::random(5));

        // Save to the 'surveys' table
        $survey = Survey::create([
            'title' => $request->title,
            'slug' => $slug,
            'structure' => $request->blocks, 
        ]);

        // Send the link back to the React frontend
        return back()->with('generated_link', url("/s/{$slug}"));
    }

    /**
     * Respondent: View the Survey
     */
    public function show($slug)
    {
        // Find the survey by its URL slug
        $survey = Survey::where('slug', $slug)->firstOrFail();

        return Inertia::render('SurveyRuns/PublicView', [
            'survey' => $survey
        ]);
    }

    /**
     * Respondent: Submit Answers
     */
    public function submit(Request $request, $slug)
    {
        $survey = Survey::where('slug', $slug)->firstOrFail();

        // Save to the 'survey_responses' table
        SurveyResponse::create([
            'survey_id' => $survey->id,
            'answers' => $request->responses,
            'session_id' => session()->getId(),
        ]);

        return Inertia::render('SurveyRuns/Success');
    }
}