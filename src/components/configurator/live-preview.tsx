"use client"

import type { CableConfig, PriceBreakdown } from "@/lib/cable/types"
import { cables, connectors, brands } from "@/lib/cable/data"
import { ConnectorIcon } from "./illustrations"
import { formatPrice } from "@/lib/cable/pricing"

interface Props {
  config: CableConfig
  price: PriceBreakdown
  onReview: () => void
  isBuildComplete: boolean
}

export function LivePreview({ config, price, onReview, isBuildComplete }: Props) {
  const cable = cables.find(c => c.id === config.cableType)
  const sideAConn = connectors.find(c => c.id === config.sideA.connector)
  const sideBConn = connectors.find(c => c.id === config.sideB.connector)
  const sideABrand = brands.find(b => b.id === config.sideA.brand)
  const sideBBrand = brands.find(b => b.id === config.sideB.brand)
  const hasAnything = cable || sideAConn || sideBConn

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Your Build</h3>
        {hasAnything && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
      </div>

      {/* Cable schematic */}
      <div className="rounded-xl bg-card p-4 shadow-sm shadow-black/5 space-y-3">
        <EndPreview label="1" conn={sideAConn} brand={sideABrand} customLabel={config.sideA.label} />
        <div className="flex items-center gap-3 pl-4">
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-sm font-mono text-foreground font-medium">{cable ? cable.name : "—"}</div>
            <div className="text-sm font-mono text-muted-foreground">{config.length ? `${config.length} ft` : "No length"}</div>
          </div>
        </div>
        <EndPreview label="2" conn={sideBConn} brand={sideBBrand} customLabel={config.sideB.label} />
      </div>

      {/* Price breakdown */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Pricing</h3>
        {price.cable > 0 && <MiniLine label="Cable" amount={price.cable} />}
        {price.sideAConnector > 0 && <MiniLine label="End 1" amount={price.sideAConnector} />}
        {price.sideBConnector > 0 && <MiniLine label="End 2" amount={price.sideBConnector} />}
        {price.sideALabel > 0 && <MiniLine label="Label 1" amount={price.sideALabel} />}
        {price.sideBLabel > 0 && <MiniLine label="Label 2" amount={price.sideBLabel} />}
        <MiniLine label="Assembly" amount={price.assembly} />
        <div className="border-t border-border pt-3 mt-3 flex justify-between items-baseline">
          <span className="text-sm font-bold text-foreground">Total</span>
          <span className="font-mono text-foreground font-bold text-2xl tracking-tight">{formatPrice(price.total)}</span>
        </div>
      </div>

      {isBuildComplete && (
        <button
          onClick={onReview}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors shadow-md"
        >
          Add to Cart — {formatPrice(price.total)}
        </button>
      )}
    </div>
  )
}

function EndPreview({ label, conn, brand, customLabel }: { label: string; conn: ReturnType<typeof connectors.find>; brand: ReturnType<typeof brands.find>; customLabel: string }) {
  if (!conn) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-dashed border-border">
          <span className="text-sm font-bold text-muted-foreground">{label}</span>
        </div>
        <span className="text-sm text-muted-foreground italic">Not configured</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
        <ConnectorIcon group={conn.group} isMale={conn.isMale} className="w-8 h-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-foreground truncate">{conn.name}</div>
        <div className="text-sm text-muted-foreground">
          {brand ? brand.name : ""}
          {customLabel ? ` · "${customLabel}"` : ""}
        </div>
      </div>
    </div>
  )
}

function MiniLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground font-medium">{formatPrice(amount)}</span>
    </div>
  )
}
