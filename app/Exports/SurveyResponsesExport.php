<?php

namespace App\Exports;

use App\Models\Survey;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SurveyResponsesExport implements FromCollection, WithHeadings, WithMapping
{
    protected $survey;

    public function __construct(Survey $survey)
    {
        $this->survey = $survey;
    }

    public function collection()
    {
        return $this->survey->responses;
    }

    public function headings(): array
    {
        $headings = ['Response ID', 'Timestamp'];

        foreach ($this->survey->structure as $block) {
            // Standard questions get one column
            if (in_array($block['type'], ['radio', 'checkbox', 'openended'])) {
                $headings[] = $block['content'] ?? 'Question';
            }
            
            // Grid questions get one column PER ROW
            if ($block['type'] === 'grid') {
                foreach ($block['rows'] as $rowLabel) {
                    $headings[] = ($block['content'] ?: 'Grid') . " [" . $rowLabel . "]";
                }
                if ($block['hasOther'] ?? false) {
                    $headings[] = ($block['content'] ?: 'Grid') . " [Other]";
                }
            }

            // Input groups get one column PER FIELD (Name, Age, etc)
            if ($block['type'] === 'input') {
                foreach ($block['options'] as $fieldLabel) {
                    $headings[] = $fieldLabel;
                }
            }
        }

        return $headings;
    }

  public function map($response): array
{
    $row = [
        $response->id,
        $response->created_at->toDateTimeString(),
    ];

    $answers = $response->answers;

    foreach ($this->survey->structure as $block) {
        $blockId = $block['id'];

        // Standard Radio/Checkbox/OpenEnded
        if (in_array($block['type'], ['radio', 'checkbox', 'openended'])) {
            $val = $answers[$blockId] ?? '';
            $row[] = is_array($val) ? implode(', ', $val) : $val;
        }

        // Grid (Row by Row)
        elseif ($block['type'] === 'grid') {
            foreach ($block['rows'] as $rowLabel) {
                $row[] = $answers["{$blockId}_{$rowLabel}"] ?? '';
            }
            if ($block['hasOther'] ?? false) {
                // Logic to find the "Other" key
                $otherVal = '';
                foreach ($answers as $k => $v) {
                    if (str_starts_with($k, "{$blockId}_Other:")) { $otherVal = $v; break; }
                }
                $row[] = $otherVal;
            }
        }

        // Input Group (Personal Details Fix)
        elseif ($block['type'] === 'input') {
            $group = $answers[$blockId] ?? []; // This is your {"Name": "...", "Age": "..."}
            foreach ($block['options'] as $fieldLabel) {
                $row[] = $group[$fieldLabel] ?? '';
            }
        }
    }

    return $row;
}
}