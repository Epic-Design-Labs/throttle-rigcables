"use client"

import { useState } from "react"
import { quickLengths, cables } from "@/lib/cable/data"
import { formatPrice } from "@/lib/cable/pricing"
import { cn } from "@/lib/utils"
import { Ruler } from "lucide-react"

interface Props {
  selected: number | null
  cableTypeId: string | null
  onSelect: (len: number) => void
}

export function LengthStep({ selected, cableTypeId, onSelect }: Props) {
  const [customValue, setCustomValue] = useState("")
  const [showCustom, setShowCustom] = useState(false)
  const cable = cables.find(c => c.id === cableTypeId)
  const pricePerFoot = cable?.pricePerFoot ?? 0
  const isCustom = selected !== null && !quickLengths.includes(selected)

  const handleCustomSubmit = () => {
    const val = parseFloat(customValue)
    if (val >= 0.5 && val <= 500) onSelect(val)
  }

  const handlePresetClick = (len: number) => {
    setShowCustom(false)
    setCustomValue("")
    onSelect(len)
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-bold tracking-tight mb-3">Set the length</h2>
        <p className="text-muted-foreground text-base">Standard lengths or custom in 0.5ft increments.</p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
        {quickLengths.map(len => (
          <button
            key={len}
            onClick={() => handlePresetClick(len)}
            className={cn(
              "flex flex-col items-center py-5 rounded-2xl font-mono transition-all",
              selected === len && !showCustom
                ? "bg-card ring-2 ring-primary shadow-lg shadow-black/10 text-foreground"
                : "bg-card shadow-sm shadow-black/5 text-foreground hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5",
            )}
          >
            <span className="text-2xl font-bold">{len}</span>
            <span className="text-sm text-muted-foreground mt-1">ft</span>
          </button>
        ))}
        <button
          onClick={() => setShowCustom(true)}
          className={cn(
            "flex flex-col items-center justify-center py-5 rounded-2xl transition-all",
            showCustom || isCustom
              ? "bg-card ring-2 ring-primary shadow-lg shadow-black/10 text-foreground"
              : "bg-card shadow-sm shadow-black/5 text-foreground hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5",
          )}
        >
          <Ruler className="w-6 h-6 mb-1" />
          <span className="text-sm font-semibold">Custom</span>
        </button>
      </div>

      {(showCustom || isCustom) && (
        <div>
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 block">Custom Length</label>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center rounded-2xl overflow-hidden transition-all bg-card flex-1 max-w-[220px]",
              isCustom ? "ring-2 ring-primary shadow-lg shadow-black/10" : "shadow-sm shadow-black/5",
            )}>
              <input
                type="number"
                min={0.5}
                max={500}
                step={0.5}
                value={customValue}
                onChange={e => setCustomValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleCustomSubmit()}
                placeholder="0.0"
                className="w-full bg-transparent px-4 py-3.5 text-base font-mono text-foreground outline-none placeholder:text-muted-foreground/30"
              />
              <span className="px-3 text-base text-muted-foreground">ft</span>
            </div>
            <button
              onClick={handleCustomSubmit}
              disabled={!customValue || parseFloat(customValue) < 0.5}
              className="px-5 py-3.5 text-base font-semibold rounded-xl bg-foreground text-background disabled:opacity-20 transition-all hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {selected && cable && (
        <div className="p-5 rounded-2xl bg-card shadow-sm shadow-black/5 flex items-center justify-between">
          <span className="text-base text-muted-foreground">{cable.name} × {selected}ft</span>
          <span className="font-mono text-foreground font-bold text-xl">
            {formatPrice(pricePerFoot * selected)}
          </span>
        </div>
      )}
    </div>
  )
}
