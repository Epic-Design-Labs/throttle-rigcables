"use client"

import { useCableConfigStore, STEPS } from "@/store/cable-config"
import { StepProgress } from "./step-nav"
import { LivePreview } from "./live-preview"
import { QuickBuilds } from "./quick-builds"
import { CableTypeStep } from "./cable-type-step"
import { LengthStep } from "./length-step"
import { ConnectorStep } from "./connector-step"
import { ReviewStep } from "./review-step"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CableConfigurator() {
  const {
    config, currentStep, price,
    goToStep, nextStep, prevStep,
    setCableType, setLength, setSideConnector, setSideBrand, setSideLabel,
    loadPreset, resetConfig,
    isStepComplete, isBuildComplete,
  } = useCableConfigStore()

  const buildComplete = isBuildComplete()
  const stepComplete = isStepComplete(currentStep)
  const canGoBack = currentStep > 0
  const canGoForward = currentStep < STEPS.length - 1 && (currentStep < 4 ? stepComplete : buildComplete)

  const handleAddToCart = () => {
    // TODO: wire to Throttle cart API — build a custom product from config
    console.log("Add to cart:", config, price)
  }

  const handleDuplicate = () => {
    goToStep(0)
  }

  return (
    <div
      className="configurator-root min-h-screen bg-background"
      style={{ "--primary": "oklch(0.637 0.237 25.331)", "--primary-foreground": "oklch(0.985 0 0)" } as React.CSSProperties}
    >
      {/* Sticky top bar: step nav + quick builds */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto">
              <StepProgress
                currentStep={currentStep}
                isStepComplete={isStepComplete}
                onStepClick={goToStep}
                isBuildComplete={buildComplete}
              />
            </div>
            <QuickBuilds onSelect={loadPreset} />
          </div>
        </div>
      </div>

      {/* Main layout: step content + sidebar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8 xl:gap-12">
          {/* Step content */}
          <div className="flex-1 min-w-0">
            {currentStep === 0 && (
              <CableTypeStep
                selected={config.cableType}
                onSelect={(id) => { setCableType(id); nextStep() }}
              />
            )}
            {currentStep === 1 && (
              <LengthStep
                selected={config.length}
                cableTypeId={config.cableType}
                onSelect={setLength}
              />
            )}
            {currentStep === 2 && (
              <ConnectorStep
                side="A"
                selectedConnector={config.sideA.connector}
                selectedBrand={config.sideA.brand}
                label={config.sideA.label}
                onSelectConnector={(id) => setSideConnector("A", id)}
                onSelectBrand={(id) => setSideBrand("A", id)}
                onLabelChange={(l) => setSideLabel("A", l)}
              />
            )}
            {currentStep === 3 && (
              <ConnectorStep
                side="B"
                selectedConnector={config.sideB.connector}
                selectedBrand={config.sideB.brand}
                label={config.sideB.label}
                onSelectConnector={(id) => setSideConnector("B", id)}
                onSelectBrand={(id) => setSideBrand("B", id)}
                onLabelChange={(l) => setSideLabel("B", l)}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep
                config={config}
                price={price}
                isBuildComplete={buildComplete}
                onEditStep={goToStep}
                onAddToCart={handleAddToCart}
                onDuplicate={handleDuplicate}
              />
            )}

            {/* Back / Continue footer */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              <button
                onClick={prevStep}
                disabled={!canGoBack}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base transition-all",
                  canGoBack
                    ? "bg-card shadow-sm shadow-black/5 text-foreground hover:shadow-md hover:shadow-black/10"
                    : "invisible",
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < 4 && (
                <button
                  onClick={nextStep}
                  disabled={!canGoForward}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all shadow-md",
                    canGoForward
                      ? "bg-foreground text-background hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed",
                  )}
                >
                  Continue to {STEPS[currentStep + 1]?.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right sidebar — live build preview */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-[73px] rounded-2xl border border-border bg-card p-6 shadow-sm shadow-black/5">
              <LivePreview
                config={config}
                price={price}
                isBuildComplete={buildComplete}
                onReview={() => goToStep(4)}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
