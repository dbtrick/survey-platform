import { Plus, Trash2, ListPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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
    const newOptions = block.options.filter((_: any, i: number) => i !== index)
    updateBlock(block.id, { ...block, options: newOptions })
  }

  function toggleOther() {
    updateBlock(block.id, { ...block, hasOther: !block.hasOther })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold text-muted-foreground uppercase">Radio Question</label>
        <Input
          className="text-lg font-semibold border-none px-0 focus-visible:ring-0"
          placeholder="e.g., Which department do you work in?"
          value={block.content}
          onChange={(e) => updateBlock(block.id, { ...block, content: e.target.value })}
        />
      </div>

      <div className="space-y-2 pl-4 border-l-2 border-primary/20">
        {block.options.map((option: string, index: number) => (
          <div key={index} className="flex items-center gap-2 group">
            <div className="h-4 w-4 rounded-full border border-primary/50" />
            <Input
              className="h-8 text-sm"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />

            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100" onClick={() => removeOption(index)}>
              <Trash2 size={14} />
            </Button>
          </div>
        ))}

        {/* Visual indicator for the 'Other' option if enabled */}
        {block.hasOther && (
          <div className="flex items-center gap-2 opacity-60">
            <div className="h-4 w-4 rounded-full border border-primary/50" />
            <div className="flex-1 text-sm italic py-1 border-b border-dashed">
              Other [Please Specify]
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="outline" size="sm" onClick={addOption} className="h-8">
            <Plus size={14} className="mr-1" /> Add Option
          </Button>

          <div className="flex items-center space-x-2">
            <Switch
              id={`other-${block.id}`}
              checked={block.hasOther || false}
              onCheckedChange={toggleOther}
            />
            <Label htmlFor={`other-${block.id}`} className="text-xs">Include "Other"</Label>
          </div>
        </div>
      </div>
    </div>
  )
}