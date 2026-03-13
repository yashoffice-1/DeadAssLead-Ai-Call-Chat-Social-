"use client"

import { useState } from "react"
import {
  PlayCircle,
  PauseCircle,
  Volume2,
  Share,
  Copy,
  Search as SearchIcon,
  Bot,
  User,
  Scissors,
  Download,
  MessageCircle,
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

export interface ChatMessage {
  speaker: "ai" | "human"
  timestamp: string
  text: string
}

export interface KeyMoment {
  timestamp: string
  text: string
}

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
  messages?: ChatMessage[]
  keyMoments?: KeyMoment[]
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
    keyMoments: [
      { timestamp: "00:45", text: "Prospect asked about pricing" },
      { timestamp: "01:12", text: "Mentioned current outdated system" },
      { timestamp: "02:34", text: "Interested in demo" },
      { timestamp: "03:40", text: "Confirmed availability next Tuesday" }
    ],
    messages: [
      { speaker: "ai", timestamp: "00:03", text: "Hello Sarah, this is the AI assistant from DeadAssLead. I\'m calling to discuss your interest in enterprise automation." },
      { speaker: "human", timestamp: "00:08", text: "Yes, I saw your platform online and wanted to know how it compares with our current system." },
      { speaker: "ai", timestamp: "00:15", text: "I can absolutely help with that. What system are you currently using?" },
      { speaker: "human", timestamp: "00:20", text: "We are using a legacy Salesforce setup but it\'s getting too clunky for our rapid outbound needs." },
      { speaker: "ai", timestamp: "00:30", text: "I understand. Many of our enterprise clients switch for exactly that reason. Our platform enables 10x faster outbound workflows. Would you be interested in a brief demo of how we handle CRM sync?" },
      { speaker: "human", timestamp: "00:45", text: "Maybe. First, can you tell me roughly how your pricing structures work for a team of 15?" },
    ]
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState("1x")

  return (
    <div className="flex h-full flex-col animate-in fade-in zoom-in-95 duration-200">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between border-b border-border pb-4 pt-2">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="h-8 gap-1.5 px-2">
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{call.contact}</h2>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm font-medium text-muted-foreground">{call.company}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{call.type} Call</span>
              <span>•</span>
              <span>{call.date} {call.time}</span>
              <span>•</span>
              <span>Duration: {call.duration}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={cn("gap-1.5 border px-2.5 py-1 text-xs font-semibold", sConfig.bg, sConfig.color, sConfig.border)}>
            <span className={cn("size-2 rounded-full", sConfig.dotColor)} />
            Sentiment: {sConfig.label}
          </Badge>
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1">
            Lead Status: <span className="text-foreground ml-1 font-bold">{((call.leadScore || 0) >= 80) ? "Hot" : "Warm"}</span>
          </Badge>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 pt-5 lg:grid-cols-3 overflow-hidden">
        {/* Left Column: Player & Transcript */}
        <div className="flex h-[calc(100vh-14rem)] flex-col gap-5 lg:col-span-2 overflow-hidden">
          
          {/* 2. Call Recording Player */}
          {call.recordingAvailable && (
            <Card className="shrink-0 border bg-card shadow-sm">
              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      className="size-10 rounded-full bg-foreground text-background hover:bg-foreground/90 p-0"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <PauseCircle className="size-5" /> : <PlayCircle className="size-5" />}
                    </Button>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">Play Recording</span>
                      <span className="text-xs text-muted-foreground">00:00 / {call.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setPlaybackSpeed(playbackSpeed === "1x" ? "1.5x" : playbackSpeed === "1.5x" ? "2x" : "1x")} className="text-xs font-semibold">
                      Speed: {playbackSpeed}
                    </Button>
                    <div className="h-4 w-px bg-border" />
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                      <Volume2 className="size-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                      <Download className="size-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
                {/* Timeline bar */}
                <div className="w-full mt-1 flex items-center gap-3">
                  <div className="h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-accent relative group">
                    <div className="h-full w-1/4 rounded-full bg-foreground transition-all duration-300" />
                    <div className="absolute top-1/2 -mt-1.5 left-1/4 size-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 3. Conversation Transcript */}
          <Card className="flex flex-1 flex-col overflow-hidden border bg-card shadow-sm">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <MessageCircle className="size-4 text-muted-foreground" />
                Conversation Transcript
              </h3>
              <div className="flex items-center justify-end gap-2">
                 <div className="relative hidden sm:block">
                   <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                   <input type="text" placeholder="Search conversation..." className="h-8 w-[160px] rounded-md border border-input bg-transparent pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                 </div>
                 <Button variant="outline" size="sm" className="h-8 gap-1">
                   <Filter className="size-3.5" />
                   <span className="text-xs">Filter</span>
                 </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 min-h-0 p-4">
              <div className="flex flex-col gap-6 pb-6 pr-4">
                {(call.messages || []).map((msg, i) => (
                  <div key={i} className={cn("flex w-full", msg.speaker === "ai" ? "justify-start" : "justify-end")}>
                    <div className={cn("flex max-w-[90%] sm:max-w-[85%] flex-col gap-1.5", msg.speaker === "ai" ? "items-start" : "items-end")}>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground tracking-tight">
                        {msg.speaker === "ai" ? (
                          <>
                            <div className="flex items-center justify-center size-5 bg-foreground rounded-full text-background">
                              <Bot className="size-3" />
                            </div>
                            <span className="font-semibold text-foreground tracking-normal">AI Agent</span>
                            <span>|</span>
                            <span>{msg.timestamp}</span>
                          </>
                        ) : (
                          <>
                            <span>{msg.timestamp}</span>
                            <span>|</span>
                            <span className="font-semibold text-foreground tracking-normal">{call.contact.split(' ')[0]}</span>
                            <div className="flex items-center justify-center size-5 bg-accent border rounded-full text-foreground">
                              <User className="size-3" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        msg.speaker === "ai" 
                          ? "bg-accent/40 text-foreground rounded-tl-sm border border-border/50" 
                          : "bg-foreground text-background rounded-tr-sm shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}

                {(!call.messages || call.messages.length === 0) && (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <MessageCircle className="mb-2 size-8 opacity-20" />
                    <p className="text-sm">Transcript details not available for this call.</p>
                    {call.transcript && (
                      <p className="mt-2 text-xs">{call.transcript}</p>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Right Column: Insights, Key Moments, Contact Details */}
        <ScrollArea className="h-[calc(100vh-14rem)] pb-4 lg:pr-4">
          <div className="flex flex-col gap-5 pb-8 overflow-x-hidden">
            
            {/* 4. Sentiment & AI Analysis */}
            <Card className="overflow-hidden border bg-card shadow-sm">
              <div className="border-b border-border bg-accent/30 px-4 py-3">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Sparkles className="size-4 text-violet-500" />
                  AI Analysis & Insights
                </h3>
              </div>
              <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Sentiment Score</span>
                    <span className={cn("text-lg font-bold", sConfig.color)}>{sConfig.label}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-lg font-bold text-foreground">92%</span>
                  </div>
                </div>
                
                <div className="h-px w-full bg-border" />
                
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Takeaways</h4>
                  <ul className="flex flex-col gap-2">
                    {call.aiSummary?.split('. ').map((point, idx) => point.trim() && (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                        <span className="leading-snug">{point.replace(/\.$/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 5. Key Moments */}
            {(call.keyMoments || []).length > 0 && (
              <Card className="overflow-hidden border bg-card shadow-sm">
                <div className="border-b border-border bg-accent/30 px-4 py-3">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Timer className="size-4 text-emerald-500" />
                    Key Moments
                  </h3>
                </div>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    {call.keyMoments?.map((loc, i) => (
                      <button key={i} className="flex items-start gap-3 border-b border-border last:border-0 p-3 text-left transition-colors hover:bg-accent/40 group">
                        <Badge variant="secondary" className="mt-0.5 whitespace-nowrap px-1.5 py-0 font-mono text-[10px] group-hover:bg-primary group-hover:text-primary-foreground border-border">{loc.timestamp}</Badge>
                        <span className="text-xs font-medium leading-relaxed text-foreground group-hover:text-foreground">{loc.text}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 7. Next Steps Section */}
            <Card className="overflow-hidden border border-emerald-500/20 bg-emerald-50/20 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.15)] dark:bg-emerald-500/5">
              <div className="border-b border-emerald-500/10 px-4 py-3">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  <Target className="size-4" />
                  Suggested Next Steps
                </h3>
              </div>
              <CardContent className="p-4 flex flex-col gap-2">
                {call.nextAction && (
                  <p className="mb-3 text-sm font-medium text-foreground">{call.nextAction}</p>
                )}
                <Button className="w-full justify-start gap-2 text-xs" variant="default">
                  <FileText className="size-3.5" />
                  Send Pricing Comparison Sheet
                </Button>
                <Button className="w-full justify-start gap-2 text-xs dark:hover:bg-accent/50" variant="outline">
                  <CalendarClock className="size-3.5" />
                  Confirm Demo Slot
                </Button>
                <Button className="w-full justify-start gap-2 text-xs dark:hover:bg-accent/50" variant="outline">
                  <Mail className="size-3.5" />
                  Send Follow-Up Email
                </Button>
              </CardContent>
            </Card>

            {/* 6. Contact & Notes */}
            <Card className="overflow-hidden border bg-card shadow-sm">
              <CardContent className="flex flex-col gap-5 p-4">
                 <div className="flex flex-col gap-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Users className="size-3.5" />
                    Contact Details
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex w-full items-center gap-2 text-sm text-foreground overflow-hidden">
                      <Mail className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{call.email}</span>
                    </div>
                    <div className="flex w-full items-center gap-2 text-sm text-foreground overflow-hidden">
                      <Building2 className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{call.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="size-4 shrink-0 text-muted-foreground" />
                      <span>{call.location}</span>
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
                </div>
                
                <div className="h-px w-full bg-border" />
                
                {/* 8. Notes */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Manual Notes</h4>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">Edit</Button>
                  </div>
                  <div className="min-h-[60px] rounded-md border border-input bg-transparent p-3 text-sm text-foreground shadow-sm">
                    {call.callNotes || "Click to add notes..."}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 10. Export Options */}
            <div className="mt-2 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 flex-1 text-xs">
                <Copy className="size-3.5" />
                Copy Transcript
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 flex-1 text-xs">
                <Share className="size-3.5" />
                Share Link
              </Button>
            </div>
            
          </div>
        </ScrollArea>
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
