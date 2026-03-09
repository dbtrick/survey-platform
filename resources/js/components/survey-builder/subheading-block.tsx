import { Input } from "@/components/ui/input"

export default function SubheadingBlock({ block, updateBlock }: any) {
  return (
    <div>

      <Input
        className="text-muted-foreground"
        placeholder="Subheading"
        value={block.content}
        onChange={(e) =>
          updateBlock(block.id, {
            ...block,
            content: e.target.value,
          })
        }
      />

    </div>
  )
}