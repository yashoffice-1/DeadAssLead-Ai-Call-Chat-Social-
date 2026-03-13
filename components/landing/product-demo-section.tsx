import { PlayCircle } from "lucide-react"

export function ProductDemoSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            See The AI In Action
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Watch how the AI agent starts conversations with old leads and books appointments automatically.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-border/50 bg-card/50 p-2 sm:p-4 shadow-2xl relative group overflow-hidden animate-view-in container-zoom cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Mock Video Thumbnail */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted flex items-center justify-center border border-border bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-none" />
            
            {/* Play Button Overlay */}
            <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
               <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
               <PlayCircle className="h-10 w-10 fill-white text-emerald-500" />
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white shadow-sm border border-white/10">
                <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Live Demo
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button className="rounded-xl bg-foreground px-8 py-4 text-background font-semibold hover:bg-foreground/90 transition-colors shadow-lg shadow-foreground/10 active:scale-95">
            Watch Full Demo
          </button>
        </div>
      </div>
    </section>
  )
}
