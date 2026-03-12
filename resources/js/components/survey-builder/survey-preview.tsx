"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { router } from '@inertiajs/react';

export default function SurveyPreview({ blocks, totalPages = 1, isPublic = false, surveySlug = "" }: any) {
  const [currentViewPage, setCurrentViewPage] = useState(1)
  const [responses, setResponses] = useState<any>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onFinish = () => {
    const finalData: any = {};

    blocks.forEach((block: any) => {
      const primaryValue = responses[block.id];
      const otherText = responses[`${block.id}_other_text`]?.trim();

      if (block.type === 'radio') {
        // If Other is selected and text exists, save "Other: [text]"
        if (primaryValue === 'other') {
          finalData[block.id] = otherText ? `Other: ${otherText}` : 'Other';
        } else {
          finalData[block.id] = primaryValue;
        }
      }

      else if (block.type === 'checkbox') {
        const values = Array.isArray(primaryValue) ? [...primaryValue] : [];
        // Replace the 'other' string in the array with 'Other: [text]'
        const processedValues = values.map(val => {
          if (val === 'other') return otherText ? `Other: ${otherText}` : 'Other';
          return val;
        });
        finalData[block.id] = processedValues;
      }

      else {
        // For text inputs, grids, etc., just save as is
        finalData[block.id] = primaryValue;
      }
    });

    if (isPublic && surveySlug) {
      router.post(`/s/${surveySlug}/submit`, {
        responses: finalData
      });
    } else {
      console.log("FINAL FORMATTED DATA:", finalData);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (currentViewPage > totalPages) setCurrentViewPage(totalPages || 1)
  }, [totalPages])

  const questionTypes = ["radio", "checkbox", "openended", "input", "grid"]
  const visibleBlocks = blocks.filter((b: any) => b.page === currentViewPage)

  const updateResponse = (blockId: string, value: any) => {
    setResponses((prev: any) => ({ ...prev, [blockId]: value }))
  }

  const handleCheckboxChange = (blockId: string, option: string) => {
    const current = responses[blockId] || []
    const next = current.includes(option) ? current.filter((o: any) => o !== option) : [...current, option]
    updateResponse(blockId, next)
  }

  if (isSubmitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
        <CheckCircle2 size={48} className="text-green-500" />
        <h2 className="text-xl font-bold">Preview Finished</h2>
        <Button variant="outline" onClick={() => { setIsSubmitted(false); setResponses({}); setCurrentViewPage(1); }}>Restart</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      {totalPages > 1 && (
        <div className="mb-6 space-y-1">
          <Progress value={(currentViewPage / totalPages) * 100} className="h-1" />
        </div>
      )}

      <div className="flex-1 space-y-8 pb-10">
        {visibleBlocks.map((block: any) => {
          const isQ = questionTypes.includes(block.type)
          const currentVal = responses[block.id] || ""

          return (
            <div key={block.id} className="animate-in fade-in slide-in-from-bottom-2">
              {block.type === "heading" && <h1 className="text-xl font-bold">{block.content || "Untitled"}</h1>}
              {block.type === "subheading" && <p className="text-sm text-muted-foreground">{block.content}</p>}

              {isQ && (
                <div className="space-y-4">
                  <p className="font-semibold text-sm">{block.content || "Question Text"}</p>

                  {block.type === "radio" && (
                    <RadioGroup className="space-y-2 ml-2" value={currentVal} onValueChange={(v) => updateResponse(block.id, v)}>
                      {block.options?.map((opt: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt} id={`r-${block.id}-${i}`} />
                          <label htmlFor={`r-${block.id}-${i}`} className="text-sm">{opt}</label>
                        </div>
                      ))}
                      {block.hasOther && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id={`r-${block.id}-other`} />
                            <label htmlFor={`r-${block.id}-other`} className="text-sm">Other</label>
                          </div>
                          {currentVal === "other" && (
                            <Input className="h-8 ml-6" placeholder="Please specify..." value={responses[`${block.id}_other_text`] || ""} onChange={(e) => updateResponse(`${block.id}_other_text`, e.target.value)} />
                          )}
                        </div>
                      )}
                    </RadioGroup>
                  )}

                  {block.type === "checkbox" && (
                    <div className="space-y-2 ml-2">
                      {block.options?.map((opt: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox checked={(responses[block.id] || []).includes(opt)} onCheckedChange={() => handleCheckboxChange(block.id, opt)} />
                          <span className="text-sm">{opt}</span>
                        </div>
                      ))}
                      {block.hasOther && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={(responses[block.id] || []).includes("other")} onCheckedChange={() => handleCheckboxChange(block.id, "other")} />
                            <span className="text-sm">Other</span>
                          </div>
                          {(responses[block.id] || []).includes("other") && (
                            <Input className="h-8 ml-6" placeholder="Please specify..." value={responses[`${block.id}_other_text`] || ""} onChange={(e) => updateResponse(`${block.id}_other_text`, e.target.value)} />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {block.type === "openended" && <Textarea className="rounded-xl" placeholder="Answer..." value={currentVal} onChange={(e) => updateResponse(block.id, e.target.value)} />}

                  {block.type === "input" && (
                    <div className="grid gap-3">
                      {block.options?.map((label: string, i: number) => (
                        <div key={i} className="space-y-1">
                          <label className="text-[10px] uppercase font-bold opacity-50">{label}</label>
                          <Input className="h-8" value={responses[`${block.id}_${i}`] || ""} onChange={(e) => updateResponse(`${block.id}_${i}`, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-auto pt-4 border-t flex justify-between">
        <Button variant="ghost" size="sm" disabled={currentViewPage === 1} onClick={() => setCurrentViewPage(v => v - 1)}>Back</Button>
        {currentViewPage < totalPages ? (
          <Button size="sm" onClick={() => setCurrentViewPage(v => v + 1)}>Next</Button>
        ) : (
          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onFinish}>Finish</Button>
        )}
      </div>
    </div>
  )
}