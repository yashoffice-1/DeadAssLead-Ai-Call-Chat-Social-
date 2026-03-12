"use client"

import { useState } from "react"
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  AudioLines,
  Mic,
  PhoneCall,
  ThumbsUp,
  Minus,
  ThumbsDown,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Play,
  ExternalLink,
  Star,
  MapPin,
  Mail,
  Building2,
  CalendarClock,
  Headphones,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Users,
  Target,
  Sparkles,
  FileText,
  Tag,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CallRecord {
  id: string
  contact: string
  email: string
  company: string
  location: string
  type: "inbound" | "outbound"
  duration: string
  durationSeconds: number
  tools: string[]
  sentiment: "interested" | "neutral" | "not_interested"
  date: string
  time: string
  transcript?: string
  aiSummary?: string
  nextAction?: string
  tags?: string[]
  priority?: "high" | "medium" | "low"
  recordingAvailable?: boolean
  leadScore?: number
  callNotes?: string
}

const toolIcons: Record<string, React.ElementType> = {
  Vapi: PhoneCall,
  ElevenLabs: AudioLines,
  Deepgram: Mic,
}

const toolColors: Record<string, string> = {
  Vapi: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  ElevenLabs: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  Deepgram: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
}

const sentimentConfig = {
  interested: {
    label: "Interested",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    icon: ThumbsUp,
    dotColor: "bg-emerald-500 dark:bg-emerald-400",
  },
  neutral: {
    label: "Neutral",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    icon: Minus,
    dotColor: "bg-amber-500 dark:bg-amber-400",
  },
  not_interested: {
    label: "Not Interested",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
    border: "border-red-200 dark:border-red-500/20",
    iconBg: "bg-red-100 dark:bg-red-500/20",
    icon: ThumbsDown,
    dotColor: "bg-red-500 dark:bg-red-400",
  },
}

