import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function SurveyPreview({ blocks }: any) {
  const [responses, setResponses] = useState<any>({})

  function handleRadioChange(blockId: string, value: string) {
    setResponses({
      ...responses,
      [blockId]: value,
    })
  }

  function handleCheckboxChange(blockId: string, option: string) {
    const current = responses[blockId] || []

    if (current.includes(option)) {
      setResponses({
        ...responses,
        [blockId]: current.filter((o: string) => o !== option),
      })
    } else {
      setResponses({
        ...responses,
        [blockId]: [...current, option],
      })
    }
  }

  return (
    <div className="space-y-6">

      {blocks.map((block: any) => {

        if (block.type === "heading") {
          return (
            <h1 key={block.id} className="text-2xl font-bold">
              {block.content}
            </h1>
          )
        }

        if (block.type === "subheading") {
          return (
            <p key={block.id} className="text-muted-foreground">
              {block.content}
            </p>
          )
        }

        if (block.type === "radio") {
          const selectedValue = responses[block.id]
          const isOtherSelected = selectedValue === "OTHER_OPTION_SELECTED"

          return (
            <div key={block.id} className="space-y-3">
              <p className="font-medium">{block.content}</p>

              <RadioGroup
                onValueChange={(value) => handleRadioChange(block.id, value)}
                value={selectedValue}
              >
                {block.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${block.id}-${index}`} />
                    <label htmlFor={`${block.id}-${index}`} className="text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}

                {/* Render the 'Other' radio if researcher enabled it */}
                {block.hasOther && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="OTHER_OPTION_SELECTED" id={`${block.id}-other`} />
                      <label htmlFor={`${block.id}-other`} className="text-sm font-medium">
                        Other [Please Specify]
                      </label>
                    </div>

                    {/* Show text input only if 'Other' is selected */}
                    {isOtherSelected && (
                      <div className="pl-6 animate-in slide-in-from-top-1 duration-200">
                        <Input
                          placeholder="Please specify..."
                          className="h-8 text-sm"
                          onChange={(e) =>
                            setResponses({
                              ...responses,
                              [`${block.id}_other_text`]: e.target.value
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup>
            </div>
          )
        }

        // Find the block.type === "checkbox" section and replace it with this:

        if (block.type === "checkbox") {
          const currentSelections = responses[block.id] || []
          const isOtherChecked = currentSelections.includes("OTHER_OPTION_SELECTED")

          return (
            <div key={block.id} className="space-y-3">
              <p className="font-medium">{block.content}</p>

              <div className="space-y-2">
                {block.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${block.id}-${index}`}
                      checked={currentSelections.includes(option)}
                      onCheckedChange={() => handleCheckboxChange(block.id, option)}
                    />
                    <label htmlFor={`${block.id}-${index}`} className="text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}

                {/* Render the 'Other' checkbox if enabled */}
                {block.hasOther && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${block.id}-other`}
                        checked={isOtherChecked}
                        onCheckedChange={() => handleCheckboxChange(block.id, "OTHER_OPTION_SELECTED")}
                      />
                      <label htmlFor={`${block.id}-other`} className="text-sm font-medium">
                        Other [Please Specify]
                      </label>
                    </div>

                    {/* Show text input if 'Other' checkbox is checked */}
                    {isOtherChecked && (
                      <div className="pl-6 animate-in slide-in-from-top-1 duration-200">
                        <Input
                          placeholder="Please specify..."
                          className="h-8 text-sm"
                          value={responses[`${block.id}_other_text`] || ""}
                          onChange={(e) =>
                            setResponses({
                              ...responses,
                              [`${block.id}_other_text`]: e.target.value
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        }

        if (block.type === "openended") {
          return (
            <div key={block.id} className="space-y-2">

              <p className="font-medium">{block.content}</p>

              <Textarea
                placeholder="Type your answer..."
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [block.id]: e.target.value,
                  })
                }
              />

            </div>
          )
        }

        // Inside the blocks.map, replace the 'input' block condition:

        if (block.type === "input") {
          return (
            <div key={block.id} className="space-y-4 border p-4 rounded-lg bg-card">
              {block.content && <h3 className="font-bold text-lg">{block.content}</h3>}

              <div className="grid gap-4">
                {block.options?.map((optionLabel: string, index: number) => (
                  <div key={index} className="space-y-1.5">
                    <label className="font-medium text-sm">
                      {optionLabel || `Field ${index + 1}`}
                    </label>
                    <Input
                      type="text"
                      placeholder={`Enter ${optionLabel.toLowerCase() || "response"}...`}
                      // Store responses using a unique key per field
                      onChange={(e) =>
                        setResponses({
                          ...responses,
                          [`${block.id}_field_${index}`]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        }

      })}

    </div>
  )
}