"use client"

import { useState } from "react"
import {
  Plus,
  Play,
  Pause,
  Trash2,
  Settings,
  ChevronRight,
  Instagram,
  Facebook,
  Clapperboard,
  PhoneCall,
  AudioLines,
  Mic,
  MessageSquare,
  Bot,
  Zap,
  ArrowRight,
  X,
  Power,
  GitBranch,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export interface FlowNode {
  id: string
  type: "trigger" | "processor" | "action"
  label: string
  service: string
  icon: React.ElementType
  color: string
}

export interface Flow {
  id: string
  name: string
  description: string
  active: boolean
  nodes: FlowNode[]
  rules: string[]
  lastTriggered?: string
  triggerCount: number
}

const sampleFlows: Flow[] = [
  {
    id: "flow-1",
    name: "TikTok Lead Gen",
    description: "Auto-reply to TikTok DMs and route hot leads to voice calls",
    active: true,
    nodes: [
      { id: "n1", type: "trigger", label: "New TikTok DM", service: "TikTok", icon: Clapperboard, color: "#0a0a0a" },
      { id: "n2", type: "processor", label: "OpenAI Processing", service: "OpenAI", icon: Bot, color: "#0a0a0a" },
      { id: "n3", type: "action", label: "Vapi Voice Call", service: "Vapi", icon: PhoneCall, color: "#0a0a0a" },
    ],
    rules: ["If DM mentions 'Booking', call via Vapi", "If sentiment is negative, route to human"],
    lastTriggered: "2m ago",
    triggerCount: 147,
  },
  {
    id: "flow-2",
    name: "Instagram Support Bot",
    description: "Respond to Instagram DMs with AI-generated answers",
    active: true,
    nodes: [
      { id: "n4", type: "trigger", label: "New IG Message", service: "Instagram", icon: Instagram, color: "#E4405F" },
      { id: "n5", type: "processor", label: "AI Analysis", service: "OpenAI", icon: Bot, color: "#0a0a0a" },
      { id: "n6", type: "action", label: "Auto Reply", service: "Instagram", icon: MessageSquare, color: "#E4405F" },
    ],
    rules: ["If question about pricing, include link", "Max 3 auto-replies per conversation"],
    lastTriggered: "5m ago",
    triggerCount: 892,
  },
  {
    id: "flow-3",
    name: "Facebook Comment Monitor",
    description: "Monitor Facebook comments and generate voice follow-ups for interested leads",
    active: false,
    nodes: [
      { id: "n7", type: "trigger", label: "New FB Comment", service: "Facebook", icon: Facebook, color: "#1877F2" },
      { id: "n8", type: "processor", label: "Sentiment Check", service: "Deepgram", icon: Mic, color: "#10b981" },
      { id: "n9", type: "action", label: "ElevenLabs TTS", service: "ElevenLabs", icon: AudioLines, color: "#0a0a0a" },
    ],
    rules: ["Only process comments with 'interested' keyword", "Generate voice memo for sales team"],
    lastTriggered: "3h ago",
    triggerCount: 56,
  },
  {
    id: "flow-4",
    name: "Multi-Platform Outreach",
    description: "Cross-platform lead nurture with voice and text",
    active: true,
    nodes: [
      { id: "n10", type: "trigger", label: "New Lead Added", service: "Webhook", icon: Zap, color: "#f59e0b" },
      { id: "n11", type: "processor", label: "AI Script Gen", service: "OpenAI", icon: Bot, color: "#0a0a0a" },
      { id: "n12", type: "action", label: "Vapi Outbound Call", service: "Vapi", icon: PhoneCall, color: "#0a0a0a" },
    ],
    rules: ["Call between 9am-6pm only", "If voicemail, send follow-up DM"],
    lastTriggered: "12m ago",
    triggerCount: 234,
  },
]

interface FlowsViewProps {
  onSelectFlow: (flow: Flow) => void
  selectedFlowId?: string
}

export function FlowsView({ onSelectFlow, selectedFlowId }: FlowsViewProps) {
  const [flows, setFlows] = useState<Flow[]>(sampleFlows)
  const [showNewFlow, setShowNewFlow] = useState(false)

  const toggleFlow = (id: string) => {
    setFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    )
  }

  const deleteFlow = (id: string) => {
    setFlows((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">My Flows</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {flows.filter((f) => f.active).length} active of {flows.length} flows
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowNewFlow(true)}
          className="gap-1.5 w-full sm:w-auto"
        >
          <Plus className="size-3.5" />
          New Flow
        </Button>
      </div>

      {/* New Flow Placeholder */}
      {showNewFlow && (
        <Card className="border border-dashed border-border">
          <CardContent className="flex flex-col items-center gap-4 py-10">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent">
              <GitBranch className="size-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Create a new flow
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Use the command bar above to describe your automation, or start from scratch.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowNewFlow(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setShowNewFlow(false)} className="gap-1.5">
                <Sparkles className="size-3" />
                Describe with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flow Cards */}
      <div className="flex flex-col gap-3">
        {flows.map((flow) => (
          <FlowCard
            key={flow.id}
            flow={flow}
            selected={selectedFlowId === flow.id}
            onSelect={() => onSelectFlow(flow)}
            onToggle={() => toggleFlow(flow.id)}
            onDelete={() => deleteFlow(flow.id)}
          />
        ))}
      </div>
    </div>
  )
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  )
}

function FlowCard({
  flow,
  selected,
  onSelect,
  onToggle,
  onDelete,
}: {
  flow: Flow
  selected: boolean
  onSelect: () => void
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer border transition-all hover:shadow-sm",
        selected ? "border-foreground shadow-sm" : "border-border"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">{flow.name}</h3>
                {flow.active ? (
                  <Badge className="h-5 border-transparent bg-success/10 px-1.5 text-[10px] font-medium text-success">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-medium text-muted-foreground">
                    Paused
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{flow.description}</p>
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <Switch
                checked={flow.active}
                onCheckedChange={onToggle}
                aria-label={`Toggle ${flow.name}`}
              />
            </div>
          </div>

          {/* Visual Node Map */}
          <div className="flex items-center gap-0 overflow-x-auto py-1 no-scrollbar">
            {flow.nodes.map((node, i) => (
              <div key={node.id} className="flex shrink-0 items-center">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md border px-3 py-1.5",
                    node.type === "trigger" && "border-border bg-accent",
                    node.type === "processor" && "border-border bg-card",
                    node.type === "action" && "border-border bg-accent"
                  )}
                >
                  <node.icon className="size-3.5" style={{ color: node.color }} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {node.type}
                    </span>
                    <span className="whitespace-nowrap text-xs font-medium text-foreground">
                      {node.label}
                    </span>
                  </div>
                </div>
                {i < flow.nodes.length - 1 && (
                  <div className="flex items-center px-1">
                    <div className="h-px w-4 bg-border" />
                    <ArrowRight className="size-3 text-muted-foreground" />
                    <div className="h-px w-4 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>{flow.triggerCount} triggers</span>
              {flow.lastTriggered && (
                <span>Last: {flow.lastTriggered}</span>
              )}
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                <Settings className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
