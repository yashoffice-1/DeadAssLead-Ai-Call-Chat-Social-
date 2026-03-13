"use client"

import { useState } from "react"
import {
  Activity,
  Bot,
  Zap,
  ArrowRight,
  ChevronRight,
  GitBranch,
  Phone,
  MessageSquare,
  Instagram,
  Clapperboard,
  PhoneCall,
  Mic,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OverviewFlow {
  id: string
  name: string
  trigger: string
  action: string
  tool: string
  status: "active" | "paused" | "draft"
  triggerCount: number
  lastTriggered: string
  tools: string[]
}

const activeFlows: OverviewFlow[] = [
  {
    id: "flow-1",
    name: "TikTok Lead Gen",
    trigger: "New TikTok DM",
    action: "OpenAI Processing",
    tool: "Vapi Voice Call",
    status: "active",
    triggerCount: 47,
    lastTriggered: "2m ago",
    tools: ["TikTok", "OpenAI", "Vapi"],
  },
  {
    id: "flow-2",
    name: "Instagram Auto-Reply",
    trigger: "New IG DM",
    action: "AI Draft Reply",
    tool: "Instagram Send",
    status: "active",
    triggerCount: 128,
    lastTriggered: "30s ago",
    tools: ["Instagram", "OpenAI"],
  },
  {
    id: "flow-3",
    name: "Voice Follow-up",
    trigger: "Lead Form Submit",
    action: "ElevenLabs Script",
    tool: "Deepgram Transcribe",
    status: "active",
    triggerCount: 23,
    lastTriggered: "15m ago",
    tools: ["Vapi", "ElevenLabs", "Deepgram"],
  },
  {
    id: "flow-4",
    name: "Facebook Comment Monitor",
    trigger: "New FB Comment",
    action: "Sentiment Analysis",
    tool: "Auto-Reply",
    status: "paused",
    triggerCount: 312,
    lastTriggered: "1h ago",
    tools: ["Facebook", "OpenAI"],
  },
]

const brainEvents = [
  {
    event: "Flow 'TikTok Lead Gen' triggered",
    detail: "Call initiated via Vapi to +1 (555) 234-5678",
    time: "2m ago",
    type: "call",
  },
  {
    event: "Flow 'Instagram Auto-Reply' triggered",
    detail: "AI reply sent to @sarah_designs",
    time: "30s ago",
    type: "reply",
  },
  {
    event: "New lead captured from TikTok DM",
    detail: "User @content_creator_99 matched 'Booking' rule",
    time: "5m ago",
    type: "lead",
  },
  {
    event: "Voice call completed",
    detail: "John Smith - 4:32 duration, Positive sentiment",
    time: "10m ago",
    type: "call",
  },
  {
    event: "Flow 'Instagram Auto-Reply' triggered",
    detail: "AI reply sent to @tech_guru",
    time: "18m ago",
    type: "reply",
  },
  {
    event: "Sentiment alert: negative review detected",
    detail: "@unhappy_user on Facebook - Escalated to human",
    time: "25m ago",
    type: "alert",
  },
  {
    event: "Flow 'Voice Follow-up' triggered",
    detail: "Calling Lisa Chen via ElevenLabs voice",
    time: "32m ago",
    type: "call",
  },
  {
    event: "3 posts scheduled for Facebook",
    detail: "Queued for 9am, 12pm, 5pm tomorrow",
    time: "45m ago",
    type: "schedule",
  },
]

const eventIcons: Record<string, React.ElementType> = {
  call: Phone,
  reply: MessageSquare,
  lead: Zap,
  alert: Activity,
  schedule: GitBranch,
}

const toolIcons: Record<string, React.ElementType> = {
  TikTok: Clapperboard,
  Instagram: Instagram,
  Facebook: MessageSquare,
  OpenAI: Bot,
  Vapi: PhoneCall,
  ElevenLabs: Activity,
  Deepgram: Mic,
}

interface OverviewViewProps {
  onSelectFlowById?: (flowId: string) => void
  onNavigateToFlows?: () => void
}

export function OverviewView({ onSelectFlowById, onNavigateToFlows }: OverviewViewProps) {
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        <StatCard label="Active Flows" value="4" icon={GitBranch} change="+1" accent="violet" delay={0} />
        <StatCard label="Total Leads" value="1,245" icon={Zap} change="+12%" accent="blue" delay={60} />
        <StatCard label="Calls (24h)" value="34" icon={Phone} change="+8%" accent="emerald" delay={120} />
        <StatCard label="Messages Sent" value="312" icon={MessageSquare} change="+23%" accent="cyan" delay={180} />
        <StatCard label="AI Actions" value="2,847" icon={Bot} change="+5%" accent="amber" delay={240} />
        <StatCard label="Post Rules" value="3" icon={Activity} accent="pink" delay={300} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Active Automations - 3 cols */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Active Automations</h2>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-muted-foreground"
              onClick={onNavigateToFlows}
            >
              View All Flows
              <ArrowRight className="size-3" />
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {activeFlows.map((flow) => (
              <Card
                key={flow.id}
                className={cn(
                  "cursor-pointer border transition-all",
                  hoveredFlow === flow.id
                    ? "border-foreground/20 shadow-sm"
                    : "border-border"
                )}
                onMouseEnter={() => setHoveredFlow(flow.id)}
                onMouseLeave={() => setHoveredFlow(null)}
                onClick={() => onSelectFlowById?.(flow.id)}
              >
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                      <GitBranch className="size-4 text-foreground" />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {flow.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            flow.status === "active"
                              ? "border-success/30 text-success"
                              : "border-border text-muted-foreground"
                          )}
                        >
                          {flow.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{flow.trigger}</span>
                        <ArrowRight className="size-2.5" />
                        <span>{flow.action}</span>
                        <ArrowRight className="size-2.5" />
                        <span>{flow.tool}</span>
                      </div>
                    </div>

                    <div className="hidden items-center gap-1 md:flex">
                      {flow.tools.map((tool) => {
                        const Icon = toolIcons[tool] || Bot
                        return (
                          <div
                           
                            key={tool}
                            className="flex size-7 items-center justify-center rounded-md border border-border bg-secondary"
                            title={tool}
                          >
                            <Icon className="size-3.5 text-muted-foreground" />
                          </div>
                        )
                      })}
                    </div>

                    <div className="hidden shrink-0 flex-col items-end gap-0.5 sm:flex">
                      <span className="text-xs font-medium text-foreground">
                        {flow.triggerCount} triggers
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {flow.lastTriggered}
                      </span>
                    </div>

                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Brain Feed - 2 cols */}
        <Card className="border lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Activity className="size-4 text-foreground" />
              Event Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px] pr-3">
              <div className="flex flex-col gap-2">
                {brainEvents.map((item, i) => {
                  const Icon = eventIcons[item.type] || Bot
                  return (
                    <div
                     
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                        <Icon className="size-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex flex-1 flex-col gap-0.5">
                        <span className="text-xs font-medium text-foreground">
                          {item.event}
                        </span>
                        <span className="text-[11px] leading-relaxed text-muted-foreground">
                          {item.detail}
                        </span>
                        <span className="mt-0.5 text-[10px] text-muted-foreground/60">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const accentColors: Record<string, { icon: string; bg: string; text: string }> = {
  violet: { icon: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  blue: { icon: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  emerald: { icon: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  cyan: { icon: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400" },
  amber: { icon: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  pink: { icon: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10", text: "text-pink-600 dark:text-pink-400" },
}

function StatCard({
  label,
  value,
  icon: Icon,
  change,
  accent = "blue",
  delay = 0,
}: {
  label: string
  value: string
  icon?: React.ElementType
  change?: string
  accent?: string
  delay?: number
}) {
  const colors = accentColors[accent] || accentColors.blue
  return (
    <Card
      className="group border transition-all duration-200 hover:border-foreground/15 hover:shadow-sm animate-card-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          {Icon && (
            <div className={cn("flex size-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105", colors.bg)}>
              <Icon className={cn("size-4", colors.icon)} />
            </div>
          )}
          {change && (
            <span className="flex items-center gap-0.5 rounded-full bg-success/20 dark:bg-success/30 px-1.5 py-0.5 text-[9px] font-semibold text-success dark:text-success-foreground">
              ↑{change}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-col gap-0.5">
          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{value}</span>
          <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}
