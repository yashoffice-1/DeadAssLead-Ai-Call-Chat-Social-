import { ArrowUpRight } from "lucide-react"

export function ResultsSection() {
  const metrics = [
    { label: "Leads Uploaded", value: "96" },
    { label: "Conversations Started", value: "38" },
    { label: "Qualified Leads", value: "17" },
    { label: "Meetings Booked", value: "8" },
    { label: "Closed Deals", value: "5", highlight: true },
  ]

  return (
    <section className="relative overflow-hidden bg-zinc-950 dark:bg-zinc-950 py-24 sm:py-32 text-zinc-50" suppressHydrationWarning>
      {/* Dark background styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Real Results From Dead Leads
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            Results vary by industry, but our AI consistently unlocks hidden revenue that would otherwise be lost forever.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label} 
              className={`flex flex-col p-6 rounded-2xl border ${metric.highlight ? 'bg-emerald-500 border-emerald-400 text-white col-span-2 lg:col-span-1 shadow-emerald-500/20 shadow-xl' : 'bg-white/5 border-white/10 text-zinc-100'} animate-card-enter items-center text-center justify-center relative overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-extrabold mb-2 tracking-tighter flex items-center">
                {metric.value}
                {metric.highlight && <ArrowUpRight className="w-6 h-6 ml-2 text-white/50" />}
              </div>
              <div className={`text-sm font-medium ${metric.highlight ? 'text-white/80' : 'text-zinc-400'}`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
