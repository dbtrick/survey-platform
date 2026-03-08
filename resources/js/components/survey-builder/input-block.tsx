import { ChangeEvent } from "react"
import { Block } from "./survey-builder"
import { Input } from "@/components/ui/input"

type InputBlockProps = {
  block: Block
  updateBlock: (id: string, newBlock: Block) => void
}

export default function InputBlock({ block, updateBlock }: InputBlockProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, { ...block, content: e.target.value })
  }

  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">{block.label}</label>
      <Input
        type="text"
        placeholder={`Enter ${block.label || "value"}`}
        value={block.content || ""}
        onChange={handleChange}
      />
    </div>
  )
}