import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-foreground/5" />
      <div className="absolute inset-0 -z-10 overflow-hidden" style={{ animation: "gradient-x 15s ease infinite" }}>
        <div className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.emerald.500/15)_0%,transparent_50%)] mix-blend-multiply blur-3xl opacity-70" />
        <div className="absolute -right-1/4 -top-1/4 h-[150%] w-[150%] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.blue.500/10)_0%,transparent_50%)] mix-blend-multiply blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl rounded-3xl bg-zinc-950/95 dark:bg-zinc-900/95 px-6 py-20 text-center shadow-2xl backdrop-blur sm:rounded-3xl sm:px-16 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-10" />

          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl text-balance relative z-10">
            Ready To Turn Dead Leads Into Sales?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70 relative z-10">
            Upload your old leads and let AI start conversations that book meetings automatically.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 relative z-10">
            <button className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-emerald-400 hover:shadow-emerald-500/25 transition-all active:scale-95 duration-200">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
