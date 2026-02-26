"use client"

import { useState, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

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
    <div className="mt-8 rounded-xl border border-border p-6">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Flow Map — Auto Generated
      </div>
      <div className="flex items-center justify-center gap-4 overflow-x-auto py-4">
        {[
          { label: "TikTok", sub: "DM Trigger" },
          { label: "AI", sub: "Process" },
          { label: "ElevenLabs", sub: "Adam Voice" },
          { label: "Vapi", sub: "Outbound Call" },
        ].map((node, i) => (
          <div key={node.label} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-secondary text-xs font-bold text-secondary-foreground">
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
    <section id="conversational-setup" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Conversational Setup
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Configure everything via chat.
        </h2>
        <p className="mb-12 max-w-xl text-muted-foreground leading-relaxed">
          Integrating complex tools is as easy as sending a chat message. Describe
          what you want, and the AI builds the workflow instantly.
        </p>

        <div className="rounded-xl border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-6 py-3">
            <div className="h-3 w-3 rounded-full bg-border" />
            <div className="h-3 w-3 rounded-full bg-border" />
            <div className="h-3 w-3 rounded-full bg-border" />
            <span className="ml-4 text-xs text-muted-foreground">DeadAssLead Chat</span>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* User message */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="rounded-lg rounded-tl-none border border-border bg-secondary px-4 py-3 text-sm text-secondary-foreground">
                  {displayedText}
                  {displayedText.length < fullMessage.length && (
                    <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-foreground" />
                  )}
                </div>
              </div>

              {/* AI reply */}
              {showReply ? (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                    <Bot className="h-4 w-4 text-background" />
                  </div>
                  <div className="rounded-lg rounded-tl-none border border-border px-4 py-3 text-sm text-foreground">
                    Done. TikTok connected. ElevenLabs &quot;Adam&quot; voice loaded. Any DM
                    about pricing will trigger an outbound call via Vapi. Your flow
                    is live.
                  </div>
                </div>
              ) : displayedText.length === fullMessage.length ? (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                    <Bot className="h-4 w-4 text-background" />
                  </div>
                  <div className="rounded-lg rounded-tl-none border border-border px-4 py-3">
                    <TypingDots />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Input */}
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-border px-4 py-3">
              <input
                readOnly
                className="flex-1 bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Type a command..."
              />
              <Send className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <FlowMap />
      </div>
    </section>
  )
}
