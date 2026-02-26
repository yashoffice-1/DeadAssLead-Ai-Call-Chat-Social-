"use client"

import {
  X,
  Play,
  Pause,
  Settings,
  ArrowRight,
  AlertCircle,
  PhoneCall,
  AudioLines,
  Mic,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Flow } from "./flows-view"

interface FlowDetailPanelProps {
  flow: Flow
  onClose: () => void
}

const toolToggles = [
  { id: "elevenlabs", label: "ElevenLabs TTS", icon: AudioLines, enabled: true },
  { id: "vapi", label: "Vapi Voice AI", icon: PhoneCall, enabled: true },
  { id: "deepgram", label: "Deepgram STT", icon: Mic, enabled: true },
  { id: "plivo", label: "Plivo SMS", icon: MessageSquare, enabled: false },
]

export function FlowDetailPanel({ flow, onClose }: FlowDetailPanelProps) {
  return (
    <div className="flex h-full w-[360px] shrink-0 flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{flow.name}</h3>
          <p className="text-xs text-muted-foreground">{flow.description}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close panel"
        >
          <X className="size-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-5 p-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Status</span>
            <Badge
              className={cn(
                "border-transparent text-xs",
                flow.active
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {flow.active ? "Active" : "Paused"}
            </Badge>
          </div>

          <Separator />

          {/* Connected Nodes */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Flow Pipeline
            </span>
            <div className="flex flex-col gap-2">
              {flow.nodes.map((node, i) => (
                <div key={node.id}>
                  <div className="flex items-center gap-3 rounded-md border border-border bg-accent/50 p-3">
                    <div className="flex size-8 items-center justify-center rounded-md bg-card">
                      <node.icon className="size-4" style={{ color: node.color }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-foreground">{node.label}</span>
                      <span className="text-[10px] text-muted-foreground">{node.service}</span>
                    </div>
                    <Badge variant="outline" className="ml-auto text-[10px] capitalize">
                      {node.type}
                    </Badge>
                  </div>
                  {i < flow.nodes.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-px bg-border" />
                        <ArrowRight className="size-3 rotate-90 text-muted-foreground" />
                        <div className="h-2 w-px bg-border" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rules */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Rules
            </span>
            <div className="flex flex-col gap-2">
              {flow.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-border bg-accent/30 p-2.5">
                  <AlertCircle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                  <span className="text-xs leading-relaxed text-foreground">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Integration Toggles */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tool Integrations
            </span>
            <div className="flex flex-col gap-2.5">
              {toolToggles.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between rounded-md border border-border p-2.5">
                  <div className="flex items-center gap-2.5">
                    <tool.icon className="size-4 text-muted-foreground" />
                    <Label htmlFor={tool.id} className="text-xs font-medium text-foreground cursor-pointer">
                      {tool.label}
                    </Label>
                  </div>
                  <Switch id={tool.id} defaultChecked={tool.enabled} />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Statistics
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-border p-3 text-center">
                <p className="text-lg font-semibold text-foreground">{flow.triggerCount}</p>
                <p className="text-[10px] text-muted-foreground">Total Triggers</p>
              </div>
              <div className="rounded-md border border-border p-3 text-center">
                <p className="text-lg font-semibold text-foreground">{flow.lastTriggered || "N/A"}</p>
                <p className="text-[10px] text-muted-foreground">Last Triggered</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="flex gap-2 border-t border-border p-3">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5">
          <Settings className="size-3" />
          Edit Flow
        </Button>
        <Button size="sm" className="flex-1 gap-1.5">
          {flow.active ? (
            <>
              <Pause className="size-3" />
              Pause
            </>
          ) : (
            <>
              <Play className="size-3" />
              Activate
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
