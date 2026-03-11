import { Plus, Heading, Type, Radio, CheckSquare, LayoutGrid, TextCursorInput, AlignLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type { BlockType } from "./survey-builder"

type AddBlockProps = {
  addBlock: (type: BlockType, presetLabel?: string) => void
}

export default function AddBlock({ addBlock }: AddBlockProps) {
  const menuItems = [
    { type: "heading", label: "Heading", icon: Heading },
    { type: "subheading", label: "Subheading", icon: AlignLeft },
    { type: "radio", label: "Radio Question", icon: Radio },
    { type: "checkbox", label: "Checkbox Question", icon: CheckSquare },
    { type: "grid", label: "Grid / Matrix", icon: LayoutGrid }, // NEW GRID OPTION
    { type: "openended", label: "Open Ended", icon: Type },
    { type: "input", label: "Input", icon: TextCursorInput },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-xl hover:bg-muted/50">
          <Plus size={18} />
          <span className="text-sm font-medium">Add block</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[200px] rounded-xl p-2 shadow-lg">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.type}
            onClick={() => addBlock(item.type as BlockType)}
            className="flex items-center gap-3 rounded-lg cursor-pointer py-2"
          >
            <item.icon size={16} className="opacity-60" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}