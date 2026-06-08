import type { CableType, Connector, Brand, Preset, ConnectorGroup } from "./types"

export const cables: CableType[] = [
  { id: "rg8x", name: "RG-8X", impedance: "50Ω", outerDiameter: '0.242"', odInches: 0.242, lossHF: 1.6, lossUHF: 5.4, flex: "High", pricePerFoot: 0.75, description: "Lightweight & flexible. Ideal for HF jumpers, portable ops, and tight spaces.", category: "RG" },
  { id: "rg8u", name: "RG-8/U", impedance: "50Ω", outerDiameter: '0.405"', odInches: 0.405, lossHF: 1.1, lossUHF: 3.6, flex: "Medium", pricePerFoot: 1.10, description: "The workhorse. Solid all-around performer for HF and VHF base stations.", category: "RG" },
  { id: "rg213", name: "RG-213", impedance: "50Ω", outerDiameter: '0.405"', odInches: 0.405, lossHF: 1.1, lossUHF: 3.6, flex: "Medium", pricePerFoot: 1.25, description: "Mil-spec construction. Same performance as RG-8/U with tighter tolerances.", category: "RG" },
  { id: "lmr240", name: "LMR-240", impedance: "50Ω", outerDiameter: '0.240"', odInches: 0.240, lossHF: 1.6, lossUHF: 5.3, flex: "High", pricePerFoot: 1.50, description: "Times Microwave quality in a slim profile. VHF/UHF where space matters.", category: "LMR" },
  { id: "lmr240uf", name: "LMR-240 UF", impedance: "50Ω", outerDiameter: '0.240"', odInches: 0.240, lossHF: 1.6, lossUHF: 5.3, flex: "Ultra", pricePerFoot: 1.85, description: "Maximum flexibility in a 240-class cable. Repeated bending without degradation.", category: "LMR" },
  { id: "lmr400", name: "LMR-400", impedance: "50Ω", outerDiameter: '0.405"', odInches: 0.405, lossHF: 0.7, lossUHF: 2.2, flex: "Medium", pricePerFoot: 2.25, description: "The gold standard feedline. Low loss for primary antenna runs and repeater installations.", category: "LMR" },
  { id: "lmr400uf", name: "LMR-400 UF", impedance: "50Ω", outerDiameter: '0.405"', odInches: 0.405, lossHF: 0.7, lossUHF: 2.2, flex: "High", pricePerFoot: 2.75, description: "LMR-400 performance with enhanced flexibility. Perfect for runs requiring tight bends.", category: "LMR" },
  { id: "lmr600", name: "LMR-600", impedance: "50Ω", outerDiameter: '0.590"', odInches: 0.590, lossHF: 0.5, lossUHF: 1.7, flex: "Low", pricePerFoot: 4.50, description: "Minimum loss, maximum performance. Long tower runs, commercial installations, contest stations.", category: "LMR" },
]

export const connectors: Connector[] = [
  { id: "BARE", name: "Bare End", subtitle: "No Termination", group: "none", isRightAngle: false, isMale: null },
  { id: "BNC-M", name: "BNC", subtitle: "Male", group: "BNC", isRightAngle: false, isMale: true },
  { id: "BNC-F", name: "BNC", subtitle: "Female", group: "BNC", isRightAngle: false, isMale: false },
  { id: "BNC-RA-M", name: "BNC 90°", subtitle: "Male", group: "BNC", isRightAngle: true, isMale: true },
  { id: "BNC-RA-F", name: "BNC 90°", subtitle: "Female", group: "BNC", isRightAngle: true, isMale: false },
  { id: "N-M", name: "N-Type", subtitle: "Male", group: "N-Type", isRightAngle: false, isMale: true },
  { id: "N-F", name: "N-Type", subtitle: "Female", group: "N-Type", isRightAngle: false, isMale: false },
  { id: "N-RA-M", name: "N-Type 90°", subtitle: "Male", group: "N-Type", isRightAngle: true, isMale: true },
  { id: "N-RA-F", name: "N-Type 90°", subtitle: "Female", group: "N-Type", isRightAngle: true, isMale: false },
  { id: "SMA-M", name: "SMA", subtitle: "Male", group: "SMA", isRightAngle: false, isMale: true },
  { id: "SMA-F", name: "SMA", subtitle: "Female", group: "SMA", isRightAngle: false, isMale: false },
  { id: "SMA-RA-M", name: "SMA 90°", subtitle: "Male", group: "SMA", isRightAngle: true, isMale: true },
  { id: "SMA-RA-F", name: "SMA 90°", subtitle: "Female", group: "SMA", isRightAngle: true, isMale: false },
  { id: "UHF-259", name: "PL-259", subtitle: "UHF Male", group: "UHF", isRightAngle: false, isMale: true },
  { id: "UHF-239", name: "SO-239", subtitle: "UHF Female", group: "UHF", isRightAngle: false, isMale: false },
  { id: "UHF-259-RA", name: "PL-259 90°", subtitle: "UHF Male", group: "UHF", isRightAngle: true, isMale: true },
  { id: "UHF-239-RA", name: "SO-239 90°", subtitle: "UHF Female", group: "UHF", isRightAngle: true, isMale: false },
  { id: "RA-ADAPT", name: "Right Angle", subtitle: "Adapter", group: "Adapter", isRightAngle: true, isMale: null },
]