const priorityConfig = {
  high: { label: "High", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-200 dark:border-red-500/20", dot: "bg-red-500 dark:bg-red-400" },
  medium: { label: "Medium", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", dot: "bg-amber-500 dark:bg-amber-400" },
  low: { label: "Low", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-500/10", border: "border-slate-200 dark:border-slate-500/20", dot: "bg-slate-400 dark:bg-slate-500" },
}

const calls: CallRecord[] = [
  {
    id: "c1", contact: "Sarah Johnson", email: "sarah@techcorp.io", company: "TechCorp Inc.", location: "San Francisco, CA",
    type: "outbound", duration: "4:32", durationSeconds: 272, tools: ["Vapi", "ElevenLabs"],
    sentiment: "interested", date: "Today", time: "2:15 PM",
    transcript: "Discussed pricing for Enterprise plan. Sarah is interested in a demo next Tuesday. She mentioned their current system is outdated and they're evaluating 3 vendors.",
    aiSummary: "High-value prospect evaluating enterprise solutions. Competitor comparison in progress. Demo scheduled for next Tuesday.",
    nextAction: "Send pricing comparison sheet & confirm demo slot",
    tags: ["Enterprise", "Demo Scheduled", "Hot Lead"],
    priority: "high", recordingAvailable: true, leadScore: 92,
    callNotes: "Decision maker. Budget approved for Q1.",
  },
  {
    id: "c2", contact: "Mike Chen", email: "mike.c@startupxyz.com", company: "StartupXYZ", location: "Austin, TX",
    type: "inbound", duration: "2:18", durationSeconds: 138, tools: ["Vapi", "Deepgram"],
    sentiment: "neutral", date: "Today", time: "1:42 PM",
    transcript: "General inquiry about features. Mike asked about integrations with existing CRM. Needs Salesforce compatibility.",
    aiSummary: "Early-stage prospect with specific CRM integration needs. Requires Salesforce connector documentation.",
    nextAction: "Email Salesforce integration guide",
    tags: ["CRM Integration", "Salesforce"],
    priority: "medium", recordingAvailable: true, leadScore: 58,
  },
  {
    id: "c3", contact: "Lisa Park", email: "lisa@globalmedia.co", company: "Global Media Co.", location: "New York, NY",
    type: "outbound", duration: "6:45", durationSeconds: 405, tools: ["Vapi", "ElevenLabs", "Deepgram"],
    sentiment: "interested", date: "Today", time: "11:30 AM",
    transcript: "Follow-up call. Lisa confirmed she wants to move forward with the Pro plan. Discussed onboarding timeline and team training needs.",
    aiSummary: "Ready to convert. Pro plan selected. Onboarding expected within 2 weeks. Team of 8 to be trained.",
    nextAction: "Send contract & onboarding schedule",
    tags: ["Pro Plan", "Ready to Close", "Onboarding"],
    priority: "high", recordingAvailable: true, leadScore: 95,
  },
  {
    id: "c4", contact: "James Wilson", email: "jwilson@megainc.com", company: "Mega Inc.", location: "Chicago, IL",
    type: "outbound", duration: "1:12", durationSeconds: 72, tools: ["Vapi"],
    sentiment: "not_interested", date: "Today", time: "10:15 AM",
    transcript: "James said the timing isn't right. They just signed a 2-year contract with a competitor. Scheduled a follow-up for Q2.",
    aiSummary: "Lost to competitor. Under contract until Q2 next year. Re-engage in 6 months.",
    nextAction: "Add to Q2 re-engagement pipeline",
    tags: ["Competitor Lock-in", "Follow-up Q2"],
    priority: "low", recordingAvailable: false, leadScore: 15,
  },
  {
    id: "c5", contact: "Emma Davis", email: "emma.d@retailplus.com", company: "RetailPlus", location: "Miami, FL",
    type: "inbound", duration: "3:56", durationSeconds: 236, tools: ["Vapi", "Deepgram"],
    sentiment: "interested", date: "Yesterday", time: "4:30 PM",
    transcript: "Emma was referred by an existing customer (David from RetailMax). Very interested in the AI reply features for their social channels.",
    aiSummary: "Referral lead with strong interest in AI social features. Customer referral from RetailMax.",
    nextAction: "Schedule product demo focusing on AI social features",
    tags: ["Referral", "AI Social", "Demo Needed"],
    priority: "high", recordingAvailable: true, leadScore: 85,
  },
  {
    id: "c6", contact: "Robert Kim", email: "robert@financegroup.io", company: "Finance Group", location: "Boston, MA",
    type: "outbound", duration: "2:08", durationSeconds: 128, tools: ["Vapi", "ElevenLabs"],
    sentiment: "neutral", date: "Yesterday", time: "3:00 PM",
    transcript: "Left a voicemail. Will try again tomorrow. Robert's assistant said he's in meetings all day.",
    aiSummary: "Unable to connect directly. Voicemail left. Re-attempt scheduled.",
    nextAction: "Retry call tomorrow morning",
    tags: ["Voicemail", "Retry"],
    priority: "medium", recordingAvailable: true, leadScore: 40,
  },
  {
    id: "c7", contact: "Amanda Torres", email: "atorres@ecomhub.com", company: "EcomHub", location: "Los Angeles, CA",
    type: "inbound", duration: "5:21", durationSeconds: 321, tools: ["Vapi", "ElevenLabs", "Deepgram"],
    sentiment: "interested", date: "Yesterday", time: "1:15 PM",
    transcript: "Amanda wants a custom integration for her e-commerce platform. Needs webhook support and custom AI training on their product catalog.",
    aiSummary: "Enterprise prospect needing custom integration. Requires engineering consultation for webhook + AI customization.",
    nextAction: "Schedule engineering consultation call",
    tags: ["Custom Integration", "Enterprise", "Engineering"],
    priority: "high", recordingAvailable: true, leadScore: 88,
  },
  {
    id: "c8", contact: "David Brown", email: "dbrown@smallbiz.net", company: "SmallBiz Solutions", location: "Denver, CO",
    type: "outbound", duration: "0:45", durationSeconds: 45, tools: ["Vapi"],
    sentiment: "not_interested", date: "Yesterday", time: "11:00 AM",
    transcript: "Hung up quickly. Stated they are not interested and asked not to be called again.",
    aiSummary: "Contact declined. Requested no further outreach.",
    nextAction: "Add to do-not-call list",
    tags: ["Do Not Call", "Declined"],
    priority: "low", recordingAvailable: false, leadScore: 0,
  },
  {
    id: "c9", contact: "Nicole Patel", email: "npatel@digitalfirst.co", company: "DigitalFirst", location: "Seattle, WA",
    type: "outbound", duration: "3:33", durationSeconds: 213, tools: ["Vapi", "Deepgram"],
    sentiment: "neutral", date: "2 days ago", time: "2:45 PM",
    transcript: "Nicole is evaluating multiple vendors. Sent a comparison sheet. She mentioned budget constraints and wants to see ROI projections.",
    aiSummary: "In evaluation phase with budget sensitivity. ROI documentation needed to advance.",
    nextAction: "Send ROI calculator & case studies",
    tags: ["Evaluation", "ROI Needed", "Budget Sensitive"],
    priority: "medium", recordingAvailable: true, leadScore: 52,
  },
  {
    id: "c10", contact: "Chris Anderson", email: "chris@scaleteam.io", company: "ScaleTeam", location: "Portland, OR",
    type: "inbound", duration: "7:12", durationSeconds: 432, tools: ["Vapi", "ElevenLabs", "Deepgram"],
    sentiment: "interested", date: "2 days ago", time: "10:30 AM",
    transcript: "Chris wants to onboard his entire team of 15 people. Discussing bulk pricing and dedicated support. Very enthusiastic about AI call features.",
    aiSummary: "High-value team plan prospect. 15 seats needed. Interested in dedicated support tier and AI call automation.",
    nextAction: "Prepare custom team pricing proposal",
    tags: ["Team Plan", "15 Seats", "Dedicated Support"],
    priority: "high", recordingAvailable: true, leadScore: 90,
  },
]

function LeadScoreBar({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 50) return "bg-amber-500"
    if (score >= 25) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getColor())}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn(
        "text-[10px] font-semibold tabular-nums",
        score >= 80 ? "text-emerald-600 dark:text-emerald-400" : score >= 50 ? "text-amber-600 dark:text-amber-400" : score >= 25 ? "text-orange-600 dark:text-orange-400" : "text-red-600 dark:text-red-400"
      )}>
        {score}
      </span>
    </div>
  )
}

