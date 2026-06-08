"use client"

import { create } from "zustand"
import type { CableConfig, BrandId, PriceBreakdown } from "@/lib/cable/types"
import { calculatePrice } from "@/lib/cable/pricing"
import { cables, connectors, brands as brandList } from "@/lib/cable/data"

export const STEPS = [
  { key: "cable", label: "Cable Type", number: 1 },
  { key: "length", label: "Length", number: 2 },
  { key: "sideA", label: "End 1", number: 3 },
  { key: "sideB", label: "End 2", number: 4 },
  { key: "review", label: "Review", number: 5 },
] as const

export type StepKey = (typeof STEPS)[number]["key"]

const initialConfig: CableConfig = {
  cableType: null,
  length: null,
  sideA: { connector: null, brand: null, label: "" },
  sideB: { connector: null, brand: null, label: "" },
}

interface CableConfigState {
  config: CableConfig
  currentStep: number
  price: PriceBreakdown

  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setCableType: (id: string) => void
  setLength: (len: number) => void
  setSideConnector: (side: "A" | "B", connectorId: string) => void
  setSideBrand: (side: "A" | "B", brandId: BrandId) => void
  setSideLabel: (side: "A" | "B", label: string) => void
  loadPreset: (presetConfig: CableConfig) => void
  resetConfig: () => void

  getStepSummary: (stepIndex: number) => string | null
  isStepComplete: (stepIndex: number) => boolean
  isBuildComplete: () => boolean
}

function computePrice(config: CableConfig): PriceBreakdown {
  return calculatePrice(config)
}

export const useCableConfigStore = create<CableConfigState>((set, get) => ({
  config: initialConfig,
  currentStep: 0,
  price: computePrice(initialConfig),

  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => set(s => ({ currentStep: Math.min(s.currentStep + 1, STEPS.length - 1) })),
  prevStep: () => set(s => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

  setCableType: (id) => set(s => {
    const config = { ...s.config, cableType: id }
    return { config, price: computePrice(config) }
  }),

  setLength: (len) => set(s => {
    const config = { ...s.config, length: len }
    return { config, price: computePrice(config) }
  }),

  setSideConnector: (side, connectorId) => set(s => {
    const key = side === "A" ? "sideA" : "sideB"
    const config = {
      ...s.config,
      [key]: { ...s.config[key], connector: connectorId, brand: connectorId === "BARE" ? null : s.config[key].brand },
    }
    return { config, price: computePrice(config) }
  }),

  setSideBrand: (side, brandId) => set(s => {
    const key = side === "A" ? "sideA" : "sideB"
    const config = { ...s.config, [key]: { ...s.config[key], brand: brandId } }
    return { config, price: computePrice(config) }
  }),

  setSideLabel: (side, label) => set(s => {
    const key = side === "A" ? "sideA" : "sideB"
    const config = { ...s.config, [key]: { ...s.config[key], label } }
    return { config, price: computePrice(config) }
  }),

  loadPreset: (presetConfig) => set({
    config: presetConfig,
    currentStep: 4,
    price: computePrice(presetConfig),
  }),

  resetConfig: () => set({
    config: initialConfig,
    currentStep: 0,
    price: computePrice(initialConfig),
  }),

  getStepSummary: (stepIndex) => {
    const { config } = get()
    switch (stepIndex) {
      case 0: {
        const c = cables.find(c => c.id === config.cableType)
        return c ? c.name : null
      }
      case 1: return config.length ? `${config.length} ft` : null
      case 2: {
        const conn = connectors.find(c => c.id === config.sideA.connector)
        const brand = brandList.find(b => b.id === config.sideA.brand)
        return conn ? `${conn.name}${brand ? `, ${brand.name}` : ""}` : null
      }
      case 3: {
        const conn = connectors.find(c => c.id === config.sideB.connector)
        const brand = brandList.find(b => b.id === config.sideB.brand)
        return conn ? `${conn.name}${brand ? `, ${brand.name}` : ""}` : null
      }
      default: return null
    }
  },

  isStepComplete: (stepIndex) => {
    const { config } = get()
    switch (stepIndex) {
      case 0: return !!config.cableType
      case 1: return !!config.length
      case 2: return !!config.sideA.connector && (config.sideA.connector === "BARE" || !!config.sideA.brand)
      case 3: return !!config.sideB.connector && (config.sideB.connector === "BARE" || !!config.sideB.brand)
      case 4: return false
      default: return false
    }
  },

  isBuildComplete: () => {
    const { isStepComplete } = get()
    return [0, 1, 2, 3].every(i => isStepComplete(i))
  },
}))
