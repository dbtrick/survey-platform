<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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
            'user_id' => Auth::id(),
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
    $responses = $survey->responses;
    $total = $responses->count();
    
    $stats = [
        'total' => $total,
        'new_today' => $survey->responses()->whereDate('created_at', today())->count(),
        'completion_rate' => $total > 0 ? 100 : 0, 
        'avg_per_day' => $total > 0 ? round($total / max(1, $survey->created_at->diffInDays(now())), 1) : 0,
    ];

    $chartData = $survey->responses()
        ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
        ->groupBy('date')
        ->orderBy('date', 'ASC')
        ->get()
        ->map(fn($item) => [
            'date' => date('M d', strtotime($item->date)),
            'responses' => $item->total,
        ]);

    $questionCharts = [];
    foreach ($survey->structure as $block) {
        $blockId = $block['id'];
        
        // --- RADIO & CHECKBOX ---
        if (in_array($block['type'], ['radio', 'checkbox'])) {
            $counts = [];
            foreach ($responses as $res) {
                $answer = $res->answers[$blockId] ?? null;
                $answersArray = is_array($answer) ? $answer : ($answer ? [$answer] : []);
                foreach ($answersArray as $choice) {
                    $counts[$choice] = ($counts[$choice] ?? 0) + 1;
                }
            }
            
            $formattedData = [];
            foreach ($counts as $label => $value) {
                $formattedData[] = ['name' => $label, 'value' => $value];
            }

            $questionCharts[] = [
                'question' => $block['content'],
                'type' => 'simple',
                'data' => $formattedData,
            ];
        }

        // --- GRID (FIXED FOR COMBINED KEYS) ---
if ($block['type'] === 'grid') {
    $options = $block['options'] ?? [];
    $rows = $block['rows'] ?? [];
    $blockId = $block['id']; // This is the 'e4ff33e7...' part
    $gridData = [];

    foreach ($rows as $rowIndex => $rowName) {
        $rowEntry = ['row' => $rowName];
        
        // Initialize all options to 0
        foreach ($options as $opt) { 
            if ($opt) $rowEntry[trim($opt)] = 0; 
        }

        foreach ($responses as $res) {
            // Your DB saves it as "blockId_rowName"
            $lookupKey = $blockId . '_' . $rowName;
            
            // Get the value from the flat answers array
            $val = $res->answers[$lookupKey] ?? null;

            if ($val !== null) {
                // Map numeric index to string if needed
                if (is_numeric($val) && isset($options[$val])) { 
                    $val = $options[$val]; 
                }
                
                $cleanVal = trim($val);
                if (isset($rowEntry[$cleanVal])) {
                    $rowEntry[$cleanVal]++;
                }
            }
        }
        $gridData[] = $rowEntry;
    }

    $questionCharts[] = [
        'question' => $block['content'],
        'type' => 'grid_stacked',
        'options' => $options,
        'data' => $gridData,
    ];
}
    }

    return Inertia::render('SurveyRuns/Analytics', [
        'survey' => $survey,
        'stats' => $stats,
        'chartData' => $chartData,
        'questionCharts' => $questionCharts
    ]);
}
}