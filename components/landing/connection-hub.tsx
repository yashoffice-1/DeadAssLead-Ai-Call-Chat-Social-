"use client"

function PulseIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2 sm:gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-emerald-300/60 sm:h-16 sm:w-16 sm:rounded-2xl">
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
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7">
      <defs>
        <radialGradient id="ig-grad" r="1.375" cy="0.915" cx="0.271">
          <stop stopColor="#fd5" offset="0" />
          <stop stopColor="#fd5" offset="0.05" />
          <stop stopColor="#ff543e" offset="0.14" />
          <stop stopColor="#c837ab" offset="0.22" />
          <stop stopColor="#8124ef" offset="0.33" />
          <stop stopColor="#2b9cd1" offset="1" />
        </radialGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.162c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7" fill="none">
      <path d="M12.525 2.15v14.482a2.91 2.91 0 1 1-2.91-2.91c.29-.001.577.04.852.12v-3.411a6.38 6.38 0 0 0-4.045 5.952c0 3.52 2.855 6.375 6.375 6.375 3.52 0 6.375-2.855 6.375-6.375A2.3 2.3 0 0 1 12.525 2.15Z" fill="#000" className="dark:fill-white" />
      <path d="M12.525 2.15v5.827c1.472-.325 3.018-.152 4.41.488.756.286 1.442.71 2.016 1.25V5.51a8.4 8.4 0 0 0-6.426-3.36Z" fill="#00F2FE" />
      <path d="M12.525 7.977c1.472-.325 3.018-.152 4.41.488V12c-1.282-.128-2.583-.027-3.834.3v-4.323Z" fill="#FE2C55" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877f2" />
      <path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.003c0 0-1.374-.235-2.686-.235-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#fff" />
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
        <div className="mb-2 inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm" suppressHydrationWarning>
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
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-border/60 sm:p-8">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-100/50 to-pink-100/30 dark:from-violet-900/30 dark:to-pink-900/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
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
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-border/60 sm:p-8">
            <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100/50 to-cyan-100/30 dark:from-emerald-900/30 dark:to-cyan-900/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
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
