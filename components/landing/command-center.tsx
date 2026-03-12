"use client"

import { MessageSquare, Phone } from "lucide-react"

const socialInboxData = [
  {
    platform: "Instagram",
    platformColor: "bg-gradient-to-br from-pink-500 to-violet-500",
    user: "@sarah.d",
    message: "Hey! What are your pricing plans?",
    status: "AI Replied",
    time: "2m ago",
  },
  {
    platform: "TikTok",
    platformColor: "bg-foreground",
    user: "@mike_builds",
    message: "Can I get a demo of the product?",
    status: "AI Replied",
    time: "5m ago",
  },
  {
    platform: "Facebook",
    platformColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    user: "Jessica Lee",
    message: "Interested in the Business plan.",
    status: "Pending",
    time: "12m ago",
  },
  {
    platform: "Instagram",
    platformColor: "bg-gradient-to-br from-pink-500 to-violet-500",
    user: "@tech.ryan",
    message: "Do you offer annual billing?",
    status: "AI Replied",
    time: "18m ago",
  },
]

const voiceHistoryData = [
  {
    contact: "Sarah D.",
    avatar: "SD",
    duration: "3:42",
    transcript: "Discussed Pro plan pricing and VPS setup details...",
    sentiment: "Interested",
  },
  {
    contact: "Mike B.",
    avatar: "MB",
    duration: "5:15",
    transcript: "Requested demo walkthrough, asked about integrations...",
    sentiment: "Follow-up needed",
  },
  {
    contact: "Jessica L.",
    avatar: "JL",
    duration: "2:08",
    transcript: "Quick check on Business plan features and support...",
    sentiment: "Interested",
  },
]

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const isInterested = sentiment === "Interested"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs ${
        isInterested
          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30"
          : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/30"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isInterested ? "bg-emerald-500" : "bg-amber-500"}`} />
      {sentiment}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isReplied = status === "AI Replied"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs ${
        isReplied
          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30"
          : "bg-secondary text-secondary-foreground border border-border"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isReplied ? "bg-emerald-500" : "bg-amber-400"}`} />
      {status}
    </span>
  )
}

export function CommandCenter() {
  return (
    <section className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24" suppressHydrationWarning>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-2 inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm" suppressHydrationWarning>
          Unified Command Center
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Every message. Every call. One view.
        </h2>
        <p className="mb-8 max-w-xl text-sm text-muted-foreground leading-relaxed sm:mb-12 sm:text-base">
          Monitor all your social interactions and voice calls from a single, unified dashboard.
        </p>

        {/* Social Inbox */}
        <div suppressHydrationWarning className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mb-8">
          <div suppressHydrationWarning className="flex items-center gap-2 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
            <div suppressHydrationWarning className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
              <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Social Inbox</h3>
            <span className="ml-auto inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/60">
              4 messages
            </span>
          </div>

          {/* Mobile: Card layout */}
          <div suppressHydrationWarning className="divide-y divide-border/50 sm:hidden">
            {socialInboxData.map((row, i) => (
              <div suppressHydrationWarning key={i} className="px-4 py-3 space-y-2">
                <div suppressHydrationWarning className="flex items-center justify-between">
                  <div suppressHydrationWarning className="flex items-center gap-2">
                    <div suppressHydrationWarning className={`h-2 w-2 rounded-full ${row.platformColor}`} />
                    <span className="text-xs font-medium text-foreground">{row.platform}</span>
                    <span className="text-xs text-muted-foreground">· {row.user}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{row.time}</span>
                </div>
                <p className="text-xs text-foreground line-clamp-2">{row.message}</p>
                <StatusBadge status={row.status} />
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Platform</th>
                  <th className="px-6 py-3 font-medium">User</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {socialInboxData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30"
                  >
                    <td className="px-6 py-4">
                      <div suppressHydrationWarning className="flex items-center gap-2">
                        <div suppressHydrationWarning className={`h-2 w-2 rounded-full ${row.platformColor}`} />
                        <span className="font-medium text-foreground">{row.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.user}</td>
                    <td className="max-w-xs truncate px-6 py-4 text-foreground">{row.message}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Voice History */}
        <div suppressHydrationWarning className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div suppressHydrationWarning className="flex items-center gap-2 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
            <div suppressHydrationWarning className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
              <Phone className="h-3.5 w-3.5 text-violet-600" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Voice History</h3>
            <span className="ml-auto inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200/60">
              3 calls
            </span>
          </div>

          {/* Mobile: Card layout */}
          <div suppressHydrationWarning className="divide-y divide-border/50 sm:hidden">
            {voiceHistoryData.map((row, i) => (
              <div suppressHydrationWarning key={i} className="px-4 py-3 space-y-2">
                <div suppressHydrationWarning className="flex items-center justify-between">
                  <div suppressHydrationWarning className="flex items-center gap-2">
                    <div suppressHydrationWarning className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-foreground">
                      {row.avatar}
                    </div>
                    <span className="text-xs font-medium text-foreground">{row.contact}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{row.duration}</span>
                </div>
                <p className="text-xs text-foreground line-clamp-2">{row.transcript}</p>
                <SentimentBadge sentiment={row.sentiment} />
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div suppressHydrationWarning className="hidden overflow-x-auto sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Duration</th>
                  <th className="px-6 py-3 font-medium">Transcription</th>
                  <th className="px-6 py-3 font-medium">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {voiceHistoryData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30"
                  >
                    <td className="px-6 py-4">
                      <div suppressHydrationWarning className="flex items-center gap-2.5">
                        <div suppressHydrationWarning className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-foreground">
                          {row.avatar}
                        </div>
                        <span className="font-medium text-foreground">{row.contact}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-muted-foreground">{row.duration}</span>
                    </td>
                    <td className="max-w-sm truncate px-6 py-4 text-foreground">{row.transcript}</td>
                    <td className="px-6 py-4">
                      <SentimentBadge sentiment={row.sentiment} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