function CallDetailView({ call, onBack }: { call: CallRecord; onBack: () => void }) {
  const sConfig = sentimentConfig[call.sentiment]

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 mt-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack} className="h-8 gap-1.5 px-2">
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">{call.contact}</h2>
              <Badge className={cn("gap-1 border text-[10px] font-medium hidden sm:flex", sConfig.bg, sConfig.color, sConfig.border)}>
                <span className={cn("size-1.5 rounded-full", sConfig.dotColor)} />
                {sConfig.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">{call.company} • {call.date} at {call.time}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {call.tools.map((tool: string) => {
            const ToolIcon = toolIcons[tool] || Phone
            const colorClass = toolColors[tool] || "text-muted-foreground bg-accent/50 border-border"
            return (
              <div key={tool} className={cn("flex size-7 items-center justify-center rounded-md border", colorClass)} title={tool}>
                <ToolIcon className="size-3.5" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="size-3.5" />
            Contact Details
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="size-4 text-muted-foreground" />
              <span>{call.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Building2 className="size-4 text-muted-foreground" />
              <span>{call.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="size-4 text-muted-foreground" />
              <span>{call.location}</span>
            </div>
          </div>
          {call.tags && call.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {call.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="gap-1 px-2 py-0.5 text-[10px]">
                  <Tag className="size-2.5" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Middle: AI Summary */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="size-3.5" />
            AI Summary
          </h4>
          {call.aiSummary && (
            <p className="text-sm leading-relaxed text-foreground">{call.aiSummary}</p>
          )}
        </div>

        {/* Right: Next Steps & Actions */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CalendarClock className="size-3.5" />
            Next Steps
          </h4>
          {call.nextAction && (
            <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-3.5">
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{call.nextAction}</p>
            </div>
          )}
          {call.callNotes && (
            <div className="rounded-lg bg-accent/50 p-3.5">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Notes</p>
              <p className="text-sm text-foreground">{call.callNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Transcript and Actions */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {call.transcript && (
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FileText className="size-3.5" />
              Full Transcript
            </h4>
            <div className="rounded-lg border border-dashed border-border bg-accent/30 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{call.transcript}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {call.recordingAvailable && (
            <Button variant="outline" className="w-full sm:w-auto justify-center gap-2 text-xs transition-colors hover:bg-accent hover:text-foreground">
              <Headphones className="size-4" />
              Play Recording
            </Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto justify-center gap-2 text-xs transition-colors hover:bg-accent hover:text-foreground border-foreground text-foreground">
            <ExternalLink className="size-4" />
            View Full Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CallsView() {
  const [sentimentFilter, setSentimentFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const selectedCall = calls.find((c) => c.id === expandedId)

  if (selectedCall) {
    return <CallDetailView call={selectedCall} onBack={() => setExpandedId(null)} />
  }

  const filtered = calls
    .filter((c) => sentimentFilter === "all" || c.sentiment === sentimentFilter)
    .filter((c) => typeFilter === "all" || c.type === typeFilter)

  const totalCalls = calls.length
  const interestedCount = calls.filter((c) => c.sentiment === "interested").length
  const notInterestedCount = calls.filter((c) => c.sentiment === "not_interested").length
  const inboundCount = calls.filter((c) => c.type === "inbound").length
  const outboundCount = calls.filter((c) => c.type === "outbound").length
  const totalDurationSec = calls.reduce((sum, c) => sum + c.durationSeconds, 0)
  const avgDurationSec = Math.round(totalDurationSec / totalCalls)
  const avgDuration = `${Math.floor(avgDurationSec / 60)}:${String(avgDurationSec % 60).padStart(2, "0")}`
  const successRate = Math.round((interestedCount / totalCalls) * 100)
  const avgLeadScore = Math.round(calls.reduce((sum, c) => sum + (c.leadScore || 0), 0) / totalCalls)
  const highPriorityCount = calls.filter((c) => c.priority === "high").length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">Call History</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {totalCalls} calls · {interestedCount} interested · {highPriorityCount} high priority
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="size-3" />
            <span className="text-[10px] font-medium">+12% this week</span>
          </Badge>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Phone className="size-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline" className="gap-0.5 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0 text-[9px] text-emerald-700 dark:text-emerald-400">
                <ArrowUpRight className="size-2.5" />8%
              </Badge>
            </div>
            <p className="text-xl font-bold text-foreground">{totalCalls}</p>
            <span className="text-[10px] text-muted-foreground">Total Calls</span>
          </CardContent>
        </Card>

        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-500/10">
                <Timer className="size-3.5 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground">{avgDuration}</p>
            <span className="text-[10px] text-muted-foreground">Avg Duration</span>
          </CardContent>
        </Card>

        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                <ThumbsUp className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Badge variant="outline" className="gap-0.5 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0 text-[9px] text-emerald-700 dark:text-emerald-400">
                <ArrowUpRight className="size-2.5" />{successRate}%
              </Badge>
            </div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{interestedCount}</p>
            <span className="text-[10px] text-muted-foreground">Interested</span>
          </CardContent>
        </Card>

        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10">
                <Target className="size-3.5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground">{avgLeadScore}</p>
            <span className="text-[10px] text-muted-foreground">Avg Lead Score</span>
          </CardContent>
        </Card>

        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-50">
                <PhoneIncoming className="size-3.5 text-cyan-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <p className="text-xl font-bold text-foreground">{inboundCount}</p>
              <span className="text-xs text-muted-foreground">/ {outboundCount}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">In / Outbound</span>
          </CardContent>
        </Card>

        <Card className="group border transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
          <CardContent className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex size-7 items-center justify-center rounded-lg bg-red-50">
                <Sparkles className="size-3.5 text-red-600" />
              </div>
            </div>
            <p className="text-xl font-bold text-red-600">{highPriorityCount}</p>
            <span className="text-[10px] text-muted-foreground">High Priority</span>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-accent/30 px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Filters:</span>
          </div>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="h-8 w-[120px] border-border bg-background text-xs sm:w-[150px]">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="not_interested">Not Interested</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[100px] border-border bg-background text-xs sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-[10px] text-muted-foreground">
          Showing {filtered.length} of {totalCalls} calls
        </span>
      </div>

      {/* Call Table */}
      <Card className="overflow-hidden border">
        <ScrollArea className="h-[calc(100vh-24rem)] sm:h-[calc(100vh-28rem)]">
          <div className="flex flex-col md:min-w-[900px]">
            {/* Table Header - Desktop only */}
            <div className="sticky top-0 z-10 hidden items-center gap-4 border-b border-border bg-accent/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm md:flex">
              <span className="w-[200px]">Contact</span>
              <span className="w-[90px]">Type</span>
              <span className="w-[80px]">Duration</span>
              <span className="w-[130px]">Tools</span>
              <span className="w-[120px]">Sentiment</span>
              <span className="w-[80px]">Lead Score</span>
              <span className="w-[80px]">Priority</span>
              <span className="flex-1">Date</span>
            </div>

            {filtered.map((call) => {
              const sConfig = sentimentConfig[call.sentiment]
              const SentIcon = sConfig.icon
              const pConfig = call.priority ? priorityConfig[call.priority] : null
              const isExpanded = expandedId === call.id

              return (
                <div key={call.id}>
                  {/* Mobile Card Layout */}
                  <button
                    onClick={() => setExpandedId(call.id)}
                    className="flex w-full flex-col gap-2 border-b border-border px-3 py-3 text-left transition-all duration-200 hover:bg-accent/40 md:hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                          call.sentiment === "interested" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                          call.sentiment === "not_interested" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        )}>
                          {call.contact.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {call.priority === "high" && (
                          <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-red-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-foreground">{call.contact}</span>
                        <span className="block truncate text-[10px] text-muted-foreground">{call.company}</span>
                      </div>
                      <Badge className={cn("shrink-0 gap-1 border text-[9px] font-medium", sConfig.bg, sConfig.color, sConfig.border)}>
                        <span className={cn("size-1.5 rounded-full", sConfig.dotColor)} />
                        {sConfig.label}
                      </Badge>
                      <span className="shrink-0 flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-[10px] font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        View Details
                        <ChevronRight className="size-3 transition-transform duration-200" />
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pl-11 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {call.type === "inbound" ? <PhoneIncoming className="size-2.5" /> : <PhoneOutgoing className="size-2.5" />}
                        {call.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-2.5" />
                        {call.duration}
                      </span>
                      <span>{call.date}</span>
                      {call.leadScore !== undefined && (
                        <LeadScoreBar score={call.leadScore} />
                      )}
                    </div>
                  </button>

                  {/* Desktop Row */}
                  <button
                    onClick={() => setExpandedId(call.id)}
                    className="hidden w-full items-center gap-4 border-b border-border px-5 py-3.5 text-left transition-all duration-200 hover:bg-accent/40 md:flex"
                  >
                    {/* Contact */}
                    <div className="flex w-[200px] items-center gap-3">
                      <div className="relative">
                        <div className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                          call.sentiment === "interested" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                          call.sentiment === "not_interested" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        )}>
                          {call.contact.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {call.priority === "high" && (
                          <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-red-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-foreground">{call.contact}</span>
                        <span className="block truncate text-[10px] text-muted-foreground">{call.company}</span>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="flex w-[90px] items-center gap-1.5">
                      <div className={cn(
                        "flex size-5 items-center justify-center rounded",
                        call.type === "inbound" ? "bg-cyan-50 dark:bg-cyan-500/10" : "bg-blue-50 dark:bg-blue-500/10"
                      )}>
                        {call.type === "inbound" ? (
                          <PhoneIncoming className="size-3 text-cyan-600 dark:text-cyan-400" />
                        ) : (
                          <PhoneOutgoing className="size-3 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <span className="text-xs capitalize text-muted-foreground">{call.type}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex w-[80px] items-center gap-1.5">
                      <Clock className="size-3 text-muted-foreground" />
                      <span className="font-mono text-xs font-medium text-foreground">{call.duration}</span>
                    </div>

                    {/* Tools */}
                    <div className="flex w-[130px] items-center gap-1">
                      {call.tools.map((tool) => {
                        const ToolIcon = toolIcons[tool] || Phone
                        const colorClass = toolColors[tool] || "text-muted-foreground bg-accent/50 border-border"
                        return (
                          <div
                            key={tool}
                            className={cn("flex size-6 items-center justify-center rounded-md border", colorClass)}
                            title={tool}
                          >
                            <ToolIcon className="size-3" />
                          </div>
                        )
                      })}
                    </div>

                    {/* Sentiment */}
                    <div className="w-[120px]">
                      <Badge className={cn("gap-1.5 border text-[10px] font-medium", sConfig.bg, sConfig.color, sConfig.border)}>
                        <span className={cn("size-1.5 rounded-full", sConfig.dotColor)} />
                        {sConfig.label}
                      </Badge>
                    </div>

                    {/* Lead Score */}
                    <div className="w-[80px]">
                      <LeadScoreBar score={call.leadScore || 0} />
                    </div>

                    {/* Priority */}
                    <div className="w-[80px]">
                      {pConfig && (
                        <div className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5", pConfig.bg, pConfig.border)}>
                          <span className={cn("size-1.5 rounded-full", pConfig.dot)} />
                          <span className={cn("text-[10px] font-medium", pConfig.color)}>{pConfig.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Date + Expand */}
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-xs text-muted-foreground">{call.date} at {call.time}</span>
                      <span className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        View Details
                        <ChevronRight className="size-3.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  )
}
