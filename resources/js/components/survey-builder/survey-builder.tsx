"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"
import AddBlock from "./add-block"
import RadioQuestionBlock from "./radio-question-block"
import HeadingBlock from "./heading-block"
import SubheadingBlock from "./subheading-block"
import CheckboxQuestionBlock from "./checkbox-question-block"
import OpenEndedQuestionBlock from "./openended-question-block"
import InputBlock from "./input-block"
import SurveyPreview from "./survey-preview"

export type BlockType = "heading" | "subheading" | "radio" | "checkbox" | "openended" | "input"

export type Block = {
  id: string
  type: BlockType
  label?: string
  content?: string
  options?: string[]
  hasOther?: boolean
}

export default function SurveyBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])

  // Define which types count as questions for numbering
  const questionTypes = ["radio", "checkbox", "openended", "input"];

  function addBlock(type: BlockType, presetLabel?: string) {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      label: presetLabel || "",
      content: type === "input" ? "Contact Information" : presetLabel || "",
      options: type === "radio" || type === "checkbox" || type === "input"
        ? [presetLabel || "Option 1"]
        : [],
    };
    setBlocks([...blocks, newBlock]);
  }

  function updateBlock(id: string, newBlock: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? newBlock : b)));
  }

  // Helper to calculate the question number dynamically
  const getQuestionNumber = (index: number) => {
    return blocks
      .slice(0, index + 1)
      .filter((b) => questionTypes.includes(b.type)).length;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-16 items-start px-4">

      {/* LEFT COLUMN: BUILDER */}
      <div className="space-y-8 max-w-3xl ml-auto w-full">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Survey Editor
          </h2>
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {blocks.length} Total Blocks
          </span>
        </div>

        <div className="space-y-6">
          {blocks.map((block, index) => {
            const isQuestion = questionTypes.includes(block.type);
            const qNumber = isQuestion ? getQuestionNumber(index) : null;

            return (
              <div
                key={block.id}
                className="group border rounded-2xl p-6 pl-14 space-y-4 flex items-start justify-between relative bg-card shadow-sm border-border/60 hover:border-primary/30 transition-all"
              >
                {/* Question Badge (Only for Questions) */}
                {isQuestion && (
                  <div className="absolute left-4 top-7 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-[11px] font-bold font-mono border border-primary/20">
                    {String(qNumber).padStart(2, '0')}
                  </div>
                )}

                {/* Subtle Indicator for Layout Blocks */}
                {!isQuestion && (
                  <div className="absolute left-6 top-8 w-1 h-10 rounded-full bg-muted opacity-40" />
                )}

                <div className="flex-1">
                  {block.type === "heading" && <HeadingBlock block={block} updateBlock={updateBlock} />}
                  {block.type === "subheading" && <SubheadingBlock block={block} updateBlock={updateBlock} />}
                  {block.type === "radio" && <RadioQuestionBlock block={block} updateBlock={updateBlock} />}
                  {block.type === "checkbox" && <CheckboxQuestionBlock block={block} updateBlock={updateBlock} />}
                  {block.type === "openended" && <OpenEndedQuestionBlock block={block} updateBlock={updateBlock} />}
                  {block.type === "input" && <InputBlock block={block} updateBlock={updateBlock} />}
                </div>

                <div className="flex flex-col items-center ml-6 space-y-4 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    type="button"
                    onClick={() => setBlocks(blocks.filter((b) => b.id !== block.id))}
                    className="p-2.5 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <AddBlock
                    addBlock={(type) => {
                      const newBlock = {
                        id: crypto.randomUUID(),
                        type,
                        content: "",
                        options: type === "radio" || type === "checkbox" ? [""] : [],
                      };
                      const newBlocks = [...blocks];
                      newBlocks.splice(index + 1, 0, newBlock as Block);
                      setBlocks(newBlocks);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center py-10 border-2 border-dashed rounded-2xl border-muted bg-muted/10">
          <AddBlock addBlock={addBlock} />
        </div>
      </div>

      {/* RIGHT COLUMN: PREVIEW */}
      <div className="hidden xl:block sticky top-8">
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center w-full">
            Live Preview
          </h2>
        </div>

        <div className="relative border-[12px] border-muted rounded-[3.5rem] p-1 shadow-2xl bg-muted ring-1 ring-border">
          <div className="w-full aspect-[4/5] bg-background rounded-[2.8rem] p-10 overflow-y-auto custom-scrollbar border border-border">
            {blocks.length > 0 ? (
              <SurveyPreview blocks={blocks} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                <Plus size={48} className="text-muted-foreground" />
                <p className="text-sm font-medium">Build your survey to see it here</p>
              </div>
            )}
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  )
}