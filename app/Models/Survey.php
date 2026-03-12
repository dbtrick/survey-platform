<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'structure',
    ];

    /**
     * The attributes that should be cast.
     * This converts the JSON database column into a PHP array automatically.
     */
    protected $casts = [
        'structure' => 'array',
    ];
}