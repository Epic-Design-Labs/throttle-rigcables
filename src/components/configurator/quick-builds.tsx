"use client"

import { useState } from "react"
import { presets } from "@/lib/cable/data"
import type { CableConfig } from "@/lib/cable/types"
import { Zap, X } from "lucide-react"

interface Props {
  onSelect: (config: CableConfig) => void
}

export function QuickBuilds({ onSelect }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
      >
        <Zap className="w-3.5 h-3.5" />
        Quick Builds
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-80 rounded-xl bg-card shadow-lg border border-border z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Presets</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {presets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { onSelect(preset.config); setOpen(false) }}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
                >
                  <div className="text-sm font-medium text-foreground">{preset.name}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
