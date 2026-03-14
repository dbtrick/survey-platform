<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\SurveyRunController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\DashboardController; // Added this

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // UPDATED: Now points to the Controller
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- SURVEY MANAGEMENT ---
    Route::get('/survey-runs', [SurveyRunController::class, 'index'])->name('survey-runs.index');
    Route::get('/survey-runs/create', [SurveyRunController::class, 'create'])->name('survey-runs.create');
    Route::post('/surveys', [SurveyRunController::class, 'store'])->name('surveys.store');
    Route::delete('/surveys/{survey}', [SurveyRunController::class, 'destroy'])->name('surveys.destroy');

    // --- EXPORT FUNCTIONALITY ---
    Route::get('/exports', [ExportController::class, 'index'])->name('exports.index');
    Route::get('/exports/{survey}', [ExportController::class, 'show'])->name('exports.show');
    Route::get('/exports/{survey}/download', [ExportController::class, 'download'])->name('exports.download');
});

// --- PUBLIC ROUTES ---
Route::get('/s/{slug}', [SurveyRunController::class, 'show'])->name('surveys.public_show');
Route::post('/s/{slug}/submit', [SurveyRunController::class, 'submit'])->name('surveys.public_submit');

require __DIR__.'/settings.php';