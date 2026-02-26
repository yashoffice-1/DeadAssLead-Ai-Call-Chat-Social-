"use client"

import { useState } from "react"
import {
  Plus,
  Calendar,
  Instagram,
  Facebook,
  Clapperboard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Power,
  Edit2,
  Image,
  FileText,
  Bot,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface PostRule {
  id: string
  name: string
  schedule: string
  platform: "instagram" | "facebook" | "tiktok"
  prompt: string
  enabled: boolean
}

interface ScheduledPost {
  id: string
  platform: "instagram" | "facebook" | "tiktok"
  scheduledDate: string
  scheduledTime: string
  caption: string
  status: "scheduled" | "posted" | "failed"
  creativeType: "image" | "video" | "carousel"
}

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Clapperboard,
}

const rules: PostRule[] = [
  {
    id: "r1",
    name: "Monday TikTok Drop",
    schedule: "Every Monday at 9:00 AM",
    platform: "tiktok",
    prompt: "Generate a TikTok about Product X highlighting the latest AI features. Keep it under 60s, trendy style.",
    enabled: true,
  },
  {
    id: "r2",
    name: "Wednesday IG Carousel",
    schedule: "Every Wednesday at 12:00 PM",
    platform: "instagram",
    prompt: "Create an Instagram carousel showing 5 tips for using AI in marketing. Clean, minimal design.",
    enabled: true,
  },
  {
    id: "r3",
    name: "Friday FB Feature Spotlight",
    schedule: "Every Friday at 3:00 PM",
    platform: "facebook",
    prompt: "Write a Facebook post highlighting one new feature released this week. Include a CTA for demos.",
    enabled: false,
  },
  {
    id: "r4",
    name: "Daily IG Story",
    schedule: "Daily at 8:00 AM",
    platform: "instagram",
    prompt: "Generate a behind-the-scenes Instagram story about the team or product development.",
    enabled: true,
  },
]

const scheduledPosts: ScheduledPost[] = [
  { id: "p1", platform: "tiktok", scheduledDate: "Mon, Feb 24", scheduledTime: "9:00 AM", caption: "5 ways AI is changing how creators manage DMs. #AItools #CreatorEconomy", status: "scheduled", creativeType: "video" },
  { id: "p2", platform: "instagram", scheduledDate: "Wed, Feb 26", scheduledTime: "12:00 PM", caption: "Swipe through our top 5 AI marketing tips for 2026...", status: "scheduled", creativeType: "carousel" },
  { id: "p3", platform: "instagram", scheduledDate: "Today", scheduledTime: "8:00 AM", caption: "A day in the life at NexusAI HQ. New features loading...", status: "posted", creativeType: "image" },
  { id: "p4", platform: "facebook", scheduledDate: "Yesterday", scheduledTime: "3:00 PM", caption: "Introducing Smart Reply v2 - now with multi-language support! Book a demo: nexusai.com/demo", status: "posted", creativeType: "image" },
  { id: "p5", platform: "tiktok", scheduledDate: "Feb 17", scheduledTime: "9:00 AM", caption: "POV: Your AI assistant just booked 12 demos while you slept. #NexusAI #Automation", status: "posted", creativeType: "video" },
  { id: "p6", platform: "instagram", scheduledDate: "Feb 19", scheduledTime: "12:00 PM", caption: "The complete guide to AI-powered social media management (link in bio)", status: "failed", creativeType: "carousel" },
]

const statusConfig = {
  scheduled: { label: "Scheduled", color: "text-chart-2", bg: "bg-chart-2/10" },
  posted: { label: "Posted", color: "text-success", bg: "bg-success/10" },
  failed: { label: "Failed", color: "text-destructive", bg: "bg-destructive/10" },
}

const creativeIcons: Record<string, React.ElementType> = {
  image: Image,
  video: Clapperboard,
  carousel: FileText,
}

export function RulesView() {
  const [activeRules, setActiveRules] = useState<PostRule[]>(rules)
  const [tab, setTab] = useState<"rules" | "tracker">("rules")

  const toggleRule = (id: string) => {
    setActiveRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Post Rules</h2>
          <p className="text-sm text-muted-foreground">
            {activeRules.filter((r) => r.enabled).length} active rules, {scheduledPosts.filter((p) => p.status === "scheduled").length} upcoming posts
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          New Rule
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5">
        <button
          onClick={() => setTab("rules")}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            tab === "rules"
              ? "bg-foreground text-background"
              : "bg-accent text-muted-foreground hover:text-foreground"
          )}
        >
          Rules Engine
        </button>
        <button
          onClick={() => setTab("tracker")}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            tab === "tracker"
              ? "bg-foreground text-background"
              : "bg-accent text-muted-foreground hover:text-foreground"
          )}
        >
          Post Tracker
        </button>
      </div>

      {tab === "rules" && (
        <div className="flex flex-col gap-3">
          {activeRules.map((rule) => {
            const PlatformIcon = platformIcons[rule.platform]
            return (
              <Card key={rule.id} className={cn("border transition-colors", !rule.enabled && "opacity-60")}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md border border-border bg-accent/50">
                          <PlatformIcon className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-foreground">{rule.name}</h3>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px]",
                                rule.enabled
                                  ? "border-success/30 text-success"
                                  : "border-border text-muted-foreground"
                              )}
                            >
                              {rule.enabled ? "Active" : "Paused"}
                            </Badge>
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{rule.schedule}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => toggleRule(rule.id)}
                          aria-label={`Toggle ${rule.name}`}
                        />
                      </div>
                    </div>

                    {/* Prompt */}
                    <div className="rounded-md border border-border bg-accent/30 p-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <Bot className="size-3 text-muted-foreground" />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          AI Prompt
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground">{rule.prompt}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {tab === "tracker" && (
        <Card className="border">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-border bg-accent/50 px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span className="w-[100px]">Date</span>
                <span className="w-[80px]">Platform</span>
                <span className="w-[70px]">Type</span>
                <span className="flex-1">Caption</span>
                <span className="w-[90px]">Status</span>
              </div>

              {scheduledPosts.map((post) => {
                const PlatformIcon = platformIcons[post.platform]
                const CreativeIcon = creativeIcons[post.creativeType] || Image
                const status = statusConfig[post.status]
                return (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 border-b border-border px-4 py-3 transition-colors hover:bg-accent/30"
                  >
                    {/* Date */}
                    <div className="w-[100px]">
                      <span className="text-xs font-medium text-foreground">{post.scheduledDate}</span>
                      <p className="text-[10px] text-muted-foreground">{post.scheduledTime}</p>
                    </div>

                    {/* Platform */}
                    <div className="flex w-[80px] items-center gap-1.5">
                      <PlatformIcon className="size-3.5 text-muted-foreground" />
                      <span className="text-xs capitalize text-muted-foreground">{post.platform}</span>
                    </div>

                    {/* Type */}
                    <div className="flex w-[70px] items-center gap-1.5">
                      <CreativeIcon className="size-3 text-muted-foreground" />
                      <span className="text-xs capitalize text-muted-foreground">{post.creativeType}</span>
                    </div>

                    {/* Caption */}
                    <p className="flex-1 truncate text-xs text-foreground">{post.caption}</p>

                    {/* Status */}
                    <div className="w-[90px]">
                      <Badge className={cn("border-transparent text-[10px]", status.bg, status.color)}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  )
}
