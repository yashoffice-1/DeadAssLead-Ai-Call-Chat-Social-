"use client"

import { ArrowRight, MessageSquare, PhoneCall, Calendar } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 pt-24 pb-16 text-center sm:px-6 md:pt-40 md:pb-32" suppressHydrationWarning>
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" suppressHydrationWarning>
        <div className="absolute left-1/2 top-0 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-emerald-100/60 via-blue-100/40 to-violet-100/30 blur-3xl sm:h-[450px] sm:w-[700px] md:h-[600px] md:w-[900px] opacity-70 dark:opacity-20" suppressHydrationWarning />
        <div className="absolute right-0 top-1/4 h-[200px] w-[200px] rounded-full bg-gradient-to-l from-emerald-100/40 to-transparent blur-3xl md:h-[300px] md:w-[300px] opacity-70 dark:opacity-20" suppressHydrationWarning />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" suppressHydrationWarning />
      </div>

      {/* Floating grid dots */}
      <div className="pointer-events-none absolute inset-0 -z-10" suppressHydrationWarning style={{
        backgroundImage: "radial-gradient(circle, oklch(0.85 0 0) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.4,
      }} />

      {/* Badge */}
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
        style={{ animation: "fade-in-up 0.6s ease-out" }}
        suppressHydrationWarning
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        AI Lead Reactivation Platform
      </div>

      {/* Heading */}
      <h1
        className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-7xl"
        style={{ animation: "fade-in-up 0.6s ease-out 0.1s both" }}
      >
        Your Private {" "}
        <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
          AI Social & Call
        </span>{" "}
        Center.
      </h1>

      {/* Sub */}
      <p
        className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl"
        style={{ animation: "fade-in-up 0.6s ease-out 0.2s both" }}
      >
        Upload your old CRM leads and let our AI SMS and voice agents start real conversations that qualify prospects and book meetings automatically.
      </p>

      {/* CTA */}
      <div
        suppressHydrationWarning
        className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
        style={{ animation: "fade-in-up 0.6s ease-out 0.3s both" }}
      >
        <a
          href="#pricing"
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 text-base font-medium text-background transition-all hover:shadow-2xl hover:shadow-foreground/10 active:scale-[0.97] sm:w-auto sm:px-8 sm:py-4"
        >
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmer 3s ease-in-out infinite", backgroundSize: "200% 100%" }} />
        </a>
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-background hover:shadow-sm sm:w-auto sm:py-4"
        >
          Watch Demo
        </button>
      </div>

      {/* Trust badges */}
      <div
        suppressHydrationWarning
        className="mt-10 flex flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8"
        style={{ animation: "fade-in-up 0.6s ease-out 0.5s both" }}
      >
        {[
          { icon: MessageSquare, label: "AI SMS Conversations" },
          { icon: PhoneCall, label: "AI Voice Agents" },
          { icon: Calendar, label: "Automated Booking" },
        ].map(({ icon: Icon, label }) => (
          <div suppressHydrationWarning key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div suppressHydrationWarning className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Icon className="h-4 w-4" />
            </div>
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}

