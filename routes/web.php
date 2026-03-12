<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\SurveyRunController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/survey-runs/create', [SurveyRunController::class, 'create'])
    ->name('survey-runs.create');

    // Researcher: Save the survey
    Route::post('/surveys', [SurveyRunController::class, 'store'])->name('surveys.store');
});

// PUBLIC: Respondent View (Notice these are OUTSIDE the auth middleware)
Route::get('/s/{slug}', [SurveyRunController::class, 'show'])->name('surveys.public_show');
Route::post('/s/{slug}/submit', [SurveyRunController::class, 'submit'])->name('surveys.public_submit');

require __DIR__.'/settings.php';
