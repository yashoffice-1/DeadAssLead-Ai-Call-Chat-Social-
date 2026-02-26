"use client"

import { useState } from "react"
import {
  Instagram,
  Facebook,
  Clapperboard,
  User,
  CheckCircle2,
  Clock,
  Send,
  ChevronRight,
  X,
  Bot,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface InboxMessage {
  id: string
  platform: "instagram" | "facebook" | "tiktok"
  user: string
  avatar: string
  message: string
  aiStatus: "drafted" | "sent" | "pending"
  aiReply?: string
  time: string
  thread: { sender: "user" | "ai"; text: string; time: string }[]
}

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Clapperboard,
}

const platformLabels: Record<string, string> = {
  instagram: "IG",
  facebook: "FB",
  tiktok: "TT",
}

const messages: InboxMessage[] = [
  {
    id: "m1",
    platform: "instagram",
    user: "@sarah_designs",
    avatar: "SD",
    message: "Hey! I saw your latest post about AI tools. Can you tell me more about pricing?",
    aiStatus: "drafted",
    aiReply: "Hi Sarah! Thanks for reaching out. Our AI tools start at $29/mo for the Starter plan. Would you like me to send over a full breakdown?",
    time: "2m ago",
    thread: [
      { sender: "user", text: "Hey! I saw your latest post about AI tools. Can you tell me more about pricing?", time: "2m ago" },
      { sender: "ai", text: "Hi Sarah! Thanks for reaching out. Our AI tools start at $29/mo for the Starter plan. Would you like me to send over a full breakdown?", time: "AI Draft" },
    ],
  },
  {
    id: "m2",
    platform: "tiktok",
    user: "@content_creator_99",
    avatar: "CC",
    message: "I want to book a demo! When are you available?",
    aiStatus: "sent",
    aiReply: "Awesome! I'd love to set up a demo. You can grab a time here: calendly.com/nexus-demo. Looking forward to it!",
    time: "5m ago",
    thread: [
      { sender: "user", text: "I want to book a demo! When are you available?", time: "5m ago" },
      { sender: "ai", text: "Awesome! I'd love to set up a demo. You can grab a time here: calendly.com/nexus-demo. Looking forward to it!", time: "Sent 4m ago" },
    ],
  },
  {
    id: "m3",
    platform: "facebook",
    user: "Mike Thompson",
    avatar: "MT",
    message: "Your product looks interesting. Does it integrate with Shopify?",
    aiStatus: "drafted",
    aiReply: "Hi Mike! Yes, we have a direct Shopify integration. It syncs your product catalog automatically. Want me to walk you through the setup?",
    time: "12m ago",
    thread: [
      { sender: "user", text: "Your product looks interesting. Does it integrate with Shopify?", time: "12m ago" },
      { sender: "ai", text: "Hi Mike! Yes, we have a direct Shopify integration. It syncs your product catalog automatically. Want me to walk you through the setup?", time: "AI Draft" },
    ],
  },
  {
    id: "m4",
    platform: "instagram",
    user: "@tech_guru",
    avatar: "TG",
    message: "Can I get a discount on the annual plan?",
    aiStatus: "pending",
    time: "18m ago",
    thread: [
      { sender: "user", text: "Can I get a discount on the annual plan?", time: "18m ago" },
    ],
  },
  {
    id: "m5",
    platform: "tiktok",
    user: "@growth_hacker_jay",
    avatar: "GH",
    message: "Just shared your video with my team. We're interested in the enterprise tier.",
    aiStatus: "drafted",
    aiReply: "That's great to hear, Jay! Our Enterprise plan includes dedicated support and custom integrations. Let me connect you with our sales team.",
    time: "25m ago",
    thread: [
      { sender: "user", text: "Just shared your video with my team. We're interested in the enterprise tier.", time: "25m ago" },
      { sender: "ai", text: "That's great to hear, Jay! Our Enterprise plan includes dedicated support and custom integrations. Let me connect you with our sales team.", time: "AI Draft" },
    ],
  },
  {
    id: "m6",
    platform: "facebook",
    user: "Lisa Chen",
    avatar: "LC",
    message: "Is there a free trial available?",
    aiStatus: "sent",
    aiReply: "Hi Lisa! Yes, we offer a 14-day free trial with full access. No credit card required. Sign up at nexusai.com/trial.",
    time: "32m ago",
    thread: [
      { sender: "user", text: "Is there a free trial available?", time: "32m ago" },
      { sender: "ai", text: "Hi Lisa! Yes, we offer a 14-day free trial with full access. No credit card required. Sign up at nexusai.com/trial.", time: "Sent 30m ago" },
    ],
  },
  {
    id: "m7",
    platform: "instagram",
    user: "@startup_daily",
    avatar: "SU",
    message: "Would love to feature you in our newsletter. Who should I contact?",
    aiStatus: "pending",
    time: "45m ago",
    thread: [
      { sender: "user", text: "Would love to feature you in our newsletter. Who should I contact?", time: "45m ago" },
    ],
  },
]

