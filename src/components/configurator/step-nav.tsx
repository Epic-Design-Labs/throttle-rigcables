"use client"

import { Check, ChevronRight } from "lucide-react"
import { STEPS } from "@/store/cable-config"
import { cn } from "@/lib/utils"

interface StepProgressProps {
  currentStep: number
  isStepComplete: (step: number) => boolean
  onStepClick: (step: number) => void
  isBuildComplete: boolean
}

export function StepProgress({ currentStep, isStepComplete, onStepClick, isBuildComplete }: StepProgressProps) {
  return (
    <div className="flex items-center gap-0 py-3">
      {STEPS.map((step, i) => {
        const complete = isStepComplete(i)
        const active = currentStep === i
        const isReview = i === 4
        const clickable = isReview ? isBuildComplete : true

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => clickable && onStepClick(i)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap",
                !clickable && "cursor-not-allowed opacity-40",
                active && "bg-foreground text-background shadow-md",
                !active && complete && "text-foreground hover:bg-secondary",
                !active && !complete && clickable && "text-muted-foreground hover:bg-secondary/60",
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-md text-sm font-bold flex-shrink-0 transition-all",
                active && "bg-background text-foreground",
                !active && complete && "bg-primary text-primary-foreground",
                !active && !complete && "border-2 border-current",
              )}>
                {complete && !active ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span className={cn("text-base font-semibold", active ? "inline" : "hidden lg:inline")}>{step.label}</span>
            </button>

            {i < STEPS.length - 1 && (
              <div className="flex-1 flex items-center justify-center mx-1 min-w-[20px] text-muted-foreground/40">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
