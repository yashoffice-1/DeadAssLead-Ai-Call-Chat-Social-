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
  ChevronLeft,
  X,
  Bot,
  ArrowRight,
  Sparkles,
  Pencil,
  RotateCcw,
  Copy,
  Check,
  CheckCheck,
  Wand2,
  MessageSquare,
} from "lucide-react"
import { Card } from "@/components/ui/card"
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

const platformColors: Record<string, string> = {
  instagram: "text-pink-500",
  facebook: "text-blue-500",
  tiktok: "text-foreground",
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
    aiReply: "Awesome! I'd love to set up a demo. You can grab a time here: calendly.com/deadasslead-demo. Looking forward to it!",
    time: "5m ago",
    thread: [
      { sender: "user", text: "I want to book a demo! When are you available?", time: "5m ago" },
      { sender: "ai", text: "Awesome! I'd love to set up a demo. You can grab a time here: calendly.com/deadasslead-demo. Looking forward to it!", time: "Sent 4m ago" },
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
    aiReply: "Hi Lisa! Yes, we offer a 14-day free trial with full access. No credit card required. Sign up at deadasslead.com/trial.",
    time: "32m ago",
    thread: [
      { sender: "user", text: "Is there a free trial available?", time: "32m ago" },
      { sender: "ai", text: "Hi Lisa! Yes, we offer a 14-day free trial with full access. No credit card required. Sign up at deadasslead.com/trial.", time: "Sent 30m ago" },
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
  drafted: { label: "AI Draft", color: "text-amber-600", bg: "bg-amber-500/10", icon: Wand2, dotColor: "bg-amber-500" },
  sent: { label: "Sent", color: "text-emerald-600", bg: "bg-emerald-500/10", icon: CheckCircle2, dotColor: "bg-emerald-500" },
  pending: { label: "Pending", color: "text-muted-foreground", bg: "bg-muted", icon: Clock, dotColor: "bg-muted-foreground" },
}

export function InboxView() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<string>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = platformFilter === "all" ? messages : messages.filter((m) => m.platform === platformFilter)
  const selected = messages.find((m) => m.id === selectedId)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">Social Inbox</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {messages.filter((m) => m.aiStatus === "pending").length} pending, {messages.filter((m) => m.aiStatus === "drafted").length} AI drafts ready
          </p>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
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
              "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              platformFilter === f.id
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 h-[calc(100vh-13rem)] sm:h-[calc(100vh-14rem)]">
        {/* Message List */}
        <Card className={cn("border lg:col-span-2 flex flex-col overflow-hidden", selected ? "hidden lg:flex" : "flex")}>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {filtered.map((msg) => {
                const PlatformIcon = platformIcons[msg.platform]
                const status = statusConfig[msg.aiStatus]
                const StatusIcon = status.icon
                const isSelected = selectedId === msg.id
                return (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    className={cn(
                      "group flex items-center gap-3 border-b border-border px-3 py-3.5 text-left transition-all duration-200 hover:bg-accent/50 sm:px-4",
                      isSelected && "bg-accent/70 border-l-2 border-l-foreground"
                    )}
                  >
                    {/* Platform Icon */}
                    <div className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/50 transition-colors",
                      isSelected && "bg-foreground/10 border-foreground/20"
                    )}>
                      <PlatformIcon className={cn("size-4", platformColors[msg.platform])} />
                    </div>

                    {/* User + Message */}
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-semibold", isSelected ? "text-foreground" : "text-foreground/80")}>{msg.user}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                      <span className="truncate text-xs text-muted-foreground">{msg.message}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className={cn("relative flex size-2", msg.aiStatus !== "pending" && "sm:hidden")}>
                        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", status.dotColor, msg.aiStatus === "sent" && "animate-none")} />
                        <span className={cn("relative inline-flex size-2 rounded-full", status.dotColor)} />
                      </span>
                      <Badge className={cn("hidden shrink-0 gap-1 border-transparent text-[10px] sm:flex", status.bg, status.color)}>
                        <StatusIcon className="size-2.5" />
                        {status.label}
                      </Badge>
                    </div>

                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Preview Panel */}
        <Card className={cn("border lg:col-span-3 flex flex-col overflow-hidden", selected ? "flex" : "hidden lg:flex")}>
          {selected ? (
            <div className="flex h-full flex-col">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-border px-3 py-3 sm:px-4">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className={cn(
                    "flex size-9 items-center justify-center rounded-full text-xs font-bold",
                    "bg-gradient-to-br from-foreground/10 to-foreground/5 text-foreground ring-2 ring-border"
                  )}>
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{selected.user}</p>
                    <div className="flex items-center gap-1.5">
                      {(() => {
                        const PIcon = platformIcons[selected.platform]
                        return <PIcon className={cn("size-3", platformColors[selected.platform])} />
                      })()}
                      <span className="text-[10px] text-muted-foreground capitalize">{selected.platform}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <Badge className={cn("h-4 gap-0.5 border-transparent px-1.5 text-[9px]", statusConfig[selected.aiStatus].bg, statusConfig[selected.aiStatus].color)}>
                        {statusConfig[selected.aiStatus].label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedId(null)} className="hidden rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:flex">
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Conversation Thread - WhatsApp Style */}
              <div className="flex-1 overflow-y-auto bg-[#efeae2]/40 dark:bg-[#0b141a]/40 px-3 py-4 sm:px-4 border-b border-border">
                <div className="flex flex-col gap-3">
                  {selected.thread.map((entry, i) => (
                    <div
                      key={i}
                      className={cn(
                        "group/msg flex w-full flex-col",
                        entry.sender === "user" ? "items-start" : "items-end"
                      )}
                    >
                      {/* Message Bubble */}
                      <div
                        className={cn(
                          "relative max-w-[85%] rounded-2xl px-3 pb-1.5 pt-2 shadow-sm sm:max-w-[75%]",
                          entry.sender === "user"
                            ? "rounded-tl-none border border-border/50 bg-white dark:bg-[#202c33]"
                            : "rounded-tr-none bg-[#d9fdd3] dark:bg-[#005c4b]"
                        )}
                      >
                        {/* Optional Sender Label for AI */}
                        {entry.sender === "ai" && (
                          <div className="mb-0.5 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              DeadAssLead AI
                            </span>
                            {/* Copy button - shown on hover */}
                            <button
                              onClick={() => handleCopy(entry.text, `${selected.id}-${i}`)}
                              className="opacity-0 transition-opacity hover:opacity-100 group-hover/msg:opacity-100 text-muted-foreground hover:text-foreground"
                            >
                              {copiedId === `${selected.id}-${i}` ? (
                                <Check className="size-3 text-emerald-600" />
                              ) : (
                                <Copy className="size-3" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Message Text */}
                        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                          <p className={cn(
                            "text-[13px] leading-snug break-words whitespace-pre-wrap",
                            entry.sender === "user" ? "text-foreground/90" : "text-foreground/90 dark:text-white/90"
                          )}>
                            {entry.text}
                          </p>
                          
                          {/* Timestamp + Read Ticks overlaying bottom right */}
                          <div className={cn(
                            "ml-auto flex shrink-0 items-center justify-end gap-1 text-[10px] leading-none pb-0.5",
                            entry.sender === "user" ? "text-muted-foreground/60" : "text-emerald-700/60 dark:text-emerald-100/60"
                          )}>
                            <span>{entry.time}</span>
                            {entry.sender === "ai" && (
                              <CheckCheck className={cn(
                                "size-3.5",
                                selected.aiStatus === "sent" ? "text-blue-500 dark:text-blue-400" : "opacity-70"
                              )} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              {selected.aiStatus === "drafted" && (
                <div className="flex flex-col gap-2 border-t border-border bg-card/80 p-3 backdrop-blur-sm sm:p-4">
                  {/* AI Draft indicator */}
                  <div className="flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 dark:bg-violet-500/10">
                    <Sparkles className="size-3.5 text-violet-600 dark:text-violet-400" />
                    <span className="flex-1 text-[11px] font-medium text-violet-700 dark:text-violet-300">AI draft ready for review</span>
                    <button className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-violet-600 transition-colors hover:bg-violet-100 dark:text-violet-400 dark:hover:bg-violet-500/20">
                      <RotateCcw className="size-2.5" />
                      Regenerate
                    </button>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:border-foreground/20 hover:shadow-sm"
                    >
                      <Pencil className="size-3" />
                      Edit Reply
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-md"
                    >
                      <Send className="size-3" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}

              {selected.aiStatus === "pending" && (
                <div className="flex flex-col gap-2 border-t border-border bg-card/80 p-3 backdrop-blur-sm sm:p-4">
                  {/* Pending indicator */}
                  <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 dark:bg-amber-500/10">
                    <Clock className="size-3.5 text-amber-600 dark:text-amber-400" />
                    <span className="text-[11px] font-medium text-amber-700 dark:text-amber-300">No AI reply generated yet</span>
                  </div>
                  {/* Generate Button */}
                  <Button
                    size="sm"
                    className="w-full gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:from-violet-700 hover:to-purple-700 hover:shadow-lg"
                  >
                    <div className="flex size-5 items-center justify-center rounded-md bg-white/20">
                      <Sparkles className="size-3" />
                    </div>
                    Generate AI Reply
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground">
                    AI will analyze the conversation and craft a contextual reply
                  </p>
                </div>
              )}

              {selected.aiStatus === "sent" && (
                <div className="flex items-center gap-2 border-t border-border bg-emerald-50/50 p-3 sm:p-4 dark:bg-emerald-500/5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Reply sent successfully</span>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="flex h-[400px] flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-500/20 dark:to-purple-500/10">
                <MessageSquare className="size-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Select a conversation</p>
                <p className="mt-1 max-w-[200px] text-xs leading-relaxed text-muted-foreground">
                  Click any message to see the full thread and AI-drafted response
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
