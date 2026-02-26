"use client"

function PulseIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-background">
        <div
          className="absolute inset-0 rounded-xl border-2 border-emerald-400/40"
          style={{ animation: "pulse-ring 2s ease-out infinite" }}
        />
        {children}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.68a8.22 8.22 0 003.76.92V6.15a4.85 4.85 0 01-.01.54z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function VapiIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight">Vapi</span>
}

function RetellIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight">Retell</span>
}

function ElevenLabsIcon() {
  return <span className="text-[10px] font-bold text-foreground leading-tight text-center">Eleven<br />Labs</span>
}

function DeepgramIcon() {
  return <span className="text-[10px] font-bold text-foreground leading-tight text-center">Deep<br />gram</span>
}

function PlivoIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight">Plivo</span>
}

export function ConnectionHub() {
  return (
    <section className="px-6 py-24" suppressHydrationWarning>
      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>
          Connection Hub
        </div>
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Connect everything in one place.
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-xl border border-border p-8">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Social Platforms
            </h3>
            <div className="flex items-center justify-center gap-8">
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
          <div className="rounded-xl border border-border p-8">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Voice Suite
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <PulseIcon label="Vapi">
                <VapiIcon />
              </PulseIcon>
              <PulseIcon label="Retell">
                <RetellIcon />
              </PulseIcon>
              <PulseIcon label="ElevenLabs">
                <ElevenLabsIcon />
              </PulseIcon>
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
    </section>
  )
}
