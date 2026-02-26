"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <div className="mb-4 inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
        Now deploying private AI instances
      </div>
      <h1 className="max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
        Your Private AI Social {"&"} Call Center.
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        DeadAssLead deploys a personal AI instance on a private VPS, ensuring
        all your DMs and calls are 100% secure. One platform, total control.
      </p>
      <Link
        href="/dashboard"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Make a Great Start
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
