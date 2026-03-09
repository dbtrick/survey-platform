import { useState } from "react"
import AddBlock from "./add-block"
import RadioQuestionBlock from "./radio-question-block"
import HeadingBlock from "./heading-block"
import SubheadingBlock from "./subheading-block"
import CheckboxQuestionBlock from "./checkbox-question-block"
import OpenEndedQuestionBlock from "./openended-question-block"
import InputBlock from "./input-block"
import SurveyPreview from "./survey-preview"
import { Trash2, Plus } from "lucide-react"

export type BlockType = "heading" | "subheading" | "radio" | "checkbox" | "openended" | "input"

export type Block = {
  id: string
  type: BlockType
  label?: string
  content?: string
  options?: string[]
  hasOther?: boolean // Added for the radio/checkbox "Other" feature
}

export default function SurveyBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])

  function addBlock(type: BlockType, presetLabel?: string) {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      label: presetLabel || "",
      content: type === "input" ? "Contact Information" : presetLabel || "",
      options: type === "radio" || type === "checkbox" || type === "input"
        ? [presetLabel || "Option 1"]
        : [],
    }
    setBlocks([...blocks, newBlock])
  }

  function updateBlock(id: string, newBlock: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? newBlock : b)))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

      {/* LEFT COLUMN: BUILDER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Builder</h2>
          <span className="text-xs text-muted-foreground">{blocks.length} Blocks</span>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="group border rounded-lg p-4 pl-8 space-y-4 flex items-start justify-between relative bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 space-y-2">
                {block.type === "heading" && <HeadingBlock block={block} updateBlock={updateBlock} />}
                {block.type === "subheading" && <SubheadingBlock block={block} updateBlock={updateBlock} />}
                {block.type === "radio" && <RadioQuestionBlock block={block} updateBlock={updateBlock} />}
                {block.type === "checkbox" && <CheckboxQuestionBlock block={block} updateBlock={updateBlock} />}
                {block.type === "openended" && <OpenEndedQuestionBlock block={block} updateBlock={updateBlock} />}
                {block.type === "input" && <InputBlock block={block} updateBlock={updateBlock} />}
              </div>

              <div className="flex flex-col items-center ml-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setBlocks(blocks.filter((b) => b.id !== block.id))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  title="Delete Block"
                >
                  <Trash2 size={18} />
                </button>
                <AddBlock
                  addBlock={(type) => {
                    const newBlock = {
                      id: crypto.randomUUID(),
                      type,
                      content: "",
                      options: type === "radio" || type === "checkbox" ? [""] : [],
                    }
                    const newBlocks = [...blocks]
                    newBlocks.splice(index + 1, 0, newBlock)
                    setBlocks(newBlocks)
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-dashed">
          <AddBlock addBlock={addBlock} />
        </div>
      </div>

      {/* RIGHT COLUMN: PREVIEW (Sticky) */}
      <div className="lg:sticky lg:top-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</h2>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Device View</span>
        </div>

        <div className="border-4 border-muted rounded-[2rem] p-6 min-h-[600px] bg-white shadow-2xl overflow-y-auto max-h-[85vh]">
          {blocks.length > 0 ? (
            <SurveyPreview blocks={blocks} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-50 py-20">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                <Plus size={20} />
              </div>
              <p>Add a block to start previewing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}