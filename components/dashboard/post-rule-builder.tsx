"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Zap,
  Sparkles,
  Bot,
  Image as ImageIcon,
  Clapperboard,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Save,
  Wand2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface PostRuleBuilderProps {
  onBack: () => void
  onSave: () => void
  initialName?: string
  initialPlatform?: "instagram" | "tiktok" | "facebook"
  initialSchedule?: string
  initialPrompt?: string
}

export function PostRuleBuilder({ 
  onBack, 
  onSave,
  initialName = "",
  initialPlatform = "instagram",
  initialSchedule = "",
  initialPrompt = ""
}: PostRuleBuilderProps) {
  const [activePlatform, setActivePlatform] = useState<"instagram" | "tiktok" | "facebook">(initialPlatform)
  const [triggerType, setTriggerType] = useState<"schedule" | "event">("schedule")
  const [creativeFormat, setCreativeFormat] = useState<"image" | "video" | "carousel">("image")
  const [requireReview, setRequireReview] = useState(true)

  const [ruleName, setRuleName] = useState(initialName)
  const [schedulePattern, setSchedulePattern] = useState(initialSchedule)
  const [promptContent, setPromptContent] = useState(initialPrompt)

  return (
    <div className="flex flex-col gap-6 animate-view-in pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{initialName ? "Edit AI Post Rule" : "Create AI Post Rule"}</h2>
            <p className="text-sm text-muted-foreground">Define what, when, and how the AI should publish content.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack}>Cancel</Button>
          <Button size="sm" onClick={onSave} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Save className="size-3.5" />
            Save Rule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Form Settings */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          {/* 1. Platform & Basic Info */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-500/20">
                  <Globe className="size-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Target Platform</CardTitle>
                  <CardDescription className="text-xs">Where should this content be published?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="rule-name" className="text-xs">Rule Name</Label>
                <Input 
                  id="rule-name" 
                  placeholder="e.g. Weekly Product Spotlight" 
                  className="h-9 text-sm" 
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "instagram", label: "Instagram", icon: ImageIcon, color: "text-pink-500", bg: "bg-pink-500/10 border-pink-500/20" },
                  { id: "tiktok", label: "TikTok", icon: Clapperboard, color: "text-foreground", bg: "bg-foreground/10 border-foreground/20" },
                  { id: "facebook", label: "Facebook", icon: Globe, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
                ].map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => setActivePlatform(plat.id as any)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                      activePlatform === plat.id 
                        ? cn("border-border shadow-sm ring-1 ring-ring", plat.bg)
                        : "border-border bg-card hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <plat.icon className={cn("size-6", activePlatform === plat.id ? plat.color : "text-muted-foreground")} />
                    <span className={cn("text-xs font-medium", activePlatform === plat.id && "text-foreground")}>{plat.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 2. Trigger */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                  <Zap className="size-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Trigger Settings</CardTitle>
                  <CardDescription className="text-xs">When should this rule run?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex gap-2 rounded-lg border border-border bg-accent/30 p-1">
                <button
                  onClick={() => setTriggerType("schedule")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-medium transition-all",
                    triggerType === "schedule" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Calendar className="size-3.5" />
                  Time-Based Schedule
                </button>
                <button
                  onClick={() => setTriggerType("event")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-medium transition-all",
                    triggerType === "event" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Zap className="size-3.5" />
                  Event Trigger
                </button>
              </div>

              {triggerType === "schedule" ? (
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Schedule Pattern (Cron or Natural Language)</Label>
                  <Input 
                    placeholder="e.g. Every Monday at 9:00 AM" 
                    className="h-9 text-sm" 
                    value={schedulePattern}
                    onChange={(e) => setSchedulePattern(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Event Source</Label>
                  <Input placeholder="e.g. New Blog Post Published via RSS" className="h-9 text-sm" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 3. Content Engine */}
          <Card className="border shadow-sm relative overflow-hidden">
            {/* Subtle gradient background for AI section */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
            <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-violet-500/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 size-24 rounded-full bg-purple-500/10 blur-2xl" />
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">AI Content Engine</CardTitle>
                  <CardDescription className="text-xs">Define how the AI creates the post</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 relative z-10">
              
              <div className="flex flex-col gap-3">
                <Label className="text-xs font-medium">Creative Format</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "image", label: "Single Image", icon: ImageIcon },
                    { id: "video", label: "Short Video", icon: Clapperboard },
                    { id: "carousel", label: "Carousel", icon: FileText },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setCreativeFormat(fmt.id as any)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border p-2.5 transition-colors",
                        creativeFormat === fmt.id
                          ? "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                          : "border-border bg-card text-muted-foreground hover:bg-accent/50"
                      )}
                    >
                      <fmt.icon className="size-4" />
                      <span className="text-xs font-medium">{fmt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">System Prompt / Instructions</Label>
                  <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-[10px] text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400">
                    <Wand2 className="size-3" /> Enhance Prompt
                  </Button>
                </div>
                <Textarea 
                  placeholder="e.g. Generate an educational post about the benefits of AI in customer support. Keep the tone professional but approachable. Always include 3 relevant hashtags."
                  className="min-h-[120px] resize-none text-sm leading-relaxed"
                  value={promptContent}
                  onChange={(e) => setPromptContent(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Approval & Summary */}
        <div className="flex flex-col gap-6">
          
          {/* Approval Gate */}
          <Card className={cn(
            "border shadow-sm transition-colors duration-300",
            requireReview ? "bg-amber-500/5 border-amber-500/20" : "bg-emerald-500/5 border-emerald-500/20"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    requireReview ? "bg-amber-500/20 text-amber-600" : "bg-emerald-500/20 text-emerald-600"
                  )}>
                    {requireReview ? <ShieldCheck className="size-4" /> : <Zap className="size-4" />}
                  </div>
                  <CardTitle className="text-sm">Approval Gate</CardTitle>
                </div>
                <Switch checked={requireReview} onCheckedChange={setRequireReview} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {requireReview 
                  ? "Generated posts will be sent to the Drafts board. A human must manually review and click 'Approve' before they go live on social media."
                  : "DANGER: Posts generated by this rule will be instantly published to social media without human review."}
              </p>
            </CardContent>
          </Card>

          {/* Flow Summary Graphic */}
          <Card className="border shadow-sm bg-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Rule Execution Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-0 relative">
                {/* Connecting Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border z-0" />
                
                {/* Step 1 */}
                <div className="flex items-center gap-3 relative z-10 py-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-card border border-border shadow-sm">
                    {triggerType === "schedule" ? <Calendar className="size-3.5 text-blue-500" /> : <Zap className="size-3.5 text-blue-500" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">Trigger</span>
                    <span className="text-xs font-semibold text-foreground">
                      {triggerType === "schedule" ? "Time Schedule" : "Selected Event"}
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3 relative z-10 py-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-violet-100 border border-violet-200 dark:bg-violet-500/20 dark:border-violet-500/30">
                    <Bot className="size-3.5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-violet-600 dark:text-violet-400 uppercase">Generation</span>
                    <span className="text-xs font-semibold text-foreground">AI drafts {creativeFormat} + caption</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3 relative z-10 py-3">
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-full bg-card border shadow-sm",
                    requireReview ? "border-amber-500/40 text-amber-500" : "border-emerald-500/40 text-emerald-500"
                  )}>
                    {requireReview ? <ShieldCheck className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">Gate</span>
                    <span className="text-xs font-semibold text-foreground">
                      {requireReview ? "Wait for manual approval" : "Auto-publish immediately"}
                    </span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-3 relative z-10 py-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-card border border-border shadow-sm">
                    {activePlatform === "instagram" && <ImageIcon className="size-3.5 text-pink-500" />}
                    {activePlatform === "facebook" && <Globe className="size-3.5 text-blue-500" />}
                    {activePlatform === "tiktok" && <Clapperboard className="size-3.5 text-foreground" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">Action</span>
                    <span className="text-xs font-semibold text-foreground capitalize">Publish to {activePlatform}</span>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
