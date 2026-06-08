import type { ConnectorGroup } from "@/lib/cable/types"

interface CableCrossSectionProps {
  odInches: number
  className?: string
}

export function CableCrossSection({ odInches, className = "" }: CableCrossSectionProps) {
  const scale = Math.min(odInches / 0.6, 1)
  const r = 28 * scale
  return (
    <svg viewBox="0 0 80 80" className={className} aria-label="Cable cross-section">
      <circle cx="40" cy="40" r={r} fill="#1a1a1a" />
      <circle cx="40" cy="40" r={r * 0.88} fill="none" stroke="#666" strokeWidth={r * 0.06} />
      <circle cx="40" cy="40" r={r * 0.82} fill="none" stroke="#555" strokeWidth={r * 0.04} strokeDasharray="2.5 1.5" />
      <circle cx="40" cy="40" r={r * 0.65} fill="#e8e5df" />
      <circle cx="40" cy="40" r={r * 0.2} fill="#c97b3a" />
      <circle cx="40" cy="40" r={r * 0.12} fill="#d4954f" />
    </svg>
  )
}

interface ConnectorIconProps {
  group: ConnectorGroup
  isMale: boolean | null
  isRightAngle?: boolean
  className?: string
}

export function ConnectorIcon({ group, isMale, isRightAngle = false, className = "" }: ConnectorIconProps) {
  const transform = isRightAngle ? "rotate(-30 40 32)" : undefined
  return (
    <svg viewBox="0 0 80 64" className={className} aria-label={`${group} connector`}>
      <g transform={transform}>
        {group === "BNC" && <BNCShape isMale={isMale} />}
        {group === "N-Type" && <NTypeShape isMale={isMale} />}
        {group === "SMA" && <SMAShape isMale={isMale} />}
        {group === "UHF" && <UHFShape isMale={isMale} />}
        {group === "Adapter" && <AdapterShape />}
        {group === "none" && <BareEndShape />}
      </g>
    </svg>
  )
}

function BNCShape({ isMale }: { isMale: boolean | null }) {
  return (
    <>
      <rect x="30" y="14" width="28" height="36" rx="3" fill="#888" />
      <rect x="18" y="18" width="14" height="28" rx="2" fill="#999" />
      <circle cx="22" cy="19" r="2.5" fill="#aaa" />
      <circle cx="22" cy="45" r="2.5" fill="#aaa" />
      <rect x="58" y="24" width="16" height="16" rx="8" fill="#333" />
      {isMale !== false && <rect x="14" y="29" width="6" height="6" rx="3" fill="#c97b3a" />}
      {isMale === false && <circle cx="17" cy="32" r="3" fill="none" stroke="#c97b3a" strokeWidth="1.5" />}
    </>
  )
}

function NTypeShape({ isMale }: { isMale: boolean | null }) {
  return (
    <>
      <rect x="28" y="10" width="30" height="44" rx="3" fill="#888" />
      <polygon points="12,16 24,10 24,54 12,48" fill="#999" />
      <polygon points="12,16 6,22 6,42 12,48" fill="#888" />
      {[18, 24, 30, 36, 42].map(y => (
        <line key={y} x1="12" y1={y} x2="24" y2={y} stroke="#aaa" strokeWidth="0.5" />
      ))}
      <rect x="58" y="22" width="16" height="20" rx="10" fill="#333" />
      {isMale !== false && <rect x="3" y="29" width="8" height="6" rx="3" fill="#c97b3a" />}
      {isMale === false && <circle cx="7" cy="32" r="3" fill="none" stroke="#c97b3a" strokeWidth="1.5" />}
    </>
  )
}

function SMAShape({ isMale }: { isMale: boolean | null }) {
  return (
    <>
      <rect x="32" y="20" width="22" height="24" rx="2" fill="#888" />
      <rect x="20" y="22" width="14" height="20" rx="1.5" fill="#999" />
      {[25, 28, 31, 34, 37, 40].map(y => (
        <line key={y} x1="20" y1={y} x2="34" y2={y} stroke="#aaa" strokeWidth="0.4" />
      ))}
      <rect x="54" y="26" width="14" height="12" rx="6" fill="#333" />
      {isMale !== false && <rect x="16" y="30" width="5" height="4" rx="2" fill="#c97b3a" />}
      {isMale === false && <circle cx="18" cy="32" r="2.5" fill="none" stroke="#c97b3a" strokeWidth="1.5" />}
    </>
  )
}

function UHFShape({ isMale }: { isMale: boolean | null }) {
  return (
    <>
      <rect x="30" y="8" width="28" height="48" rx="3" fill="#888" />
      <rect x="10" y="12" width="22" height="40" rx="2" fill="#999" />
      {Array.from({ length: 14 }, (_, i) => 14 + i * 2.7).map(y => (
        <line key={y} x1="10" y1={y} x2="32" y2={y} stroke="#aaa" strokeWidth="0.6" />
      ))}
      <rect x="58" y="22" width="16" height="20" rx="10" fill="#333" />
      {isMale !== false && <rect x="5" y="29" width="7" height="6" rx="3" fill="#c97b3a" />}
      {isMale === false && <circle cx="9" cy="32" r="3.5" fill="none" stroke="#c97b3a" strokeWidth="1.5" />}
    </>
  )
}

function AdapterShape() {
  return (
    <>
      <rect x="20" y="12" width="16" height="28" rx="2" fill="#888" />
      <rect x="36" y="30" width="24" height="16" rx="2" fill="#888" />
      <rect x="32" y="26" width="8" height="8" rx="1" fill="#999" />
      <circle cx="16" cy="26" r="3" fill="#c97b3a" />
      <circle cx="64" cy="38" r="3" fill="#c97b3a" />
    </>
  )
}

function BareEndShape() {
  return (
    <>
      <rect x="40" y="20" width="30" height="24" rx="12" fill="#333" />
      <rect x="24" y="22" width="20" height="20" rx="10" fill="#444" stroke="#999" strokeWidth="0.5" />
      <circle cx="34" cy="32" r="7" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="2 1.5" />
      <circle cx="34" cy="32" r="4.5" fill="#e8e5df" />
      <rect x="14" y="30" width="16" height="4" rx="2" fill="#c97b3a" />
    </>
  )
}

interface FlexDotsProps {
  rating: string
  className?: string
}

export function FlexDots({ rating, className = "" }: FlexDotsProps) {
  const levels: Record<string, number> = { Low: 1, Medium: 2, High: 3, Ultra: 4 }
  const filled = levels[rating] ?? 0
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= filled ? "bg-foreground" : "bg-border"}`} />
      ))}
    </div>
  )
}

export function ConnectorPlaceholderImage({ group, isMale, isRightAngle, className = "" }: ConnectorIconProps) {
  const label = group === "none" ? "Bare End" : `${group}${isMale === true ? " M" : isMale === false ? " F" : ""}${isRightAngle ? " 90°" : ""}`
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <div className="flex flex-col items-center gap-1.5 p-2">
        <ConnectorIcon group={group} isMale={isMale} isRightAngle={isRightAngle} className="w-16 h-12" />
        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
    </div>
  )
}
