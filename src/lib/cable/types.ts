export type FlexRating = "Low" | "Medium" | "High" | "Ultra"
export type CableCategory = "RG" | "LMR"
export type ConnectorGroup = "BNC" | "N-Type" | "SMA" | "UHF" | "Adapter" | "none"
export type BrandId = "rf-industries" | "rigcables" | "amphenol"

export interface CableType {
  id: string
  name: string
  impedance: string
  outerDiameter: string
  odInches: number
  lossHF: number
  lossUHF: number
  flex: FlexRating
  pricePerFoot: number
  description: string
  category: CableCategory
}

export interface Connector {
  id: string
  name: string
  subtitle: string
  group: ConnectorGroup
  isRightAngle: boolean
  isMale: boolean | null
}

export interface Brand {
  id: BrandId
  name: string
  tier: string
  multiplier: number
  description: string
  colorClass: string
}

export interface SideConfig {
  connector: string | null
  brand: BrandId | null
  label: string
}

export interface CableConfig {
  cableType: string | null
  length: number | null
  sideA: SideConfig
  sideB: SideConfig
}

export interface PriceBreakdown {
  cable: number
  sideAConnector: number
  sideBConnector: number
  sideALabel: number
  sideBLabel: number
  assembly: number
  total: number
}

export interface Preset {
  id: string
  name: string
  description: string
  config: CableConfig
}
