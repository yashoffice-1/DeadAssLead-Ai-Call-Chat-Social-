import { UploadCloud, MessageCircle, Target, CalendarPlus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HowItWorksSection() {
  const steps = [
    {
      id: "Step 1",
      title: "Upload Your Leads",
      description: "Import old leads from your CRM or spreadsheet.",
      icon: UploadCloud,
    },
    {
      id: "Step 2",
      title: "AI Starts Conversations",
      description: "AI sends personalized SMS messages or voice calls.",
      icon: MessageCircle,
    },
    {
      id: "Step 3",
      title: "Leads Get Qualified",
      description: "The AI detects interest and qualifies prospects.",
      icon: Target,
    },
    {
      id: "Step 4",
      title: "Meetings Get Booked",
      description: "Qualified leads are automatically scheduled on your calendar.",
      icon: CalendarPlus,
    },
  ]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How DeadAssLead Works
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-border -z-10">
              <div className="h-full bg-emerald-500 w-full animate-flow-dash" style={{ strokeDasharray: "100", strokeDashoffset: "100" }} />
            </div>

            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group animate-view-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-background border-4 border-card shadow-lg mb-6 group-hover:border-emerald-500/30 transition-colors z-10 relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 group-hover:scale-110 transition-transform -z-10" />
                  <step.icon className="h-8 w-8 text-primary group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-emerald-500 mb-2">{step.id}</h3>
                <h4 className="text-lg font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/demo">
            <Button size="lg" className="rounded-xl px-8 gap-2 group shadow-xl">
              See It In Action
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
