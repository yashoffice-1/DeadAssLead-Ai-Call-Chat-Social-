import { MessageSquare, Phone } from "lucide-react"

const socialInboxData = [
  {
    platform: "Instagram",
    user: "@sarah.d",
    message: "Hey! What are your pricing plans?",
    status: "AI Replied",
    time: "2m ago",
  },
  {
    platform: "TikTok",
    user: "@mike_builds",
    message: "Can I get a demo of the product?",
    status: "AI Replied",
    time: "5m ago",
  },
  {
    platform: "Facebook",
    user: "Jessica Lee",
    message: "Interested in the Business plan.",
    status: "Pending",
    time: "12m ago",
  },
  {
    platform: "Instagram",
    user: "@tech.ryan",
    message: "Do you offer annual billing?",
    status: "AI Replied",
    time: "18m ago",
  },
]

const voiceHistoryData = [
  {
    contact: "Sarah D.",
    duration: "3:42",
    transcript: "Discussed Pro plan pricing and VPS setup details...",
    sentiment: "Interested",
  },
  {
    contact: "Mike B.",
    duration: "5:15",
    transcript: "Requested demo walkthrough, asked about integrations...",
    sentiment: "Follow-up needed",
  },
  {
    contact: "Jessica L.",
    duration: "2:08",
    transcript: "Quick check on Business plan features and support...",
    sentiment: "Interested",
  },
]

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const isInterested = sentiment === "Interested"
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isInterested
        ? "bg-emerald-50 text-emerald-700"
        : "bg-amber-50 text-amber-700"
        }`}
    >
      {sentiment}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isReplied = status === "AI Replied"
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isReplied
        ? "bg-emerald-50 text-emerald-700"
        : "bg-secondary text-secondary-foreground"
        }`}
    >
      {status}
    </span>
  )
}

export function CommandCenter() {
  return (
    <section className="px-6 py-24" suppressHydrationWarning>
      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>
          Unified Command Center
        </div>
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Every message. Every call. One view.
        </h2>

        {/* Social Inbox */}
        <div className="mb-10 rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Social Inbox</h3>
          </div>
          <div className="overflow-x-auto">
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
                    className="border-b border-border last:border-0 transition-colors hover:bg-secondary/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{row.platform}</td>
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
        <div className="rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Voice History</h3>
          </div>
          <div className="overflow-x-auto">
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
                    className="border-b border-border last:border-0 transition-colors hover:bg-secondary/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{row.contact}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.duration}</td>
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
