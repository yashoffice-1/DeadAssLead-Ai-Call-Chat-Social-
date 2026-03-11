"use client"

import { useState } from "react"
import {
  Instagram,
  Facebook,
  Clapperboard,
  PhoneCall,
  AudioLines,
  Mic,
  MessageSquare,
  Mail,
  Database,
  Cloud,
  CheckCircle2,
  ExternalLink,
  Key,
  Unplug,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ConnectionStatus = "connected" | "disconnected"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ElementType
  status: ConnectionStatus
  category: "social" | "voice" | "communication" | "data"
  brandColor: string
}

const integrations: Integration[] = [
  { id: "instagram", name: "Instagram", description: "IG Graph API - DMs, posts, comments", icon: Instagram, status: "connected", category: "social", brandColor: "#E4405F" },
  { id: "facebook", name: "Facebook", description: "Pages API - Posts, messages, insights", icon: Facebook, status: "connected", category: "social", brandColor: "#1877F2" },
  { id: "tiktok", name: "TikTok", description: "Content API - Videos, analytics", icon: Clapperboard, status: "connected", category: "social", brandColor: "#0a0a0a" },
  { id: "vapi", name: "Vapi", description: "Voice AI platform for outbound calls", icon: PhoneCall, status: "connected", category: "voice", brandColor: "#0a0a0a" },
  { id: "elevenlabs", name: "ElevenLabs", description: "Text-to-speech voice synthesis", icon: AudioLines, status: "connected", category: "voice", brandColor: "#0a0a0a" },
  { id: "deepgram", name: "Deepgram", description: "Speech-to-text recognition", icon: Mic, status: "connected", category: "voice", brandColor: "#10b981" },
  { id: "plivo", name: "Plivo", description: "SMS & Voice telephony API", icon: MessageSquare, status: "disconnected", category: "communication", brandColor: "#6366f1" },
  { id: "sendgrid", name: "SendGrid", description: "Email delivery & campaigns", icon: Mail, status: "disconnected", category: "communication", brandColor: "#0a0a0a" },
  { id: "supabase", name: "Supabase", description: "Database & real-time subscriptions", icon: Database, status: "connected", category: "data", brandColor: "#10b981" },
  { id: "vercel", name: "Vercel", description: "Hosting & edge functions", icon: Cloud, status: "connected", category: "data", brandColor: "#0a0a0a" },
]

const categories = [
  { id: "all", label: "All" },
  { id: "social", label: "Social" },
  { id: "voice", label: "Voice" },
  { id: "communication", label: "Comms" },
  { id: "data", label: "Data" },
]

interface IntegrationsViewProps {
  onConnect?: (serviceId: string) => void
}

export function IntegrationsView({ onConnect }: IntegrationsViewProps) {
  const [filter, setFilter] = useState("all")
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const filtered = filter === "all" ? integrations : integrations.filter((i) => i.category === filter)
  const connectedCount = integrations.filter((i) => i.status === "connected").length

  const handleConnect = (id: string) => {
    if (onConnect) {
      onConnect(id)
    } else {
      setConnectingId(id)
      setTimeout(() => setConnectingId(null), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">Integrations</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {connectedCount} of {integrations.length} services connected
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5 w-full sm:w-auto">
          <Key className="size-3" />
          API Keys
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              filter === cat.id
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((integration) => (
          <div key={integration.id} className="flex flex-col gap-4 bg-card p-3 transition-all duration-200 hover:bg-accent/30 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-accent/50 transition-transform duration-200 hover:scale-105">
                  <integration.icon className="size-4" style={{ color: integration.brandColor }} />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{integration.name}</span>
                  <p className="text-[11px] text-muted-foreground">{integration.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {integration.status === "connected" ? (
                <Badge className="gap-1.5 border-transparent bg-success/10 text-success text-[11px]">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1.5 text-[11px] text-muted-foreground">
                  <Unplug className="size-3" />
                  Disconnected
                </Badge>
              )}

              {integration.status === "connected" ? (
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                  <ExternalLink className="size-3" />
                  Settings
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleConnect(integration.id)}
                  disabled={connectingId === integration.id}
                  className="h-7 text-xs"
                >
                  {connectingId === integration.id ? "Connecting..." : "Connect"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
