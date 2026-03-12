<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    protected $fillable = ['survey_id', 'answers', 'session_id'];

    protected $casts = [
        'answers' => 'array', // Crucial for treating JSON as a PHP array
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}