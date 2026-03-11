"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X, ListTree, Columns } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function GridQuestionBlock({ block, updateBlock }: any) {
  const updateArr = (key: 'options' | 'rows', index: number, val: string) => {
    const newArr = [...(block[key] || [])]
    newArr[index] = val
    updateBlock(block.id, { ...block, [key]: newArr })
  }

  const addArrItem = (key: 'options' | 'rows') => {
    const newArr = [...(block[key] || []), `${key === 'options' ? 'Column' : 'Row'} ${block[key].length + 1}`]
    updateBlock(block.id, { ...block, [key]: newArr })
  }

  const removeArrItem = (key: 'options' | 'rows', index: number) => {
    const newArr = block[key].filter((_: any, i: number) => i !== index)
    updateBlock(block.id, { ...block, [key]: newArr })
  }

  return (
    <div className="space-y-6">
      <Input
        placeholder="Enter Grid/Matrix Question (e.g., Please rate your experience)"
        value={block.content}
        onChange={(e) => updateBlock(block.id, { ...block, content: e.target.value })}
        className="text-lg font-bold border-none px-0 focus-visible:ring-0 placeholder:opacity-30"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLUMNS (The Scale) */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-dashed">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">
            <Columns size={12} /> Columns (Scale)
          </div>
          {block.options?.map((opt: string, i: number) => (
            <div key={i} className="flex items-center gap-2 group">
              <Input
                value={opt}
                onChange={(e) => updateArr('options', i, e.target.value)}
                className="h-8 text-sm bg-background"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => removeArrItem('options', i)}>
                <X size={14} />
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full text-xs h-8 border-dashed border mt-2" onClick={() => addArrItem('options')}>
            <Plus size={12} className="mr-1" /> Add Column
          </Button>
        </div>

        {/* ROWS (The Items) */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-dashed">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">
            <ListTree size={12} /> Rows (Items)
          </div>
          {block.rows?.map((row: string, i: number) => (
            <div key={i} className="flex items-center gap-2 group">
              <Input
                value={row}
                onChange={(e) => updateArr('rows', i, e.target.value)}
                className="h-8 text-sm bg-background"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => removeArrItem('rows', i)}>
                <X size={14} />
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full text-xs h-8 border-dashed border mt-2" onClick={() => addArrItem('rows')}>
            <Plus size={12} className="mr-1" /> Add Row
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="other-mode"
          checked={block.hasOther}
          onCheckedChange={(v) => updateBlock(block.id, { ...block, hasOther: v })}
        />
        <Label htmlFor="other-mode" className="text-xs font-medium opacity-60 italic">Include "Other" text input?</Label>
      </div>
    </div>
  )
}