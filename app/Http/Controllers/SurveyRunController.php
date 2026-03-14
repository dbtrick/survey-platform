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
     * Researcher: List all surveys with response counts
     */
    public function index()
    {
        return Inertia::render('SurveyRuns/Index', [
            'surveys' => Survey::withCount('responses')
                ->orderBy('created_at', 'desc')
                ->get()
        ]);
    }

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
        $request->validate([
            'title' => 'required|string|max:255',
            'blocks' => 'required|array',
        ]);

        $slug = Str::slug($request->title) . '-' . Str::lower(Str::random(5));

        $survey = Survey::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'slug' => $slug,
            'structure' => $request->blocks, 
        ]);

        return back()->with('generated_link', url("/s/{$slug}"));
    }

    /**
     * Respondent: View the Survey
     */
    public function show($slug)
    {
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

        SurveyResponse::create([
            'survey_id' => $survey->id,
            'answers' => $request->responses,
            'session_id' => session()->getId(),
        ]);

        return Inertia::render('SurveyRuns/Success');
    }

    /**
     * Researcher: Delete a survey and its responses
     */
    public function destroy(Survey $survey)
    {
        // This will also delete responses if you set up 'onDelete cascade' in migrations
        $survey->delete();
        return back();
    }

    public function analytics(Survey $survey)
{
    // Load responses
    $responses = $survey->responses;
    $total = $responses->count();
    $charts = [];

    foreach ($survey->structure as $block) {
        // We only generate charts for quantitative types
        if (in_array($block['type'], ['radio', 'checkbox'])) {
            $counts = [];
            $others = [];
            $blockId = $block['id'];

            foreach ($responses as $res) {
                $answer = $res->answers[$blockId] ?? null;

                // Handle Multiple Selection (Checkboxes)
                if (is_array($answer)) {
                    foreach ($answer as $choice) {
                        $counts[$choice] = ($counts[$choice] ?? 0) + 1;
                    }
                } 
                // Handle Single Selection (Radio)
                elseif ($answer) {
                    $counts[$answer] = ($counts[$answer] ?? 0) + 1;
                }

                // Check for "Other" text input
                if (isset($res->answers[$blockId . '_other'])) {
                    $others[] = $res->answers[$blockId . '_other'];
                }
            }

            // Format for Recharts
            $formattedData = [];
            foreach ($counts as $label => $value) {
                $formattedData[] = ['name' => $label, 'value' => $value];
            }

            $charts[] = [
                'question' => $block['content'] ?? 'Untitled Question',
                'type' => $block['type'],
                'data' => $formattedData,
                'other_responses' => array_filter($others)
            ];
        }
    }

    return Inertia::render('SurveyRuns/Analytics', [
        'survey' => $survey,
        'total' => $total,
        'charts' => $charts
    ]);
}
}