export const connectorGroups: { label: string; value: ConnectorGroup | "All" }[] = [
  { label: "All", value: "All" },
  { label: "BNC", value: "BNC" },
  { label: "N-Type", value: "N-Type" },
  { label: "SMA", value: "SMA" },
  { label: "UHF", value: "UHF" },
]

export const brands: Brand[] = [
  { id: "rf-industries", name: "RF Industries", tier: "Professional", multiplier: 1.0, description: "Industry standard. Reliable performance for serious operators.", colorClass: "text-sky-600" },
  { id: "rigcables", name: "RigCables", tier: "Premium", multiplier: 1.4, description: "Our house connectors. Hand-selected and tested. Best value at this quality tier.", colorClass: "text-amber-500" },
  { id: "amphenol", name: "Amphenol", tier: "Military Grade", multiplier: 2.2, description: "Mil-spec certified. When failure is not an option.", colorClass: "text-slate-700" },
]

export const connectorBasePrice: Record<string, number> = {
  BNC: 3.50,
  "N-Type": 5.00,
  SMA: 4.00,
  UHF: 3.00,
  Adapter: 4.00,
  none: 0,
}

export const RIGHT_ANGLE_SURCHARGE = 2.00
export const LABEL_PRICE = 1.50
export const BASE_ASSEMBLY_FEE = 5.00
export const PER_CONNECTOR_FEE = 3.00

export const quickLengths = [1, 2, 3, 6, 10, 12, 15, 25, 50, 75, 100]

export const presets: Preset[] = [
  { id: "hf-jumper", name: "HF Station Jumper", description: "RG-8X, 3ft, PL-259 ↔ PL-259", config: { cableType: "rg8x", length: 3, sideA: { connector: "UHF-259", brand: "rigcables", label: "" }, sideB: { connector: "UHF-259", brand: "rigcables", label: "" } } },
  { id: "vhf-feed", name: "VHF/UHF Feedline", description: "LMR-400, 25ft, N-Type ↔ N-Type", config: { cableType: "lmr400", length: 25, sideA: { connector: "N-M", brand: "rigcables", label: "" }, sideB: { connector: "N-M", brand: "rigcables", label: "" } } },
  { id: "ht-adapter", name: "HT Adapter Cable", description: "RG-8X, 1.5ft, SMA Male ↔ PL-259", config: { cableType: "rg8x", length: 1.5, sideA: { connector: "SMA-M", brand: "rigcables", label: "" }, sideB: { connector: "UHF-259", brand: "rigcables", label: "" } } },
  { id: "contest-feed", name: "Contest Station Feed", description: "LMR-400, 50ft, N-Type ↔ PL-259", config: { cableType: "lmr400", length: 50, sideA: { connector: "N-M", brand: "amphenol", label: "" }, sideB: { connector: "UHF-259", brand: "amphenol", label: "" } } },
  { id: "repeater-lead", name: "Repeater Duplexer Lead", description: "LMR-240, 6ft, N-Type ↔ N-Type", config: { cableType: "lmr240", length: 6, sideA: { connector: "N-M", brand: "amphenol", label: "" }, sideB: { connector: "N-M", brand: "amphenol", label: "" } } },
  { id: "base-jumper", name: "Base Station Jumper", description: "RG-213, 3ft, PL-259 ↔ PL-259", config: { cableType: "rg213", length: 3, sideA: { connector: "UHF-259", brand: "amphenol", label: "" }, sideB: { connector: "UHF-259", brand: "amphenol", label: "" } } },
]
