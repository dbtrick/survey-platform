import { Input } from "@/components/ui/input"

export default function SubheadingBlock({ block, updateBlock }: any) {
  return (
    <div className="border rounded-lg p-4">

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