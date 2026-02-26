"use client"

import { GripVertical, Clock, Phone, Share2 } from "lucide-react"

const socialRules = [
  {
    icon: <Share2 className="h-4 w-4" />,
    label: "Post to Instagram",
    detail: "Every Monday, Wednesday, Friday at 10 AM",
  },
  {
    icon: <Share2 className="h-4 w-4" />,
    label: "Post to TikTok",
    detail: "Daily at 6 PM — auto-generated from templates",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    label: "Story Reminder",
    detail: "Tuesdays & Thursdays — behind-the-scenes content",
  },
]

const callRules = [
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Call new pricing leads",
    detail: "Within 5 minutes of DM — ElevenLabs 'Adam' voice",
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Follow-up calls",
    detail: "48 hours after first contact — if no reply",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    label: "Weekly check-in calls",
    detail: "Every Friday at 2 PM — for active prospects",
  },
]

function RuleCard({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode
  label: string
  detail: string
}) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:bg-secondary/50">
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50 cursor-grab" />
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="truncate text-xs text-muted-foreground">{detail}</div>
      </div>
    </div>
  )
}

export function RuleEngine() {
  return (
    <section className="px-6 py-24" suppressHydrationWarning>
      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>
          Rule Engine
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Automate your schedule. Own your pipeline.
        </h2>
        <p className="mb-12 max-w-xl text-muted-foreground leading-relaxed">
          Drag and drop rules for social media posting and outbound calling. The AI
          manages your entire schedule — tracking every post and every call.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Social Posting Rules
            </h3>
            <div className="space-y-3">
              {socialRules.map((rule) => (
                <RuleCard key={rule.label} {...rule} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Outbound Calling Rules
            </h3>
            <div className="space-y-3">
              {callRules.map((rule) => (
                <RuleCard key={rule.label} {...rule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
