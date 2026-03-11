"use client"

function PulseIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2 sm:gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-emerald-300/60 sm:h-16 sm:w-16 sm:rounded-2xl">
        <div
          className="absolute inset-0 rounded-xl border-2 border-emerald-400/30 sm:rounded-2xl"
          style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
        />
        {children}
      </div>
      <span className="text-[10px] font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">{label}</span>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground sm:h-7 sm:w-7" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.68a8.22 8.22 0 003.76.92V6.15a4.85 4.85 0 01-.01.54z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground sm:h-7 sm:w-7" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function VapiIcon() {
  return <span className="text-xs font-bold text-foreground tracking-tight sm:text-sm">Vapi</span>
}

function RetellIcon() {
  return <span className="text-xs font-bold text-foreground tracking-tight sm:text-sm">Retell</span>
}

function ElevenLabsIcon() {
  return <span className="text-[8px] font-bold text-foreground leading-tight text-center sm:text-[10px]">Eleven<br />Labs</span>
}

function DeepgramIcon() {
  return <span className="text-[8px] font-bold text-foreground leading-tight text-center sm:text-[10px]">Deep<br />gram</span>
}

function PlivoIcon() {
  return <span className="text-xs font-bold text-foreground tracking-tight sm:text-sm">Plivo</span>
}

export function ConnectionHub() {
  return (
    <section className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24" suppressHydrationWarning>
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />

      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-2 inline-flex items-center rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm" suppressHydrationWarning>
          Connection Hub
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Connect everything in one place.
        </h2>
        <p className="mb-8 max-w-xl text-sm text-muted-foreground leading-relaxed sm:mb-12 sm:text-base">
          Integrate all your social platforms and voice tools seamlessly. One dashboard, every channel.
        </p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Social Platforms Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-border/60 sm:p-8">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-100/50 to-pink-100/30 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <h3 className="relative mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground sm:mb-6">
              Social Platforms
            </h3>
            <div className="relative flex items-center justify-center gap-5 sm:gap-8">
              <PulseIcon label="Instagram">
                <InstagramIcon />
              </PulseIcon>
              <PulseIcon label="TikTok">
                <TikTokIcon />
              </PulseIcon>
              <PulseIcon label="Facebook">
                <FacebookIcon />
              </PulseIcon>
            </div>
          </div>

          {/* Voice Suite Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-border/60 sm:p-8">
            <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100/50 to-cyan-100/30 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <h3 className="relative mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground sm:mb-6">
              Voice Suite
            </h3>
            <div className="relative grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
              <PulseIcon label="Vapi">
                <VapiIcon />
              </PulseIcon>
              <PulseIcon label="Retell">
                <RetellIcon />
              </PulseIcon>
              <PulseIcon label="ElevenLabs">
                <ElevenLabsIcon />
              </PulseIcon>
              <div className="col-span-3 flex justify-center gap-4 sm:contents">
                <PulseIcon label="Deepgram">
                  <DeepgramIcon />
                </PulseIcon>
                <PulseIcon label="Plivo">
                  <PlivoIcon />
                </PulseIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
