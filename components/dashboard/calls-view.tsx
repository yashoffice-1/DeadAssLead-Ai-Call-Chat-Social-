"use client"

import { useState } from "react"
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Activity,
  AudioLines,
  Mic,
  PhoneCall,
  ThumbsUp,
  Minus,
  ThumbsDown,
  Filter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  type: "inbound" | "outbound"
  duration: string
  tools: string[]
  sentiment: "interested" | "neutral" | "not_interested"
  date: string
  time: string
  transcript?: string
}

const toolIcons: Record<string, React.ElementType> = {
  Vapi: PhoneCall,
  ElevenLabs: AudioLines,
  Deepgram: Mic,
}

const sentimentConfig = {
  interested: { label: "Interested", color: "text-success", bg: "bg-success/10", icon: ThumbsUp },
  neutral: { label: "Neutral", color: "text-chart-4", bg: "bg-chart-4/10", icon: Minus },
  not_interested: { label: "Not Interested", color: "text-destructive", bg: "bg-destructive/10", icon: ThumbsDown },
}

const calls: CallRecord[] = [
  { id: "c1", contact: "Sarah Johnson", type: "outbound", duration: "4:32", tools: ["Vapi", "ElevenLabs"], sentiment: "interested", date: "Today", time: "2:15 PM", transcript: "Discussed pricing for Enterprise plan. Sarah is interested in a demo next Tuesday." },
  { id: "c2", contact: "Mike Chen", type: "inbound", duration: "2:18", tools: ["Vapi", "Deepgram"], sentiment: "neutral", date: "Today", time: "1:42 PM", transcript: "General inquiry about features. Mike asked about integrations with existing CRM." },
  { id: "c3", contact: "Lisa Park", type: "outbound", duration: "6:45", tools: ["Vapi", "ElevenLabs", "Deepgram"], sentiment: "interested", date: "Today", time: "11:30 AM", transcript: "Follow-up call. Lisa confirmed she wants to move forward with the Pro plan." },
  { id: "c4", contact: "James Wilson", type: "outbound", duration: "1:12", tools: ["Vapi"], sentiment: "not_interested", date: "Today", time: "10:15 AM", transcript: "James said the timing isn't right. Scheduled a follow-up for Q2." },
  { id: "c5", contact: "Emma Davis", type: "inbound", duration: "3:56", tools: ["Vapi", "Deepgram"], sentiment: "interested", date: "Yesterday", time: "4:30 PM", transcript: "Emma was referred by an existing customer. Very interested in the AI reply features." },
  { id: "c6", contact: "Robert Kim", type: "outbound", duration: "2:08", tools: ["Vapi", "ElevenLabs"], sentiment: "neutral", date: "Yesterday", time: "3:00 PM", transcript: "Left a voicemail. Will try again tomorrow." },
  { id: "c7", contact: "Amanda Torres", type: "inbound", duration: "5:21", tools: ["Vapi", "ElevenLabs", "Deepgram"], sentiment: "interested", date: "Yesterday", time: "1:15 PM", transcript: "Amanda wants a custom integration for her e-commerce platform. Escalated to engineering." },
  { id: "c8", contact: "David Brown", type: "outbound", duration: "0:45", tools: ["Vapi"], sentiment: "not_interested", date: "Yesterday", time: "11:00 AM", transcript: "Hung up quickly. Mark as do not call." },
  { id: "c9", contact: "Nicole Patel", type: "outbound", duration: "3:33", tools: ["Vapi", "Deepgram"], sentiment: "neutral", date: "2 days ago", time: "2:45 PM", transcript: "Nicole is evaluating multiple vendors. Sent a comparison sheet." },
  { id: "c10", contact: "Chris Anderson", type: "inbound", duration: "7:12", tools: ["Vapi", "ElevenLabs", "Deepgram"], sentiment: "interested", date: "2 days ago", time: "10:30 AM", transcript: "Chris wants to onboard his entire team of 15 people. Discussing bulk pricing." },
]

