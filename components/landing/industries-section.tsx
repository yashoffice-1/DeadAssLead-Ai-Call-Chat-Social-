import { Home, Sun, ShieldCheck, Landmark, Wrench, Megaphone } from "lucide-react"

export function IndustriesSection() {
  const industries = [
    {
      title: "Real Estate",
      description: "Reactivate old buyer and seller leads who stopped replying months ago.",
      icon: Home,
    },
    {
      title: "Solar Companies",
      description: "Book appointments from homeowners who previously denied quotes.",
      icon: Sun,
    },
    {
      title: "Insurance",
      description: "Follow up with lost policy quotes automatically.",
      icon: ShieldCheck,
    },
    {
      title: "Mortgage Brokers",
      description: "Re-engage applications that fell off during the qualification process.",
      icon: Landmark,
    },
    {
      title: "Home Services",
      description: "Turn cancelled appointments into rescheduled jobs.",
      icon: Wrench,
    },
    {
      title: "Marketing Agencies",
      description: "Provide an automated reactivation service for your own clients.",
      icon: Megaphone,
    },
  ]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Built For High Lead Businesses
          </h2>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div 
                key={industry.title} 
                className="group flex flex-col items-start gap-4 rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:bg-card/80 hover:shadow-lg animate-card-enter hover:border-emerald-500/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-transform group-hover:scale-110">
                  <industry.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{industry.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
