"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ArrowRight, ArrowLeft, Key, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface CredentialField {
  key: string
  label: string
  placeholder: string
  type?: string
}

interface CredentialStep {
  title: string
  description: string
  fields: CredentialField[]
}

interface CredentialModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceName: string
  steps: CredentialStep[]
  onComplete: (credentials: Record<string, string>) => void
}

export function CredentialModal({
  open,
  onOpenChange,
  serviceName,
  steps,
  onComplete,
}: CredentialModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const isFirst = currentStep === 0

  const canProceed = step?.fields.every((f) => values[f.key]?.trim())

  const handleNext = () => {
    if (isLast) {
      setCompleted(true)
      setTimeout(() => {
        onComplete(values)
        setCurrentStep(0)
        setValues({})
        setCompleted(false)
      }, 1200)
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (!isFirst) setCurrentStep((s) => s - 1)
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setCurrentStep(0)
      setValues({})
      setCompleted(false)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {completed ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-success/10">
              <Check className="size-6 text-success" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">
                {serviceName} Connected
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Credentials saved securely. You can now use {serviceName} in your flows.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-accent">
                  <Key className="size-4 text-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-base">Configure {serviceName}</DialogTitle>
                  <DialogDescription className="text-xs">
                    Step {currentStep + 1} of {steps.length}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Step Progress */}
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= currentStep ? "bg-foreground" : "bg-border"
                  )}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>

              {step.fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5">
                  <Label htmlFor={field.key} className="text-xs text-muted-foreground">
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field.key}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={values[field.key] || ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [field.key]: e.target.value }))
                      }
                      className="pr-8 font-mono text-xs"
                    />
                    <Shield className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              {!isFirst && (
                <Button variant="outline" size="sm" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="size-3" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-1.5"
              >
                {isLast ? "Connect" : "Next"}
                {!isLast && <ArrowRight className="size-3" />}
                {isLast && <Check className="size-3" />}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
