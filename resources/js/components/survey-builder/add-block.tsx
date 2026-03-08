import { Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import type { BlockType } from "./survey-builder"

type AddBlockProps = {
  addBlock: (type: BlockType, presetLabel?: string) => void
}

export default function AddBlock({ addBlock }: AddBlockProps) {
  const inputPresets = ["Name", "Age", "Address", "Postcode", "Mobile Number"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground">
          <Plus size={18} />
          Add block
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuItem onClick={() => addBlock("heading")}>
          Heading
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => addBlock("subheading")}>
          Subheading
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => addBlock("radio")}>
          Radio Question
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => addBlock("checkbox")}>
          Checkbox Question
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => addBlock("openended")}>
          Open Ended
        </DropdownMenuItem>

        {/* Input Field with presets */}
        <DropdownMenuLabel className="text-xs text-muted-foreground mt-2">
          Input Fields
        </DropdownMenuLabel>

        {inputPresets.map((preset) => (
          <DropdownMenuItem
            key={preset}
            onClick={() => addBlock("input", preset)}
          >
            {preset}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}