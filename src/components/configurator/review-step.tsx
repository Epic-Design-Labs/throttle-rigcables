"use client"

import type { CableConfig, PriceBreakdown } from "@/lib/cable/types"
import { cables, connectors, brands } from "@/lib/cable/data"
import { formatPrice } from "@/lib/cable/pricing"
import { ConnectorIcon } from "./illustrations"
import { ShoppingCart, Copy, CheckCircle2, AlertCircle } from "lucide-react"

interface Props {
  config: CableConfig
  price: PriceBreakdown
  isBuildComplete: boolean
  onEditStep: (step: number) => void
  onAddToCart: () => void
  onDuplicate: () => void
}

export function ReviewStep({ config, price, isBuildComplete, onEditStep, onAddToCart, onDuplicate }: Props) {
  const cable = cables.find(c => c.id === config.cableType)
  const sideAConn = connectors.find(c => c.id === config.sideA.connector)
  const sideBConn = connectors.find(c => c.id === config.sideB.connector)
  const sideABrand = brands.find(b => b.id === config.sideA.brand)
  const sideBBrand = brands.find(b => b.id === config.sideB.brand)

  if (!isBuildComplete) {
    return (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold tracking-tight">Review your build</h2>
        <div className="p-10 rounded-2xl bg-card shadow-sm shadow-black/5 text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-base text-muted-foreground mb-6">Complete all steps to review your build.</p>
          <div className="space-y-3">
            {!config.cableType && <IncompleteItem label="Cable Type" onClick={() => onEditStep(0)} />}
            {!config.length && <IncompleteItem label="Length" onClick={() => onEditStep(1)} />}
            {!config.sideA.connector && <IncompleteItem label="End 1 Connector" onClick={() => onEditStep(2)} />}
            {!config.sideB.connector && <IncompleteItem label="End 2 Connector" onClick={() => onEditStep(3)} />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold tracking-tight">Review your build</h2>

      {/* Cable diagram */}
      <div className="p-6 rounded-2xl bg-card shadow-sm shadow-black/5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col items-center text-center min-w-0 flex-shrink-0">
            {config.sideA.label && (
              <div className="px-3 py-1 mb-2 bg-foreground text-background rounded text-sm font-mono font-bold">
                {config.sideA.label}
              </div>
            )}
            {sideAConn && (
              <ConnectorIcon group={sideAConn.group} isMale={sideAConn.isMale} isRightAngle={sideAConn.isRightAngle} className="w-20 h-16" />
            )}
            <span className="text-sm font-bold text-foreground mt-1.5">{sideAConn?.name}</span>
            {sideABrand && <span className="text-sm text-muted-foreground">{sideABrand.name}</span>}
          </div>

          <div className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full h-2 rounded-full bg-secondary relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted-foreground/15 to-secondary" />
            </div>
            <span className="text-sm font-mono text-muted-foreground">{cable?.name} · {config.length}ft</span>
          </div>

          <div className="flex flex-col items-center text-center min-w-0 flex-shrink-0">
            {config.sideB.label && (
              <div className="px-3 py-1 mb-2 bg-foreground text-background rounded text-sm font-mono font-bold">
                {config.sideB.label}
              </div>
            )}
            {sideBConn && (
              <ConnectorIcon group={sideBConn.group} isMale={sideBConn.isMale} isRightAngle={sideBConn.isRightAngle} className="w-20 h-16" />
            )}
            <span className="text-sm font-bold text-foreground mt-1.5">{sideBConn?.name}</span>
            {sideBBrand && <span className="text-sm text-muted-foreground">{sideBBrand.name}</span>}
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl bg-card shadow-sm shadow-black/5 p-6">
        <div className="space-y-3 text-base">
          <PriceLine label={`Cable: ${cable?.name} × ${config.length}ft`} amount={price.cable} />
          {price.sideAConnector > 0 && (
            <PriceLine
              label={`End 1: ${sideAConn?.name}${sideABrand ? ` — ${sideABrand.name}` : ""}${config.sideA.label ? ` (${config.sideA.label})` : ""}`}
              amount={price.sideAConnector + price.sideALabel}
            />
          )}
          {!price.sideAConnector && price.sideALabel > 0 && (
            <PriceLine label={`End 1: Label (${config.sideA.label})`} amount={price.sideALabel} />
          )}
          {price.sideBConnector > 0 && (
            <PriceLine
              label={`End 2: ${sideBConn?.name}${sideBBrand ? ` — ${sideBBrand.name}` : ""}${config.sideB.label ? ` (${config.sideB.label})` : ""}`}
              amount={price.sideBConnector + price.sideBLabel}
            />
          )}
          {!price.sideBConnector && price.sideBLabel > 0 && (
            <PriceLine label={`End 2: Label (${config.sideB.label})`} amount={price.sideBLabel} />
          )}
          <PriceLine label="Assembly & testing" amount={price.assembly} />
          <div className="border-t border-border pt-4 mt-4 flex justify-between items-baseline">
            <span className="font-bold text-foreground text-lg">Total</span>
            <span className="font-mono text-foreground text-3xl font-bold tracking-tight">{formatPrice(price.total)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors shadow-md"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart — {formatPrice(price.total)}
        </button>
        <button
          onClick={onDuplicate}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-card shadow-sm shadow-black/5 text-foreground text-base font-medium hover:shadow-md hover:shadow-black/10 transition-all"
        >
          <Copy className="w-5 h-5" />
          Duplicate & Modify
        </button>
      </div>

      <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4" />
        Hand-assembled, continuity tested, and inspected before shipping.
      </p>
    </div>
  )
}

function PriceLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground flex-shrink-0 font-medium">{formatPrice(amount)}</span>
    </div>
  )
}

function IncompleteItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-base text-foreground hover:text-primary mx-auto transition-colors">
      <AlertCircle className="w-4 h-4" />
      <span className="underline underline-offset-2">{label}</span>
    </button>
  )
}
