import { useState } from "react"
import AddBlock from "./add-block"
import RadioQuestionBlock from "./radio-question-block"
import HeadingBlock from "./heading-block"
import SubheadingBlock from "./subheading-block"
import CheckboxQuestionBlock from "./checkbox-question-block"
import OpenEndedQuestionBlock from "./openended-question-block"
import InputBlock from "./input-block"
import { Button } from "@/components/ui/button"
import SurveyPreview from "./survey-preview"
import { Trash2, Plus } from "lucide-react"

export type BlockType =
  | "heading"
  | "subheading"
  | "radio"
  | "checkbox"
  | "openended"
  | "input"

export type Block = {
  id: string
  type: BlockType
  label?: string
  content?: string
  options?: string[]
}


export default function SurveyBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [responses, setResponses] = useState<any>({})

  function addBlock(type: BlockType, presetLabel?: string) {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      label: presetLabel || "",
      content: type === "input" ? "Contact Information" : presetLabel || "",
      options: type === "radio" || type === "checkbox" || type === "input"
        ? [presetLabel || "Full Name"]
        : [],
    }
    setBlocks([...blocks, newBlock])
  }

  function updateBlock(id: string, newBlock: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? newBlock : b)))
  }

  return (

    <div className="space-y-6">
      <div className="flex gap-2 mb-6">
        <Button
          variant={!previewMode ? "default" : "outline"}
          onClick={() => setPreviewMode(false)}
        >
          Builder
        </Button>

        <Button
          variant={previewMode ? "default" : "outline"}
          onClick={() => setPreviewMode(true)}
        >
          Preview
        </Button>
      </div>

      {previewMode ? (
        <SurveyPreview blocks={blocks} />
      ) : (
        <>

          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="border rounded-lg p-4 pl-8 space-y-4 flex items-start justify-between relative"
            >
              {/* Block content */}
              <div className="flex-1 space-y-2">
                {block.type === "heading" && (
                  <HeadingBlock block={block} updateBlock={updateBlock} />
                )}
                {block.type === "subheading" && (
                  <SubheadingBlock block={block} updateBlock={updateBlock} />
                )}
                {block.type === "radio" && (
                  <RadioQuestionBlock block={block} updateBlock={updateBlock} />
                )}
                {block.type === "checkbox" && (
                  <CheckboxQuestionBlock block={block} updateBlock={updateBlock} />
                )}
                {block.type === "openended" && (
                  <OpenEndedQuestionBlock block={block} updateBlock={updateBlock} />
                )}
                {block.type === "input" && (
                  <InputBlock block={block} updateBlock={updateBlock} />
                )}
              </div>

              {/* Trash + Add buttons */}
              <div className="flex flex-col items-center ml-4 space-y-2">
                {/* Delete block */}
                <button
                  type="button"
                  onClick={() => setBlocks(blocks.filter((b) => b.id !== block.id))}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                  title="Delete Block"
                >
                  <Trash2 size={18} />
                  <span className="text-sm font-medium">Delete block</span>
                </button>

                {/* Add block below delete */}
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

          <AddBlock addBlock={addBlock} />
        </>
      )}





    </div>
  )
}