<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\SurveyRunController;
use App\Http\Controllers\ExportController; // Added this

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // --- SURVEY MANAGEMENT (RESEARCHER) ---
    
    // List Active Surveys
    Route::get('/survey-runs', [SurveyRunController::class, 'index'])
        ->name('survey-runs.index');

    // Create Survey
    Route::get('/survey-runs/create', [SurveyRunController::class, 'create'])
        ->name('survey-runs.create');

    // Save Survey
    Route::post('/surveys', [SurveyRunController::class, 'store'])
        ->name('surveys.store');

    // Delete Survey
    Route::delete('/surveys/{survey}', [SurveyRunController::class, 'destroy'])
        ->name('surveys.destroy');

    // --- EXPORT FUNCTIONALITY ---
    
    // Show Export Options Page
    Route::get('/exports/{survey}', [ExportController::class, 'show'])
        ->name('exports.show');

    // Trigger File Download
    Route::get('/exports/{survey}/download', [ExportController::class, 'download'])
        ->name('exports.download');
});

// --- PUBLIC SURVEY ROUTES (RESPONDENT) ---
Route::get('/s/{slug}', [SurveyRunController::class, 'show'])->name('surveys.public_show');
Route::post('/s/{slug}/submit', [SurveyRunController::class, 'submit'])->name('surveys.public_submit');

require __DIR__.'/settings.php';