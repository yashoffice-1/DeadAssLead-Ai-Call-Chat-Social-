"use client"

function PulseIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/50">
        <div
          className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:animate-[pulse-ring_2.5s_ease-out_infinite]"
        />
        {children}
      </div>
      <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">{label}</span>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110">
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
    <svg viewBox="0 0 24 24" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" fill="none">
      <path d="M12.525 2.15v14.482a2.91 2.91 0 1 1-2.91-2.91c.29-.001.577.04.852.12v-3.411a6.38 6.38 0 0 0-4.045 5.952c0 3.52 2.855 6.375 6.375 6.375 3.52 0 6.375-2.855 6.375-6.375A2.3 2.3 0 0 1 12.525 2.15Z" fill="#000" className="dark:fill-white" />
      <path d="M12.525 2.15v5.827c1.472-.325 3.018-.152 4.41.488.756.286 1.442.71 2.016 1.25V5.51a8.4 8.4 0 0 0-6.426-3.36Z" fill="#00F2FE" />
      <path d="M12.525 7.977c1.472-.325 3.018-.152 4.41.488V12c-1.282-.128-2.583-.027-3.834.3v-4.323Z" fill="#FE2C55" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877f2" />
      <path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.003c0 0-1.374-.235-2.686-.235-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#fff" />
    </svg>
  )
}

function VapiIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight transition-transform duration-300 group-hover:scale-110">Vapi</span>
}

function RetellIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight transition-transform duration-300 group-hover:scale-110">Retell</span>
}

function ElevenLabsIcon() {
  return <span className="text-[11px] font-bold text-foreground leading-none text-center transition-transform duration-300 group-hover:scale-110">Eleven<br />Labs</span>
}

function DeepgramIcon() {
  return <span className="text-[11px] font-bold text-foreground leading-none text-center transition-transform duration-300 group-hover:scale-110">Deep<br />gram</span>
}

function PlivoIcon() {
  return <span className="text-sm font-bold text-foreground tracking-tight transition-transform duration-300 group-hover:scale-110">Plivo</span>
}

export function ConnectionHub() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-muted/20" />
      <div className="absolute inset-y-0 left-1/2 -z-10 w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(0,0,0,0))]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center animate-[fade-in-up_0.6s_ease-out_both]">
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Connection Hub
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Connect everything in one place.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground mx-auto max-w-xl">
            Integrate all your social platforms and voice tools seamlessly. One dashboard, every channel instantly reacting to dead leads.
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-5xl flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-8">
          {/* Social Platforms Card */}
          <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-card/50 px-8 py-12 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/30 dark:hover:bg-card/80 animate-[card-enter_0.6s_ease-out_0.2s_both] md:w-1/2">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-foreground text-center">
                Social Platforms
              </h3>
              <div className="flex w-full items-center justify-center gap-6 sm:gap-10">
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
          </div>

          {/* Voice Suite Card */}
          <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-card/50 px-8 py-12 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/30 dark:hover:bg-card/80 animate-[card-enter_0.6s_ease-out_0.3s_both] md:w-1/2">
            <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-foreground text-center">
                Voice Suite
              </h3>
              <div className="grid grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 w-full max-w-sm">
                <PulseIcon label="Vapi">
                  <VapiIcon />
                </PulseIcon>
                <PulseIcon label="Retell">
                  <RetellIcon />
                </PulseIcon>
                <PulseIcon label="ElevenLabs">
                  <ElevenLabsIcon />
                </PulseIcon>
                <div className="col-span-3 flex justify-center gap-6 sm:contents">
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
      </div>
    </section>
  )
}
