import { Input } from "@/components/ui/input"

export default function HeadingBlock({ block, updateBlock }: any) {
  return (
    <div>

      <Input
        className="text-xl font-bold"
        placeholder="Heading"
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