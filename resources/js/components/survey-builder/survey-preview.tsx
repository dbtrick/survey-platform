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
          return (
            <div key={block.id} className="space-y-3">

              <p className="font-medium">{block.content}</p>

              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange(block.id, value)
                }
              >

                {block.options.map((option: string, index: number) => (

                  <div
                    key={index}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`${block.id}-${index}`}
                    />

                    <label htmlFor={`${block.id}-${index}`}>
                      {option}
                    </label>
                  </div>

                ))}

              </RadioGroup>

            </div>
          )
        }

        if (block.type === "checkbox") {
          return (
            <div key={block.id} className="space-y-3">

              <p className="font-medium">{block.content}</p>

              {block.options.map((option: string, index: number) => (

                <div
                  key={index}
                  className="flex items-center space-x-2"
                >

                  <Checkbox
                    id={`${block.id}-${index}`}
                    checked={(responses[block.id] || []).includes(option)}
                    onCheckedChange={() =>
                      handleCheckboxChange(block.id, option)
                    }
                  />

                  <label htmlFor={`${block.id}-${index}`}>
                    {option}
                  </label>

                </div>

              ))}

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