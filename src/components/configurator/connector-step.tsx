"use client"

import { useState } from "react"
import { connectors, connectorGroups, brands, LABEL_PRICE } from "@/lib/cable/data"
import { ConnectorPlaceholderImage } from "./illustrations"
import { getConnectorPrice, formatPrice } from "@/lib/cable/pricing"
import type { BrandId, ConnectorGroup } from "@/lib/cable/types"
import { cn } from "@/lib/utils"
import { Shield, Star, Award, Tag, CircleSlash } from "lucide-react"

interface Props {
  side: "A" | "B"
  selectedConnector: string | null
  selectedBrand: BrandId | null
  label: string
  onSelectConnector: (id: string) => void
  onSelectBrand: (id: BrandId) => void
  onLabelChange: (label: string) => void
}

export function ConnectorStep({ side, selectedConnector, selectedBrand, label, onSelectConnector, onSelectBrand, onLabelChange }: Props) {
  const [filter, setFilter] = useState<ConnectorGroup | "All">("All")
  const filtered = filter === "All" ? connectors.filter(c => c.id !== "BARE") : connectors.filter(c => c.group === filter)
  const needsBrand = selectedConnector && selectedConnector !== "BARE"
  const endNum = side === "A" ? "1" : "2"
  const isComplete = !!selectedConnector && (selectedConnector === "BARE" || !!selectedBrand)
  const isBare = selectedConnector === "BARE"

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight mb-3">End {endNum}</h2>
        <p className="text-muted-foreground text-base">Choose the connector type, then select a quality tier.</p>
      </div>

      {/* No connector toggle */}
      <div
        onClick={() => isBare ? onSelectConnector("") : onSelectConnector("BARE")}
        className={cn(
          "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all",
          isBare
            ? "bg-card ring-2 ring-primary shadow-lg shadow-black/10"
            : "bg-card shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10",
        )}
      >
        <div className="flex items-center gap-3">
          <CircleSlash className="w-5 h-5 text-muted-foreground" />
          <div>
            <div className="text-base font-bold text-foreground">No Connector (Bare End)</div>
            <div className="text-sm text-muted-foreground">Leave unterminated</div>
          </div>
        </div>
        <div className={cn(
          "w-11 h-6 rounded-full transition-colors relative",
          isBare ? "bg-primary" : "bg-secondary",
        )}>
          <div className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform",
            isBare ? "translate-x-5" : "translate-x-0.5",
          )} />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {connectorGroups.map(g => (
          <button
            key={g.value}
            onClick={() => setFilter(g.value)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-base font-semibold transition-all",
              filter === g.value
                ? "bg-foreground text-background shadow-sm"
                : "bg-card shadow-sm shadow-black/5 text-muted-foreground hover:text-foreground",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Connector grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filtered.map(conn => {
          const isSelected = selectedConnector === conn.id
          return (
            <button
              key={conn.id}
              onClick={() => onSelectConnector(conn.id)}
              className={cn(
                "relative flex items-center gap-3 rounded-xl transition-all overflow-hidden p-3",
                isSelected
                  ? "bg-card shadow-lg shadow-black/10 ring-2 ring-primary"
                  : "bg-card shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10",
              )}
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <ConnectorPlaceholderImage
                  group={conn.group}
                  isMale={conn.isMale}
                  isRightAngle={conn.isRightAngle}
                  className="w-12 h-12"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  {conn.name}
                  {conn.isRightAngle && (
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">90°</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{conn.subtitle}</div>
              </div>
              {isSelected && (
                <div className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Brand selector — reveals when a connector is chosen */}
      {needsBrand && (
        <div className="p-6 rounded-2xl bg-accent/30 border-2 border-accent space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-lg font-bold text-foreground">Select Quality Tier</h3>
          <p className="text-base text-muted-foreground">Choose the brand and quality level for this connector.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {brands.map(brand => {
              const isSelected = selectedBrand === brand.id
              const price = getConnectorPrice(selectedConnector, brand.id)
              const BrandIcon = brand.id === "rf-industries" ? Shield : brand.id === "rigcables" ? Star : Award
              return (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand.id)}
                  className={cn(
                    "relative flex flex-col p-5 rounded-2xl transition-all text-left",
                    isSelected
                      ? "bg-card shadow-lg shadow-black/10 ring-2 ring-primary"
                      : "bg-card shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5",
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <BrandIcon className="w-5 h-5 text-foreground/50" />
                    <span className="font-bold text-lg text-foreground">{brand.name}</span>
                  </div>
                  <span className={cn("text-sm font-semibold mb-2 uppercase tracking-wider", brand.colorClass)}>{brand.tier}</span>
                  <p className="text-base text-muted-foreground mb-3 leading-relaxed">{brand.description}</p>
                  <span className="font-mono text-foreground text-xl font-bold mt-auto">{formatPrice(price)}</span>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
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
      )}

      {/* Label input — reveals when step is complete */}
      {isComplete && (
        <div className="p-6 rounded-2xl bg-accent/30 border-2 border-accent space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              Add a Label{" "}
              <span className="text-base font-normal text-muted-foreground">(optional · {formatPrice(LABEL_PRICE)})</span>
            </h3>
            <p className="text-base text-muted-foreground">Custom text printed on a heat-shrink label.</p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-sm shadow-black/5">
            <Tag className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              maxLength={20}
              value={label}
              onChange={e => onLabelChange(e.target.value)}
              placeholder={side === "A" ? "e.g. HF Antenna" : "e.g. IC-7300"}
              className="flex-1 bg-transparent text-base font-mono text-foreground outline-none placeholder:text-muted-foreground/30"
            />
            <span className="text-sm text-muted-foreground/40 font-mono">{label.length}/20</span>
          </div>
        </div>
      )}
    </div>
  )
}
