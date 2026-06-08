import type { CableConfig, PriceBreakdown } from "./types"
import { cables, connectors, brands, connectorBasePrice, RIGHT_ANGLE_SURCHARGE, LABEL_PRICE, BASE_ASSEMBLY_FEE, PER_CONNECTOR_FEE } from "./data"

export function getConnectorPrice(connectorId: string | null, brandId: string | null): number {
  if (!connectorId || connectorId === "BARE") return 0
  const conn = connectors.find(c => c.id === connectorId)
  if (!conn) return 0
  const base = connectorBasePrice[conn.group] ?? 0
  const brand = brands.find(b => b.id === brandId)
  const multiplier = brand?.multiplier ?? 1
  const raSurcharge = conn.isRightAngle ? RIGHT_ANGLE_SURCHARGE : 0
  return base * multiplier + raSurcharge
}

export function calculatePrice(config: CableConfig): PriceBreakdown {
  const cable = config.cableType && config.length
    ? (cables.find(c => c.id === config.cableType)?.pricePerFoot ?? 0) * config.length
    : 0

  const sideAConnector = getConnectorPrice(config.sideA.connector, config.sideA.brand)
  const sideBConnector = getConnectorPrice(config.sideB.connector, config.sideB.brand)

  const sideALabel = config.sideA.label.trim() ? LABEL_PRICE : 0
  const sideBLabel = config.sideB.label.trim() ? LABEL_PRICE : 0

  const connectorCount = [config.sideA.connector, config.sideB.connector]
    .filter(c => c && c !== "BARE").length
  const assembly = BASE_ASSEMBLY_FEE + connectorCount * PER_CONNECTOR_FEE

  const total = cable + sideAConnector + sideBConnector + sideALabel + sideBLabel + assembly

  return { cable, sideAConnector, sideBConnector, sideALabel, sideBLabel, assembly, total }
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
