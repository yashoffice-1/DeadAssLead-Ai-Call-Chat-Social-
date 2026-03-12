"use client"

import { GripVertical, Clock, Phone, Share2, Zap } from "lucide-react"

const socialRules = [
  {
    icon: <Share2 className="h-4 w-4" />,
    label: "Post to Instagram",
    detail: "Every Monday, Wednesday, Friday at 10 AM",
    color: "from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40",
    iconBg: "bg-pink-100 dark:bg-pink-900/50",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: <Share2 className="h-4 w-4" />,
    label: "Post to TikTok",
    detail: "Daily at 6 PM — auto-generated from templates",
    color: "from-slate-50 to-gray-50 dark:from-slate-900/40 dark:to-gray-900/40",
    iconBg: "bg-slate-100 dark:bg-slate-800/50",
    iconColor: "text-slate-700 dark:text-slate-300",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    label: "Story Reminder",
    detail: "Tuesdays & Thursdays — behind-the-scenes content",
    color: "from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
]

const callRules = [
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Call new pricing leads",
    detail: "Within 5 minutes of DM — ElevenLabs 'Adam' voice",
    color: "from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Follow-up calls",
    detail: "48 hours after first contact — if no reply",
    color: "from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    label: "Weekly check-in calls",
    detail: "Every Friday at 2 PM — for active prospects",
    color: "from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
]

function RuleCard({
  icon,
  label,
  detail,
  color,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode
  label: string
  detail: string
  color: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div suppressHydrationWarning className={`group flex items-center gap-3 rounded-xl border border-border bg-gradient-to-r ${color} px-3 py-3 transition-all duration-300 hover:shadow-md hover:border-border/60 hover:-translate-y-0.5 sm:gap-4 sm:px-4 sm:py-4`}>
      <GripVertical className="hidden h-4 w-4 shrink-0 text-muted-foreground/30 cursor-grab transition-colors group-hover:text-muted-foreground/60 sm:block" />
      <div suppressHydrationWarning className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor} sm:h-9 sm:w-9`}>
        {icon}
      </div>
      <div suppressHydrationWarning className="min-w-0 flex-1">
        <div suppressHydrationWarning className="text-xs font-medium text-foreground sm:text-sm">{label}</div>
        <div suppressHydrationWarning className="truncate text-[10px] text-muted-foreground sm:text-xs">{detail}</div>
      </div>
      <div suppressHydrationWarning className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 opacity-0 transition-opacity group-hover:opacity-100">
        <Zap className="h-3 w-3 text-emerald-600" />
      </div>
    </div>
  )
}

export function RuleEngine() {
  return (
    <section className="relative px-4 py-16 overflow-hidden sm:px-6 sm:py-24" suppressHydrationWarning>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-l from-violet-100/30 to-transparent blur-3xl sm:h-[400px] sm:w-[400px]" />
      </div>

      <div className="mx-auto max-w-5xl" suppressHydrationWarning>
        <div className="mb-2 inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm" suppressHydrationWarning>
          Rule Engine
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
          Automate your schedule. Own your pipeline.
        </h2>
        <p className="mb-8 max-w-xl text-sm text-muted-foreground leading-relaxed sm:mb-12 sm:text-base">
          Drag and drop rules for social media posting and outbound calling. The AI
          manages your entire schedule — tracking every post and every call.
        </p>

        <div suppressHydrationWarning className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div suppressHydrationWarning>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-4 sm:text-sm">
              <Share2 className="h-3.5 w-3.5" />
              Social Posting Rules
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {socialRules.map((rule) => (
                <RuleCard key={rule.label} {...rule} />
              ))}
            </div>
          </div>
          <div suppressHydrationWarning>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-4 sm:text-sm">
              <Phone className="h-3.5 w-3.5" />
              Outbound Calling Rules
            </h3>
            <div className="space-y-2 sm:space-y-3">
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
