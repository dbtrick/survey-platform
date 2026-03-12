<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Table for the survey configuration (The Blueprint)
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique(); // This creates the URL part like /s/client-survey
            $table->json('structure');        // This stores your blocks array
            $table->timestamps();
        });

        // 2. Table for the actual results (The Answers)
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            // This links the response to the specific survey
            $table->foreignId('survey_id')->constrained('surveys')->onDelete('cascade');
            $table->json('answers');          // This stores the respondent's choices
            $table->string('session_id')->nullable(); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
        Schema::dropIfExists('surveys');
    }
};