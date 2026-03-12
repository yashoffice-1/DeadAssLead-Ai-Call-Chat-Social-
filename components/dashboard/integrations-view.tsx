"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
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
  darkBrandColor?: string
}

const integrations: Integration[] = [
  { id: "instagram", name: "Instagram", description: "IG Graph API - DMs, posts, comments", icon: Instagram, status: "connected", category: "social", brandColor: "#E4405F" },
  { id: "facebook", name: "Facebook", description: "Pages API - Posts, messages, insights", icon: Facebook, status: "connected", category: "social", brandColor: "#1877F2" },
  { id: "tiktok", name: "TikTok", description: "Content API - Videos, analytics", icon: Clapperboard, status: "connected", category: "social", brandColor: "#0a0a0a", darkBrandColor: "#ffffff" },
  { id: "vapi", name: "Vapi", description: "Voice AI platform for outbound calls", icon: PhoneCall, status: "connected", category: "voice", brandColor: "#0a0a0a", darkBrandColor: "#3b82f6" },
  { id: "elevenlabs", name: "ElevenLabs", description: "Text-to-speech voice synthesis", icon: AudioLines, status: "connected", category: "voice", brandColor: "#0a0a0a", darkBrandColor: "#8b5cf6" },
  { id: "deepgram", name: "Deepgram", description: "Speech-to-text recognition", icon: Mic, status: "connected", category: "voice", brandColor: "#10b981" },
  { id: "plivo", name: "Plivo", description: "SMS & Voice telephony API", icon: MessageSquare, status: "disconnected", category: "communication", brandColor: "#6366f1" },
  { id: "sendgrid", name: "SendGrid", description: "Email delivery & campaigns", icon: Mail, status: "disconnected", category: "communication", brandColor: "#0263e0" },
  { id: "supabase", name: "Supabase", description: "Database & real-time subscriptions", icon: Database, status: "connected", category: "data", brandColor: "#10b981" },
  { id: "vercel", name: "Vercel", description: "Hosting & edge functions", icon: Cloud, status: "connected", category: "data", brandColor: "#0a0a0a", darkBrandColor: "#ffffff" },
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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState("all")
  const [connectingId, setConnectingId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((integration, idx) => {
          const activeColor = isDark && integration.darkBrandColor ? integration.darkBrandColor : integration.brandColor;
          return (
          <Card 
            key={integration.id} 
            className="group flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-card-enter border border-border/60 bg-card/40 backdrop-blur-sm"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Background Gradient Effect on Hover */}
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none" 
              style={{ background: `linear-gradient(135deg, transparent, ${activeColor})` }}
            />
            
            <CardContent className="p-5 flex flex-col h-full z-10 relative">
              <div className="flex items-start justify-between">
                <div 
                  className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-background to-secondary/80 shadow-sm border border-border/50 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    boxShadow: `0 4px 12px -2px ${activeColor}20`,
                    borderColor: `${activeColor}30` 
                  }}
                >
                  <integration.icon className="size-5" style={{ color: activeColor }} />
                </div>
                {integration.status === "connected" && (
                  <div className="flex size-6 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="size-3.5 text-success" />
                  </div>
                )}
              </div>
              
              <div className="mt-4 mb-5 flex-1">
                <span className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                  {integration.name}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {integration.description}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
                {integration.status === "connected" ? (
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex size-2">
                       <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                       <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-success">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-muted-foreground/80">
                    <Unplug className="size-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Offline
                    </span>
                  </div>
                )}

                {integration.status === "connected" ? (
                  <Button variant="ghost" size="icon" className="size-7 rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground">
                    <ExternalLink className="size-3.5" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(integration.id)}
                    disabled={connectingId === integration.id}
                    className={cn(
                      "h-7 rounded-full px-3 text-[11px] font-semibold shadow-sm transition-all duration-300 hover:shadow-md",
                      activeColor === "#ffffff" ? "text-black" : "text-white"
                    )}
                    style={{ background: `linear-gradient(to right, ${activeColor}, ${activeColor}dd)` }}
                  >
                    {connectingId === integration.id ? "Connecting..." : "Enable"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  )
}
