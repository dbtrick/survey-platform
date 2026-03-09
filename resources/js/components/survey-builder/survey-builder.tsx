"use client"

import { useState } from "react"
import { Trash2, Plus, FilePlus, Layers, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

    // Logic: if index is -1, it goes to the end of the page.
    // Otherwise, it inserts after the specific block index on the current page.
    if (index === -1) {
      // Find last block of current page or just push to end
      const lastIndexOnPage = blocks.findLastIndex(b => b.page === activePage)
      const insertAt = lastIndexOnPage === -1 ? blocks.length : lastIndexOnPage + 1
      newBlocks.splice(insertAt, 0, newBlock)
    } else {
      const currentBlockId = currentPageBlocks[index].id
      const globalIndex = blocks.findIndex(b => b.id === currentBlockId)
      newBlocks.splice(globalIndex + 1, 0, newBlock)
    }

    setBlocks(newBlocks)
  }

  function updateBlock(id: string, newBlock: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? newBlock : b)))
  }

  function removeBlock(id: string) {
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  function deleteCurrentPage() {
    if (totalPages <= 1) return
    const remainingBlocks = blocks.filter((b) => b.page !== activePage)
    const reindexedBlocks = remainingBlocks.map((b) => {
      if (b.page > activePage) return { ...b, page: b.page - 1 }
      return b
    })
    setBlocks(reindexedBlocks)
    setTotalPages((prev) => prev - 1)
    setActivePage((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_550px] gap-10 items-start px-4">
      {/* BUILDER */}
      <div className="space-y-6 w-full">

        {/* PAGE NAV BAR */}
        <div className="flex items-center justify-between bg-card border rounded-2xl p-2 shadow-sm sticky top-0 z-30 backdrop-blur-md bg-card/80">
          <div className="flex items-center gap-2 overflow-x-auto p-1 no-scrollbar">
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

          <div className="flex items-center gap-2 px-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">
              Page {activePage} / {totalPages}
            </span>
            {totalPages > 1 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg">
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                      <AlertCircle size={20} />
                      <AlertDialogTitle>Delete Page {activePage}?</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                      This deletes this page and its {currentPageBlocks.length} blocks. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteCurrentPage} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="space-y-4 pb-20">
          {currentPageBlocks.length > 0 ? (
            currentPageBlocks.map((block, index) => {
              const qNumber = getGlobalQuestionNumber(block.id)
              const isQuestion = questionTypes.includes(block.type)

              return (
                <div key={block.id} className="group/block relative">
                  <div className="border rounded-2xl p-6 pl-14 pr-12 relative bg-card shadow-sm border-border/60 group-hover/block:border-primary/40 transition-all min-h-[100px] flex flex-col justify-center">
                    {isQuestion ? (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-[11px] font-bold border border-primary/20">
                        {String(qNumber).padStart(2, '0')}
                      </div>
                    ) : (
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-muted group-hover/block:bg-primary/20 transition-colors" />
                    )}

                    <div className="absolute right-3 top-3 opacity-0 group-hover/block:opacity-100 transition-all">
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

                  {/* HOVER INSERT (Between blocks) */}
                  <div className="flex justify-center opacity-0 group-hover/block:opacity-100 transition-all py-2 h-10 items-center">
                    <AddBlock addBlock={(type) => addBlockAt(type, index)} />
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-3xl bg-muted/5 border-muted/40 text-center">
              <Layers className="mb-2 opacity-20" />
              <p className="text-sm italic opacity-40">Page {activePage} is empty.</p>
            </div>
          )}

          {/* PERSISTENT ADD BUTTON (Bottom of page or for empty state) */}
          <div className="flex justify-center pt-4 border-t border-dashed mt-8">
            <AddBlock addBlock={(type) => addBlockAt(type, -1)} />
          </div>
        </div>
      </div>

      {/* PREVIEW */}
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