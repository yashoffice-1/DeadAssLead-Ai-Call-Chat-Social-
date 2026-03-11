"use client"

import { useState, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"

const fullMessage =
  'Connect my TikTok and use ElevenLabs "Adam" voice to call anyone who DMs me about pricing.'

function TypingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-muted-foreground"
          style={{
            animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function FlowMap() {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-4">
        <Sparkles className="h-3 w-3" />
        Flow Map — Auto Generated
      </div>
      {/* Mobile: vertical flow */}
      <div className="flex flex-col items-center gap-3 py-2 sm:hidden">
        {[
          { label: "TikTok", sub: "DM Trigger", color: "from-pink-50 to-rose-50" },
          { label: "AI", sub: "Process", color: "from-blue-50 to-indigo-50" },
          { label: "ElevenLabs", sub: "Adam Voice", color: "from-violet-50 to-purple-50" },
          { label: "Vapi", sub: "Outbound Call", color: "from-emerald-50 to-green-50" },
        ].map((node, i) => (
          <div key={node.label} className="flex flex-col items-center gap-2">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br ${node.color} text-[10px] font-bold text-foreground shadow-sm`}>
              {node.label}
            </div>
            <span className="text-[10px] text-muted-foreground">{node.sub}</span>
            {i < 3 && (
              <svg width="12" height="24" className="shrink-0 text-muted-foreground">
                <line x1="6" y1="0" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                <polygon points="2,16 6,24 10,16" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/* Desktop: horizontal flow */}
      <div className="hidden items-center justify-center gap-4 overflow-x-auto py-4 sm:flex">
        {[
          { label: "TikTok", sub: "DM Trigger", color: "from-pink-50 to-rose-50" },
          { label: "AI", sub: "Process", color: "from-blue-50 to-indigo-50" },
          { label: "ElevenLabs", sub: "Adam Voice", color: "from-violet-50 to-purple-50" },
          { label: "Vapi", sub: "Outbound Call", color: "from-emerald-50 to-green-50" },
        ].map((node, i) => (
          <div key={node.label} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-gradient-to-br ${node.color} text-xs font-bold text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md`}>
                {node.label}
              </div>
              <span className="text-[10px] text-muted-foreground">{node.sub}</span>
            </div>
            {i < 3 && (
              <svg width="40" height="12" className="shrink-0">
                <line
                  x1="0" y1="6" x2="32" y2="6"
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  style={{
                    strokeDashoffset: 40,
                    animation: "flow-dash 1.5s ease forwards",
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
                <polygon
                  points="32,2 40,6 32,10"
                  fill="currentColor"
                  className="text-muted-foreground"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConversationalSetup() {
  const [displayedText, setDisplayedText] = useState("")
  const [showReply, setShowReply] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    const el = document.getElementById("conversational-setup")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowReply(true), 800)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [started])

  return (
    <section id="conversational-setup" className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-100/40 to-transparent blur-3xl sm:h-[400px] sm:w-[400px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-2 inline-flex items-center rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm">
          Conversational Setup
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Configure everything via chat.
        </h2>
        <p className="mb-8 max-w-xl text-sm text-muted-foreground leading-relaxed sm:mb-12 sm:text-base">
          Integrating complex tools is as easy as sending a chat message. Describe
          what you want, and the AI builds the workflow instantly.
        </p>

        {/* Chat Window */}
        <div className="rounded-2xl border border-border bg-white shadow-lg shadow-black/[0.03]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 sm:px-6 sm:py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-300/80 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-300/80 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-300/80 sm:h-3 sm:w-3" />
            <span className="ml-3 text-[10px] text-muted-foreground sm:ml-4 sm:text-xs">DeadAssLead Chat</span>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {/* User message */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary/80 sm:h-8 sm:w-8">
                  <User className="h-3.5 w-3.5 text-secondary-foreground sm:h-4 sm:w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-md border border-border bg-secondary/80 px-3 py-2.5 text-xs text-secondary-foreground sm:px-4 sm:py-3 sm:text-sm">
                  {displayedText}
                  {displayedText.length < fullMessage.length && (
                    <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-foreground" />
                  )}
                </div>
              </div>

              {/* AI reply */}
              {showReply ? (
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground sm:h-8 sm:w-8">
                    <Bot className="h-3.5 w-3.5 text-background sm:h-4 sm:w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md border border-emerald-200/60 bg-emerald-50/50 px-3 py-2.5 text-xs text-foreground sm:px-4 sm:py-3 sm:text-sm">
                    <span className="mb-1 mr-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI
                    </span>
                    Done. TikTok connected. ElevenLabs &quot;Adam&quot; voice loaded. Any DM
                    about pricing will trigger an outbound call via Vapi. Your flow
                    is live.
                  </div>
                </div>
              ) : displayedText.length === fullMessage.length ? (
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground sm:h-8 sm:w-8">
                    <Bot className="h-3.5 w-3.5 text-background sm:h-4 sm:w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md border border-border px-3 py-2.5 sm:px-4 sm:py-3">
                    <TypingDots />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3 py-2.5 transition-colors focus-within:border-foreground/30 focus-within:bg-white sm:mt-6 sm:px-4 sm:py-3">
              <input
                readOnly
                className="flex-1 bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
                placeholder="Type a command..."
              />
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground transition-all hover:bg-foreground/90 sm:h-7 sm:w-7">
                <Send className="h-2.5 w-2.5 text-background sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>
        </div>

        <FlowMap />
      </div>
    </section>
  )
}
