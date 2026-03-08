import { useState } from "react"
import AddBlock from "./add-block"
import RadioQuestionBlock from "./radio-question-block"
import HeadingBlock from "./heading-block"
import SubheadingBlock from "./subheading-block"
import CheckboxQuestionBlock from "./checkbox-question-block"
import OpenEndedQuestionBlock from "./openended-question-block"
import { Button } from "@/components/ui/button"
import SurveyPreview from "./survey-preview"

export type BlockType =
  | "heading"
  | "subheading"
  | "radio"
  | "checkbox"
  | "openended"

export type Block = {
  id: string
  type: BlockType
  content?: string
  options?: string[]
}


export default function SurveyBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [responses, setResponses] = useState<any>({})

  function addBlock(type: BlockType) {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content: "",
      options: type === "radio" || type === "checkbox" ? [""] : [],
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
          {blocks.map((block) => {

            if (block.type === "heading") {
              return (
                <HeadingBlock
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                />
              )
            }

            if (block.type === "subheading") {
              return (
                <SubheadingBlock
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                />
              )
            }

            if (block.type === "radio") {
              return (
                <RadioQuestionBlock
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                />
              )
            }

            if (block.type === "checkbox") {
              return (
                <CheckboxQuestionBlock
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                />
              )
            }

            if (block.type === "openended") {
              return (
                <OpenEndedQuestionBlock
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                />
              )
            }

            return null
          })}

          <AddBlock addBlock={addBlock} />
        </>
      )}





    </div>
  )
}