export function CallsView() {
  const [sentimentFilter, setSentimentFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = calls
    .filter((c) => sentimentFilter === "all" || c.sentiment === sentimentFilter)
    .filter((c) => typeFilter === "all" || c.type === typeFilter)

  const totalCalls = calls.length
  const interestedCount = calls.filter((c) => c.sentiment === "interested").length
  const avgDuration = "3:26"
  const successRate = Math.round((interestedCount / totalCalls) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Call History</h2>
        <p className="text-sm text-muted-foreground">
          {totalCalls} total calls, {interestedCount} interested leads
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border">
          <CardContent className="py-4">
            <span className="text-xs text-muted-foreground">Total Calls</span>
            <p className="text-xl font-bold text-foreground">{totalCalls}</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="py-4">
            <span className="text-xs text-muted-foreground">Avg Duration</span>
            <p className="text-xl font-bold text-foreground">{avgDuration}</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="py-4">
            <span className="text-xs text-muted-foreground">Interested</span>
            <p className="text-xl font-bold text-success">{interestedCount}</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="py-4">
            <span className="text-xs text-muted-foreground">Success Rate</span>
            <p className="text-xl font-bold text-foreground">{successRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Filters:</span>
        </div>
        <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
          <SelectTrigger className="h-8 w-[140px] text-xs">
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
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Call Table */}
      <Card className="border">
        <ScrollArea className="h-[calc(100vh-24rem)]">
          <div className="flex flex-col">
            {/* Table Header */}
            <div className="flex items-center gap-4 border-b border-border bg-accent/50 px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span className="w-[180px]">Contact</span>
              <span className="w-[80px]">Type</span>
              <span className="w-[80px]">Duration</span>
              <span className="w-[150px]">Tools</span>
              <span className="w-[120px]">Sentiment</span>
              <span className="flex-1">Date</span>
            </div>

            {filtered.map((call) => {
              const sConfig = sentimentConfig[call.sentiment]
              const SentIcon = sConfig.icon
              return (
                <div key={call.id}>
                  <button
                    onClick={() => setExpandedId(expandedId === call.id ? null : call.id)}
                    className={cn(
                      "flex w-full items-center gap-4 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent/30",
                      expandedId === call.id && "bg-accent/50"
                    )}
                  >
                    {/* Contact */}
                    <div className="flex w-[180px] items-center gap-2.5">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-[10px] font-medium text-foreground">
                        {call.contact.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="truncate text-xs font-medium text-foreground">{call.contact}</span>
                    </div>

                    {/* Type */}
                    <div className="flex w-[80px] items-center gap-1.5">
                      {call.type === "inbound" ? (
                        <PhoneIncoming className="size-3 text-success" />
                      ) : (
                        <PhoneOutgoing className="size-3 text-chart-2" />
                      )}
                      <span className="text-xs capitalize text-muted-foreground">{call.type}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex w-[80px] items-center gap-1.5">
                      <Clock className="size-3 text-muted-foreground" />
                      <span className="font-mono text-xs text-foreground">{call.duration}</span>
                    </div>

                    {/* Tools */}
                    <div className="flex w-[150px] items-center gap-1">
                      {call.tools.map((tool) => {
                        const ToolIcon = toolIcons[tool] || Phone
                        return (
                          <div
                            key={tool}
                            className="flex size-6 items-center justify-center rounded border border-border bg-accent/50"
                            title={tool}
                          >
                            <ToolIcon className="size-3 text-muted-foreground" />
                          </div>
                        )
                      })}
                    </div>

                    {/* Sentiment */}
                    <div className="w-[120px]">
                      <Badge className={cn("gap-1 border-transparent text-[10px]", sConfig.bg, sConfig.color)}>
                        <SentIcon className="size-2.5" />
                        {sConfig.label}
                      </Badge>
                    </div>

                    {/* Date */}
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-xs text-muted-foreground">{call.date} at {call.time}</span>
                    </div>
                  </button>

                  {/* Expanded Transcript */}
                  {expandedId === call.id && call.transcript && (
                    <div className="border-b border-border bg-accent/30 px-4 py-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Call Summary
                      </p>
                      <p className="text-xs leading-relaxed text-foreground">{call.transcript}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
