import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function OpenEndedQuestionBlock({ block, updateBlock }: any) {
  return (
    <div className="space-y-4">

      {/* Question Title */}
      <Input
        placeholder="Open ended question title"
        value={block.content}
        onChange={(e) =>
          updateBlock(block.id, {
            ...block,
            content: e.target.value,
          })
        }
      />

      {/* Answer Preview */}
      <Textarea
        placeholder="Respondent will type their answer here..."
        disabled
        className="resize-none"
      />

    </div>
  )
}