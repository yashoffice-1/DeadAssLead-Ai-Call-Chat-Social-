"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

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
      <section id="signup" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-foreground">DeadAssLead Dashboard</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Welcome, {name}. Your private AI instance is deploying. Start by typing your first command.
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-3">
              <span className="text-sm text-muted-foreground">{">"}</span>
              <input
                readOnly
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Make a Great Start — type your first command..."
              />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Get Started
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Ready to Deploy?
        </h2>
        <p className="mx-auto mb-12 max-w-md text-muted-foreground leading-relaxed">
          Sign up and your private AI instance begins deploying immediately.
          No credit card required for the free plan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deploying your instance...
              </>
            ) : (
              <>
                Make a Great Start
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
