import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RadioQuestionBlock({ block, updateBlock }: any) {

  function updateOption(index: number, value: string) {
    const newOptions = [...block.options]
    newOptions[index] = value
    updateBlock(block.id, { ...block, options: newOptions })
  }

  function addOption() {
    updateBlock(block.id, { ...block, options: [...block.options, ""] })
  }

  function removeOption(index: number) {
    const newOptions = [...block.options]
    newOptions.splice(index, 1)
    updateBlock(block.id, { ...block, options: newOptions })
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Input
        placeholder="Radio question title"
        value={block.content}
        onChange={(e) => updateBlock(block.id, { ...block, content: e.target.value })}
      />

      <div className="space-y-2">
        {block.options.map((option: string, index: number) => (
          <div key={index} className="flex items-center gap-2">

            <input type="radio" disabled />

            <Input
              placeholder="Option text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />

            {/* Add new option only on last option */}
            {index === block.options.length - 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={addOption}>
                <Plus size={16} />
              </Button>
            )}

            {/* Remove button for every option (if more than 1) */}
            {block.options.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)}>
                <Trash2 size={16} />
              </Button>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}