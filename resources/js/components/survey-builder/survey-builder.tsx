"use client"

import { useState } from "react"
import { Trash2, Plus, FilePlus, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  page: number
  label?: string
  content?: string
  options?: string[]
  hasOther?: boolean
}

export default function SurveyBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const questionTypes = ["radio", "checkbox", "openended", "input"]
  const currentPageBlocks = blocks.filter((b) => b.page === activePage)

  const getGlobalQuestionNumber = (blockId: string) => {
    const allQuestionBlocks = blocks.filter((b) => questionTypes.includes(b.type))
    const index = allQuestionBlocks.findIndex((b) => b.id === blockId)
    return index !== -1 ? index + 1 : null
  }

  function addBlockAt(type: BlockType, index: number) {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      page: activePage,
      content: "",
      options: ["radio", "checkbox", "input"].includes(type) ? ["Option 1"] : [],
      hasOther: false
    }
    const newBlocks = [...blocks]
    const currentBlockOnPage = currentPageBlocks[index]
    const globalIndex = currentBlockOnPage
      ? blocks.findIndex(b => b.id === currentBlockOnPage.id) + 1
      : blocks.length

    newBlocks.splice(globalIndex, 0, newBlock)
    setBlocks(newBlocks)
  }

  function updateBlock(id: string, newBlock: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? newBlock : b)))
  }

  function removeBlock(id: string) {
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_550px] gap-10 items-start px-4">
      {/* BUILDER SECTION */}
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between bg-card border rounded-2xl p-2 shadow-sm sticky top-0 z-20 backdrop-blur-md bg-card/80">
          <div className="flex items-center gap-2 overflow-x-auto p-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={activePage === i + 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => setActivePage(i + 1)}
                className="h-8 px-4 rounded-xl font-bold"
              >
                P{i + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => { setTotalPages(t => t + 1); setActivePage(totalPages + 1); }} className="h-8 w-8 rounded-xl border-dashed">
              <Plus size={14} />
            </Button>
          </div>
          <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-4 opacity-60">
            Page {activePage} of {totalPages}
          </div>
        </div>

        <div className="space-y-4">
          {currentPageBlocks.length > 0 ? (
            currentPageBlocks.map((block, index) => {
              const qNumber = getGlobalQuestionNumber(block.id)
              const isQuestion = questionTypes.includes(block.type)

              return (
                <div key={block.id} className="space-y-2 group">
                  <div className="border rounded-2xl p-6 pl-14 pr-12 relative bg-card shadow-sm border-border/60 hover:border-primary/40 transition-all min-h-[100px] flex flex-col justify-center">
                    {isQuestion ? (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-[11px] font-bold border border-primary/20">
                        {String(qNumber).padStart(2, '0')}
                      </div>
                    ) : (
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-muted group-hover:bg-primary/20 transition-colors" />
                    )}
                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeBlock(block.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="w-full">
                      {block.type === "heading" && <HeadingBlock block={block} updateBlock={updateBlock} />}
                      {block.type === "subheading" && <SubheadingBlock block={block} updateBlock={updateBlock} />}
                      {block.type === "radio" && <RadioQuestionBlock block={block} updateBlock={updateBlock} />}
                      {block.type === "checkbox" && <CheckboxQuestionBlock block={block} updateBlock={updateBlock} />}
                      {block.type === "openended" && <OpenEndedQuestionBlock block={block} updateBlock={updateBlock} />}
                      {block.type === "input" && <InputBlock block={block} updateBlock={updateBlock} />}
                    </div>
                  </div>
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-all py-1">
                    <AddBlock addBlock={(type) => addBlockAt(type, index)} />
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-3xl bg-muted/5 border-muted/40 text-center opacity-40">
              <Layers className="mb-2" />
              <p className="text-sm italic">Empty page.</p>
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW SECTION */}
      <div className="hidden xl:block sticky top-8">
        <div className="relative border-[10px] border-muted rounded-[3rem] p-1 shadow-2xl bg-muted ring-1 ring-border">
          <div className="w-full aspect-[9/13] bg-background rounded-[2.5rem] p-8 overflow-y-auto border border-border">
            <SurveyPreview blocks={blocks} totalPages={totalPages} />
          </div>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-12 h-3 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  )
}