import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxQuestionBlock({ block, updateBlock }: any) {

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
    <div className="space-y-4">
      <Input
        placeholder="Checkbox question title"
        value={block.content}
        onChange={(e) => updateBlock(block.id, { ...block, content: e.target.value })}
      />

      <div className="space-y-2">
        {block.options.map((option: string, index: number) => (
          <div key={index} className="flex items-center gap-2">

            <Checkbox disabled checked={false} />

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