<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyRunController extends Controller
{
    public function create()
    {
        return Inertia::render('SurveyRuns/Create');
    }
}
