import type { Metadata } from "next"
import { CableConfigurator } from "@/components/configurator/cable-configurator"

export const metadata: Metadata = {
  title: "Custom Cable Builder",
  description: "Build your perfect RF cable — choose your cable type, length, connectors, and quality tier.",
}

export default function BuildPage() {
  return <CableConfigurator />
}
