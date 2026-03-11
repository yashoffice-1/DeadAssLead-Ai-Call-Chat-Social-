"use client"

import { useState } from "react"
import { ArrowRight, Loader2, Rocket, Sparkles } from "lucide-react"

export function SignupSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  if (submitted) {
    return (
      <section id="signup" className="px-4 py-16 sm:px-6 sm:py-24" suppressHydrationWarning>
        <div className="mx-auto max-w-3xl" suppressHydrationWarning>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            <div className="mb-4 flex items-center gap-2 border-b border-border px-4 pt-4 pb-3 sm:mb-6 sm:px-8 sm:pt-6 sm:pb-4">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-foreground sm:text-sm">DeadAssLead Dashboard</span>
            </div>
            <div className="px-4 pb-6 sm:px-8 sm:pb-8">
              <div className="mb-4 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 border border-emerald-200/60 sm:items-center sm:px-4 sm:py-3">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5 sm:mt-0" />
                <p className="text-xs text-emerald-700 sm:text-sm">
                  Welcome, {name}. Your private AI instance is deploying.
                </p>
              </div>
              <p className="mb-4 text-xs text-muted-foreground sm:mb-6 sm:text-sm">
                Start by typing your first command below.
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3 py-2.5 sm:px-4 sm:py-3">
                <span className="text-xs text-muted-foreground sm:text-sm">{">"}</span>
                <input
                  readOnly
                  className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
                  placeholder="Make a Great Start — type your first command..."
                />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24" suppressHydrationWarning>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/40 via-violet-100/30 to-emerald-100/20 blur-3xl sm:h-[500px] sm:w-[700px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center" suppressHydrationWarning>
        <div className="mb-2 flex justify-center" suppressHydrationWarning>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm">
            <Rocket className="h-3 w-3" />
            Get Started
          </span>
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Ready to Deploy?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground leading-relaxed sm:mb-12 sm:text-base">
          Sign up and your private AI instance begins deploying immediately.
          No credit card required for the free plan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-3 sm:space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none shadow-sm transition-all placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-md focus:ring-1 focus:ring-foreground/10 sm:py-3.5"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none shadow-sm transition-all placeholder:text-muted-foreground focus:border-foreground/30 focus:shadow-md focus:ring-1 focus:ring-foreground/10 sm:py-3.5"
          />
          <button
            type="submit"
            disabled={loading}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:shadow-xl hover:shadow-foreground/10 active:scale-[0.97] disabled:opacity-70 sm:py-3.5"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deploying your instance...
              </>
            ) : (
              <>
                <span className="relative z-10">Make a Great Start</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmer 3s ease-in-out infinite", backgroundSize: "200% 100%" }} />
          </button>
        </form>

        <p className="mt-4 text-[10px] text-muted-foreground sm:mt-6 sm:text-xs">
          Free plan includes 100 contacts · No credit card required · Deploy in 60 seconds
        </p>
      </div>
    </section>
  )
}
