import { Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { BlockType } from "./survey-builder"

type AddBlockProps = {
  addBlock: (type: BlockType, index?: number) => void
  index?: number
}


export default function AddBlock({ addBlock, index }: AddBlockProps) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground">
          <Plus size={18} />
          Add block
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

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

      </DropdownMenuContent>

    </DropdownMenu>
  )
}