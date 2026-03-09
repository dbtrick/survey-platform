"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function SurveyPreview({ blocks }: any) {
  const [responses, setResponses] = useState<any>({});
  const questionTypes = ["radio", "checkbox", "openended", "input"];

  function handleRadioChange(blockId: string, value: string) {
    setResponses({ ...responses, [blockId]: value });
  }

  function handleCheckboxChange(blockId: string, option: string) {
    const current = responses[blockId] || [];
    const nextValue = current.includes(option)
      ? current.filter((o: string) => o !== option)
      : [...current, option];
    setResponses({ ...responses, [blockId]: nextValue });
  }

  return (
    <div className="space-y-10">
      {blocks.map((block: any, index: number) => {
        const isQuestion = questionTypes.includes(block.type);
        const qNumber = blocks
          .slice(0, index + 1)
          .filter((b: any) => questionTypes.includes(b.type)).length;

        const currentSelections = responses[block.id] || [];
        const isOtherChecked = currentSelections.includes("OTHER_OPTION_SELECTED");

        return (
          <div key={block.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Heading & Subheading */}
            {block.type === "heading" && (
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{block.content}</h1>
            )}
            {block.type === "subheading" && (
              <p className="text-lg text-muted-foreground leading-relaxed">{block.content}</p>
            )}

            {/* Questions */}
            {isQuestion && (
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg leading-none pt-1">{qNumber}.</span>
                  <p className="font-semibold text-lg text-foreground leading-tight">{block.content}</p>
                </div>

                {/* --- RADIO TYPE --- */}
                {block.type === "radio" && (
                  <RadioGroup
                    onValueChange={(val) => handleRadioChange(block.id, val)}
                    value={responses[block.id]}
                    className="pl-7 space-y-3"
                  >
                    {block.options?.map((opt: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3">
                        <RadioGroupItem value={opt} id={`${block.id}-${i}`} />
                        <label htmlFor={`${block.id}-${i}`} className="text-sm font-medium cursor-pointer">{opt}</label>
                      </div>
                    ))}
                    {block.hasOther && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="OTHER_SELECTED" id={`${block.id}-other`} />
                          <label htmlFor={`${block.id}-other`} className="text-sm font-medium italic cursor-pointer text-muted-foreground">Other [Please Specify]</label>
                        </div>
                        {responses[block.id] === "OTHER_SELECTED" && (
                          <Input className="ml-7 h-9 text-sm max-w-sm" placeholder="Please specify..." />
                        )}
                      </div>
                    )}
                  </RadioGroup>
                )}

                {/* --- CHECKBOX TYPE (FIXED) --- */}
                {block.type === "checkbox" && (
                  <div className="pl-7 space-y-3">
                    {block.options?.map((opt: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Checkbox
                          id={`${block.id}-${i}`}
                          checked={currentSelections.includes(opt)}
                          onCheckedChange={() => handleCheckboxChange(block.id, opt)}
                        />
                        <label htmlFor={`${block.id}-${i}`} className="text-sm font-medium cursor-pointer">{opt}</label>
                      </div>
                    ))}

                    {/* The Fixed Other Logic for Checkbox */}
                    {block.hasOther && (
                      <div className="space-y-3 pt-1">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`${block.id}-other`}
                            checked={isOtherChecked}
                            onCheckedChange={() => handleCheckboxChange(block.id, "OTHER_OPTION_SELECTED")}
                          />
                          <label htmlFor={`${block.id}-other`} className="text-sm font-medium italic cursor-pointer text-muted-foreground">
                            Other [Please Specify]
                          </label>
                        </div>
                        {isOtherChecked && (
                          <div className="pl-7 animate-in slide-in-from-top-1 duration-200">
                            <Input
                              className="h-9 text-sm max-w-sm"
                              placeholder="Please specify..."
                              value={responses[`${block.id}_other_text`] || ""}
                              onChange={(e) => setResponses({
                                ...responses,
                                [`${block.id}_other_text`]: e.target.value
                              })}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* --- OPEN ENDED TYPE --- */}
                {block.type === "openended" && (
                  <div className="pl-7">
                    <Textarea placeholder="Type your answer here..." className="min-h-[100px] resize-none" />
                  </div>
                )}

                {/* --- INPUT TYPE --- */}
                {block.type === "input" && (
                  <div className="pl-7 grid gap-4">
                    {block.options?.map((label: string, i: number) => (
                      <div key={i} className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">{label}</label>
                        <Input placeholder={`Enter ${label.toLowerCase()}...`} className="max-w-md" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}