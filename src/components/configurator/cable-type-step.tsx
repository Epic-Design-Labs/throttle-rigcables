"use client"

import { cables } from "@/lib/cable/data"
import { CableCrossSection, FlexDots } from "./illustrations"
import { cn } from "@/lib/utils"

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

export function CableTypeStep({ selected, onSelect }: Props) {
  const rgCables = cables.filter(c => c.category === "RG")
  const lmrCables = cables.filter(c => c.category === "LMR")

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-bold tracking-tight mb-3">Choose your cable</h2>
        <p className="text-muted-foreground text-base">Loss per 100ft at HF (30 MHz) / UHF (450 MHz).</p>
      </div>
      <CableGroup label="RG Series" cables={rgCables} selected={selected} onSelect={onSelect} />
      <CableGroup label="LMR Series" cables={lmrCables} selected={selected} onSelect={onSelect} />
    </div>
  )
}

function CableGroup({ label, cables: items, selected, onSelect }: { label: string } & Props & { cables: typeof cables }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(cable => {
          const isSelected = selected === cable.id
          return (
            <button
              key={cable.id}
              onClick={() => onSelect(cable.id)}
              className={cn(
                "group relative flex flex-col rounded-2xl transition-all text-left overflow-hidden",
                isSelected
                  ? "bg-card ring-2 ring-primary shadow-lg shadow-black/10"
                  : "bg-card shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5",
              )}
            >
              <div className="relative bg-gradient-to-br from-secondary to-accent p-6 flex items-center justify-center">
                <CableCrossSection odInches={cable.odInches} className="w-24 h-24" />
                <div className="absolute top-3 right-3 text-right">
                  <div className="font-mono font-bold text-xl text-foreground">${cable.pricePerFoot.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground font-medium">/ft</div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-foreground text-lg">{cable.name}</span>
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">{cable.impedance}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cable.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono">{cable.outerDiameter}</span>
                  <div className="flex items-center gap-1">
                    <FlexDots rating={cable.flex} />
                    <span>{cable.flex}</span>
                  </div>
                  <span className="font-mono">{cable.lossHF}dB HF</span>
                  <span className="font-mono">{cable.lossUHF}dB UHF</span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <svg className="w-3.5 h-3.5 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