const statusConfig = {
  drafted: { label: "AI Drafted", color: "text-chart-4", bg: "bg-chart-4/10", icon: Clock },
  sent: { label: "Sent", color: "text-success", bg: "bg-success/10", icon: CheckCircle2 },
  pending: { label: "Pending", color: "text-muted-foreground", bg: "bg-muted", icon: Clock },
}

export function InboxView() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<string>("all")

  const filtered = platformFilter === "all" ? messages : messages.filter((m) => m.platform === platformFilter)
  const selected = messages.find((m) => m.id === selectedId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Social Inbox</h2>
          <p className="text-sm text-muted-foreground">
            {messages.filter((m) => m.aiStatus === "pending").length} pending, {messages.filter((m) => m.aiStatus === "drafted").length} AI drafts ready
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5">
        {[
          { id: "all", label: "All" },
          { id: "instagram", label: "Instagram" },
          { id: "facebook", label: "Facebook" },
          { id: "tiktok", label: "TikTok" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setPlatformFilter(f.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              platformFilter === f.id
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Message Table */}
        <Card className="border lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="flex flex-col">
              {filtered.map((msg) => {
                const PlatformIcon = platformIcons[msg.platform]
                const status = statusConfig[msg.aiStatus]
                const StatusIcon = status.icon
                return (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    className={cn(
                      "flex items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent/50",
                      selectedId === msg.id && "bg-accent/70"
                    )}
                  >
                    {/* Platform */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-accent/50">
                      <PlatformIcon className="size-3.5 text-muted-foreground" />
                    </div>

                    {/* User + Message */}
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground">{msg.user}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                      <span className="truncate text-xs text-muted-foreground">{msg.message}</span>
                    </div>

                    {/* Status */}
                    <Badge className={cn("shrink-0 gap-1 border-transparent text-[10px]", status.bg, status.color)}>
                      <StatusIcon className="size-2.5" />
                      {status.label}
                    </Badge>

                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Preview Panel */}
        <Card className="border lg:col-span-2">
          {selected ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-foreground">
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{selected.user}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{selected.platform}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedId(null)} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                  <X className="size-3.5" />
                </button>
              </div>

              <ScrollArea className="flex-1 px-4 py-3">
                <div className="flex flex-col gap-3">
                  {selected.thread.map((entry, i) => (
                    <div
                      key={i}
                      className={cn(
                        "max-w-[85%] rounded-lg p-3",
                        entry.sender === "user"
                          ? "self-start border border-border bg-accent/50"
                          : "self-end border border-foreground/10 bg-foreground/5"
                      )}
                    >
                      <div className="mb-1 flex items-center gap-1.5">
                        {entry.sender === "ai" && <Bot className="size-3 text-muted-foreground" />}
                        {entry.sender === "user" && <User className="size-3 text-muted-foreground" />}
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {entry.sender === "ai" ? "AI" : selected.user}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground">{entry.text}</p>
                      <p className="mt-1.5 text-[10px] text-muted-foreground">{entry.time}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {selected.aiStatus === "drafted" && (
                <div className="flex gap-2 border-t border-border p-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1 gap-1 text-xs">
                    <Send className="size-3" />
                    Send Reply
                  </Button>
                </div>
              )}

              {selected.aiStatus === "pending" && (
                <div className="flex gap-2 border-t border-border p-3">
                  <Button size="sm" className="flex-1 gap-1.5 text-xs">
                    <Bot className="size-3" />
                    Generate AI Reply
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-[400px] flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-accent">
                <Send className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a conversation</p>
              <p className="text-xs text-muted-foreground">
                Click any message to see the full thread and AI-drafted response
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
