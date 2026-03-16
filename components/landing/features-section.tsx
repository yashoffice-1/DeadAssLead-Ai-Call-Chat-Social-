import { MessageSquare, PhoneCall, CheckCircle, RefreshCw, Database, BarChart } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "AI SMS Conversations",
      description: "Engage thousands of old leads instantly with human-like SMS outreach that doesn't sound like a bot.",
      icon: MessageSquare,
    },
    {
      title: "AI Voice Calling Agent",
      description: "Deploy highly realistic AI voice agents that call your lost leads, handle objections, and qualify them over the phone.",
      icon: PhoneCall,
    },
    {
      title: "Smart Lead Qualification",
      description: "Our AI asks the right questions based on your custom criteria to ensure only hot prospects make it to your team.",
      icon: CheckCircle,
    },
    {
      title: "Automated Follow Ups",
      description: "Never miss a touchpoint. The system intelligently knows when to follow up if a lead stops responding.",
      icon: RefreshCw,
    },
    {
      title: "CRM Integration",
      description: "Deep, seamless integration with Salesforce, HubSpot, GoHighLevel, and more. Sync back all data automatically.",
      icon: Database,
    },
    {
      title: "Conversation Analytics",
      description: "Track sentiment, objection rates, and appointment conversion metrics on a beautiful real-time dashboard.",
      icon: BarChart,
    },
  ]

  return (
    <section id="features" className="relative overflow-hidden bg-muted/30 py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Powerful AI Automation
          </h2>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="group relative flex flex-col items-start gap-4 rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30 animate-card-enter overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-500">
                   <feature.icon className="w-32 h-32" />
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 relative z-10 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-500">
                  <feature.icon className="h-7 w-7 text-foreground/70 group-hover:text-emerald-500 shrink-0" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground relative z-10">{feature.title}</h3>
                <p className="mt-2 text-base text-muted-foreground relative z-10 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
