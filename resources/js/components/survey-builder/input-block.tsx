import { ChangeEvent } from "react"
import { Block } from "./survey-builder"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

type InputBlockProps = {
  block: Block
  updateBlock: (id: string, newBlock: Block) => void
}

export default function InputBlock({ block, updateBlock }: InputBlockProps) {
  // Updates the main section label
  const handleMainLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, { ...block, content: e.target.value })
  }

  // Updates a specific field label (e.g., changing "Option 1" to "Age")
  const updateOptionLabel = (index: number, value: string) => {
    const newOptions = [...(block.options || [])]
    newOptions[index] = value
    updateBlock(block.id, { ...block, options: newOptions })
  }

  const addField = () => {
    updateBlock(block.id, {
      ...block,
      options: [...(block.options || []), ""]
    })
  }

  const removeField = (index: number) => {
    const newOptions = block.options?.filter((_, i) => i !== index)
    updateBlock(block.id, { ...block, options: newOptions })
  }

  return (
    <div className="space-y-4 p-2">
      {/* Main Input Label */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-muted-foreground uppercase">Input Group Label</label>
        <Input
          placeholder="e.g., Personal Details"
          value={block.content || ""}
          onChange={handleMainLabelChange}
          className="font-semibold bg-secondary/20"
        />
      </div>

      {/* Dynamic Fields List */}
      <div className="space-y-3 pl-4 border-l-2 border-primary/30">
        <label className="text-xs font-medium text-muted-foreground">Fields</label>
        {block.options?.map((option, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Field Label (e.g., Name, Mobile)"
                value={option}
                onChange={(e) => updateOptionLabel(index, e.target.value)}
                className="h-8 text-sm"
              />
              {/* This represents the area the respondent will eventually type in */}
              <div className="h-9 w-full bg-muted/50 rounded-md border border-dashed flex items-center px-3 text-xs text-muted-foreground">
                Respondent input area
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="mt-1"
              onClick={() => removeField(index)}
              disabled={block.options!.length <= 1}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={addField}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" /> Add another field
        </Button>
      </div>
    </div>
  )
}