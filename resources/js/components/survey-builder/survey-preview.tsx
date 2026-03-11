"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

export default function SurveyPreview({ blocks, totalPages = 1 }: any) {
  const [currentViewPage, setCurrentViewPage] = useState(1)
  const [responses, setResponses] = useState<any>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Safety: sync current view page if total pages changes
  useEffect(() => {
    if (currentViewPage > totalPages) {
      setCurrentViewPage(totalPages > 0 ? totalPages : 1)
    }
  }, [totalPages, currentViewPage])

  const questionTypes = ["radio", "checkbox", "openended", "input", "grid"]
  const visibleBlocks = blocks.filter((b: any) => b.page === currentViewPage)

  const getGlobalQuestionNumber = (blockId: string) => {
    const allQs = blocks.filter((b: any) => questionTypes.includes(b.type))
    const idx = allQs.findIndex((b: any) => b.id === blockId)
    return idx !== -1 ? idx + 1 : null
  }

  // UPDATED: Generic response handler to keep logic clean
  const updateResponse = (blockId: string, value: any) => {
    setResponses((prev: any) => ({
      ...prev,
      [blockId]: value
    }))
  }

  const handleCheckboxChange = (blockId: string, option: string) => {
    const current = responses[blockId] || []
    const next = current.includes(option) ? current.filter((o: any) => o !== option) : [...current, option]
    updateResponse(blockId, next)
  }

  const onFinish = () => {
    console.log("SURVEY RESPONSES (FRONT-END ONLY):", responses)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
        <CheckCircle2 size={48} className="text-green-500" />
        <h2 className="text-2xl font-bold font-mono uppercase tracking-tighter">Preview Finished</h2>
        <p className="text-xs text-muted-foreground">Responses saved in browser console.</p>
        <Button variant="outline" className="rounded-xl font-bold" onClick={() => { setIsSubmitted(false); setCurrentViewPage(1); setResponses({}); }}>
          Restart Preview
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      {totalPages > 1 && (
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
            <span>Progress</span>
            <span>{Math.round((currentViewPage / totalPages) * 100)}%</span>
          </div>
          <Progress value={(currentViewPage / totalPages) * 100} className="h-1" />
        </div>
      )}

      <div className="flex-1 space-y-10 pb-12">
        {visibleBlocks.map((block: any) => {
          const isQ = questionTypes.includes(block.type)
          const qNum = getGlobalQuestionNumber(block.id)
          const currentVal = responses[block.id] || ""

          return (
            <div key={block.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {block.type === "heading" && <h1 className="text-2xl font-black">{block.content || "Untitled Page"}</h1>}
              {block.type === "subheading" && <p className="text-base text-muted-foreground leading-relaxed">{block.content || "Description text."}</p>}

              {isQ && (
                <div className="space-y-5">
                  <div className="flex gap-3 items-start">
                    <span className="text-primary font-bold pt-1">{qNum}.</span>
                    <p className="font-bold text-lg leading-snug">{block.content || "New Question?"}</p>
                  </div>

                  {/* RADIO (Fixed Persistence) */}
                  {block.type === "radio" && (
                    <RadioGroup
                      className="pl-7 space-y-3"
                      value={currentVal}
                      onValueChange={(v) => updateResponse(block.id, v)}
                    >
                      {block.options?.map((opt: string, i: number) => (
                        <div key={i} className="flex items-center space-x-3">
                          <RadioGroupItem value={opt} id={`p-${block.id}-${i}`} />
                          <label htmlFor={`p-${block.id}-${i}`} className="text-sm font-medium cursor-pointer">{opt}</label>
                        </div>
                      ))}
                      {block.hasOther && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="OTHER_VAL" id={`p-${block.id}-other`} />
                            <label htmlFor={`p-${block.id}-other`} className="text-sm font-medium italic opacity-70 cursor-pointer">Other...</label>
                          </div>
                          {currentVal === "OTHER_VAL" && (
                            <Input
                              className="ml-7 h-9 text-sm max-w-[200px]"
                              placeholder="Please specify"
                              value={responses[`${block.id}_other`] || ""}
                              onChange={(e) => updateResponse(`${block.id}_other`, e.target.value)}
                            />
                          )}
                        </div>
                      )}
                    </RadioGroup>
                  )}

                  {/* CHECKBOX (Fixed Persistence) */}
                  {block.type === "checkbox" && (
                    <div className="pl-7 space-y-3">
                      {block.options?.map((opt: string, i: number) => (
                        <div key={i} className="flex items-center space-x-3">
                          <Checkbox
                            id={`p-${block.id}-${i}`}
                            checked={(responses[block.id] || []).includes(opt)}
                            onCheckedChange={() => handleCheckboxChange(block.id, opt)}
                          />
                          <label htmlFor={`p-${block.id}-${i}`} className="text-sm font-medium cursor-pointer">{opt}</label>
                        </div>
                      ))}
                      {block.hasOther && (
                        <div className="space-y-3 pt-1">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`p-${block.id}-other`}
                              checked={(responses[block.id] || []).includes("OTHER_VAL")}
                              onCheckedChange={() => handleCheckboxChange(block.id, "OTHER_VAL")}
                            />
                            <label htmlFor={`p-${block.id}-other`} className="text-sm font-medium italic opacity-70 cursor-pointer">Other...</label>
                          </div>
                          {(responses[block.id] || []).includes("OTHER_VAL") && (
                            <Input
                              className="ml-7 h-9 text-sm max-w-[200px]"
                              placeholder="Please specify"
                              value={responses[`${block.id}_other`] || ""}
                              onChange={(e) => updateResponse(`${block.id}_other`, e.target.value)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* OPEN ENDED (Fixed Persistence) */}
                  {block.type === "openended" && (
                    <div className="pl-7">
                      <Textarea
                        className="min-h-[100px] rounded-xl resize-none"
                        placeholder="Your answer"
                        value={currentVal}
                        onChange={(e) => updateResponse(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {/* MULTI-INPUT (Fixed Persistence) */}
                  {block.type === "input" && (
                    <div className="pl-7 grid gap-4">
                      {block.options?.map((label: string, i: number) => (
                        <div key={i} className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase opacity-60 tracking-tighter">{label}</label>
                          <Input
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="h-9 rounded-lg"
                            value={responses[`${block.id}_${i}`] || ""}
                            onChange={(e) => updateResponse(`${block.id}_${i}`, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inside the visibleBlocks.map loop, add the Grid case: */}

                  {block.type === "grid" && (
                    <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
                      <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                          <tr>
                            <th className="text-left text-[10px] uppercase opacity-40 font-black px-2 pb-2">Item</th>
                            {block.options?.map((opt: string, i: number) => (
                              <th key={i} className="text-center text-[10px] uppercase opacity-40 font-black px-2 pb-2">
                                {opt}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows?.map((row: string, rowIndex: number) => (
                            <tr key={rowIndex} className="group">
                              <td className="bg-muted/20 rounded-l-xl px-4 py-3 text-sm font-medium border-y border-l transition-colors group-hover:bg-muted/40">
                                {row}
                              </td>
                              {block.options?.map((opt: string, colIndex: number) => (
                                <td key={colIndex} className="bg-muted/20 text-center py-3 border-y transition-colors group-hover:bg-muted/40 last:rounded-r-xl last:border-r">
                                  <input
                                    type="radio"
                                    name={`grid-${block.id}-${rowIndex}`}
                                    className="w-4 h-4 accent-primary cursor-pointer"
                                    checked={responses[`${block.id}_row_${rowIndex}`] === opt}
                                    onChange={() => updateResponse(`${block.id}_row_${rowIndex}`, opt)}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {block.hasOther && (
                        <div className="mt-4 pl-1">
                          <p className="text-[10px] font-bold uppercase opacity-50 mb-2">Other comments regarding these items:</p>
                          <Input
                            className="h-10 text-sm rounded-xl"
                            placeholder="Please specify..."
                            value={responses[`${block.id}_other`] || ""}
                            onChange={(e) => updateResponse(`${block.id}_other`, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-auto pt-6 border-t flex justify-between items-center bg-background/50 backdrop-blur-sm">
        <Button variant="ghost" size="sm" className="rounded-xl font-bold" disabled={currentViewPage === 1} onClick={() => setCurrentViewPage(currentViewPage - 1)}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        {currentViewPage < totalPages ? (
          <Button size="sm" className="rounded-xl px-6 font-bold" onClick={() => setCurrentViewPage(currentViewPage + 1)}>
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 font-bold" onClick={onFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  )
}