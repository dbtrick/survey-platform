<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $days = (int) $request->query('days', 7);

        // 1. Stat Cards Data
        $totalRespondents = SurveyResponse::count();
        $totalSurveys = Survey::count();
        $responsesToday = SurveyResponse::whereDate('created_at', today())->count();
        
        // Calculate growth (Responses this period vs last period)
        $currentPeriod = SurveyResponse::where('created_at', '>=', now()->subDays($days))->count();
        $previousPeriod = SurveyResponse::where('created_at', '<', now()->subDays($days))
            ->where('created_at', '>=', now()->subDays($days * 2))
            ->count();
        
        $growth = $previousPeriod > 0 
            ? round((($currentPeriod - $previousPeriod) / $previousPeriod) * 100) 
            : ($currentPeriod > 0 ? 100 : 0);

        // 2. Chart Data: Responses per day
        $chartData = SurveyResponse::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('count(*) as total')
        )
            ->where('created_at', '>=', now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => date('M d', strtotime($item->date)),
                    'responses' => $item->total,
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_respondents' => $totalRespondents,
                'total_surveys' => $totalSurveys,
                'responses_today' => $responsesToday,
                'growth' => $growth,
            ],
            'chartData' => $chartData,
            'filters' => ['days' => $days]
        ]);
    }
}