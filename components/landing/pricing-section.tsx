"use client"

import { Check, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    contacts: "0 - 100 contacts",
    description: "Perfect for getting started",
    features: [
      "Basic AI DM responses",
      "1 social platform",
      "Community support",
      "Standard response time",
    ],
    cta: "Get Started",
    highlighted: false,
    gradient: "from-slate-50 to-gray-50 dark:from-slate-900/40 dark:to-gray-900/40",
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    contacts: "100 - 1,000 contacts",
    description: "For growing businesses",
    features: [
      "Private VPS deployment",
      "All social platforms",
      "Voice suite included",
      "Priority support",
      "Custom AI training",
    ],
    cta: "Go Pro",
    highlighted: true,
    gradient: "from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-violet-950/40",
  },
  {
    name: "Business",
    price: "$599",
    period: "/month",
    contacts: "1,000 - 5,000 contacts",
    description: "For teams scaling fast",
    features: [
      "High-performance VPS",
      "Unlimited integrations",
      "Advanced analytics",
      "Dedicated account manager",
      "Custom voice cloning",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: "from-emerald-50 to-cyan-50 dark:from-emerald-950/40 dark:to-cyan-950/40",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24" suppressHydrationWarning>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />

      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-2 flex justify-center" suppressHydrationWarning>
          <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm">
            Pricing
          </span>
        </div>
        <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Simple, transparent pricing.
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-muted-foreground leading-relaxed sm:mb-16 sm:text-base">
          Start free, scale when you are ready. Every plan comes with your own
          private AI instance.
        </p>

        {/* Mobile: stack on top of each other, with highlighted card first for emphasis */}
        <div suppressHydrationWarning className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              suppressHydrationWarning
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                plan.highlighted
                  ? "border-foreground/20 bg-gradient-to-b " + plan.gradient + " shadow-lg order-first md:order-none mt-4 md:mt-0"
                  : "border-border bg-card hover:border-border/60 overflow-hidden"
              }`}
            >
              {/* Glow effect on highlighted */}
              {plan.highlighted && (
                <>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-200/50 to-violet-200/30 blur-2xl" />
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br from-violet-200/40 to-indigo-200/30 blur-2xl" />
                  </div>
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background shadow-md">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                </>
              )}

              <div className="relative mb-4 sm:mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
                <div className="mt-2 flex items-baseline gap-1 sm:mt-3">
                  <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{plan.contacts}</div>
              </div>

              <div className="relative mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent sm:mb-8" />

              <ul className="relative mb-6 flex-1 space-y-2.5 sm:mb-8 sm:space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-xs text-foreground sm:gap-3 sm:text-sm">
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full sm:h-5 sm:w-5 ${
                      plan.highlighted ? "bg-foreground" : "bg-emerald-100"
                    }`}>
                      <Check className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${plan.highlighted ? "text-background" : "text-emerald-600"}`} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                suppressHydrationWarning
                className={`relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-sm font-medium transition-all active:scale-[0.97] sm:py-3.5 ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:shadow-lg hover:shadow-foreground/10"
                    : "border border-border bg-card text-foreground hover:bg-secondary hover:shadow-sm"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
                {plan.highlighted && (
                  <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmer 3s ease-in-out infinite", backgroundSize: "200% 100%" }} />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
