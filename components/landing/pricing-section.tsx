import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    contacts: "0 - 100 contacts",
    features: [
      "Basic AI DM responses",
      "1 social platform",
      "Community support",
      "Standard response time",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    contacts: "100 - 1,000 contacts",
    features: [
      "Private VPS deployment",
      "All social platforms",
      "Voice suite included",
      "Priority support",
      "Custom AI training",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$599",
    period: "/month",
    contacts: "1,000 - 5,000 contacts",
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
  },
]

export function PricingSection() {
  return (
    <section className="px-6 py-24" suppressHydrationWarning>
      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>
          Pricing
        </div>
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Simple, transparent pricing.
        </h2>
        <p className="mx-auto mb-16 max-w-lg text-center text-muted-foreground leading-relaxed">
          Start free, scale when you are ready. Every plan comes with your own
          private AI instance.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-8 transition-shadow ${plan.highlighted
                ? "border-foreground shadow-lg"
                : "border-border"
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{plan.contacts}</div>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full rounded-lg py-3 text-center text-sm font-medium transition-all active:scale-[0.98] ${plan.highlighted
                  ? "bg-foreground text-background hover:opacity-90"
                  : "border border-border bg-background text-foreground hover:bg-secondary"
                  }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
