"use client"

import { useState, useCallback } from "react"
import { SidebarNav, type ViewType } from "@/components/dashboard/sidebar-nav"
import { CommandBar } from "@/components/dashboard/command-bar"
import { OverviewView } from "@/components/dashboard/overview-view"
import { FlowsView, type Flow } from "@/components/dashboard/flows-view"
import { FlowDetailPanel } from "@/components/dashboard/flow-detail-panel"
import { IntegrationsView } from "@/components/dashboard/integrations-view"
import { InboxView } from "@/components/dashboard/inbox-view"
import { CallsView } from "@/components/dashboard/calls-view"
import { RulesView } from "@/components/dashboard/rules-view"
import { CredentialModal } from "@/components/dashboard/credential-modal"

import { Users, Phone, Zap, MessageSquare } from "lucide-react"

const viewTitles: Record<ViewType, string> = {
  overview: "Dashboard",
  flows: "Flow Builder",
  inbox: "Social Inbox",
  calls: "Call History",
  rules: "Post Rules",
  integrations: "Integrations",
}

const viewDescriptions: Record<ViewType, string> = {
  overview: "Monitor your active automations and event log",
  flows: "Build and manage your automation pipelines",
  inbox: "Unified comments, DMs, and AI-drafted replies",
  calls: "Inbound and outbound call logs with sentiment analysis",
  rules: "Schedule AI-generated posts and manage publishing rules",
  integrations: "Connect your tools and services",
}

// Credential step configs per service
const credentialConfigs: Record<
  string,
  { name: string; steps: { title: string; description: string; fields: { key: string; label: string; placeholder: string; type?: string }[] }[] }
> = {
  tiktok: {
    name: "TikTok",
    steps: [
      {
        title: "TikTok API Credentials",
        description: "Enter your TikTok for Business API credentials.",
        fields: [
          { key: "client_key", label: "Client Key", placeholder: "aw1234567890abcdef" },
          { key: "client_secret", label: "Client Secret", placeholder: "Enter your client secret", type: "password" },
        ],
      },
      {
        title: "OAuth Configuration",
        description: "Configure your redirect URI for the OAuth flow.",
        fields: [
          { key: "redirect_uri", label: "Redirect URI", placeholder: "https://yourapp.com/callback" },
        ],
      },
    ],
  },
  instagram: {
    name: "Instagram",
    steps: [
      {
        title: "Instagram Graph API",
        description: "Enter your Meta app credentials for the Instagram Graph API.",
        fields: [
          { key: "app_id", label: "App ID", placeholder: "123456789012345" },
          { key: "app_secret", label: "App Secret", placeholder: "Enter your app secret", type: "password" },
        ],
      },
      {
        title: "Access Token",
        description: "Provide your long-lived access token.",
        fields: [
          { key: "access_token", label: "Access Token", placeholder: "EAABsb...", type: "password" },
        ],
      },
    ],
  },
  vapi: {
    name: "Vapi",
    steps: [
      {
        title: "Vapi API Key",
        description: "Enter your Vapi API key to enable voice AI calls.",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "vapi_...", type: "password" },
        ],
      },
    ],
  },
  elevenlabs: {
    name: "ElevenLabs",
    steps: [
      {
        title: "ElevenLabs API Key",
        description: "Enter your ElevenLabs API key for text-to-speech.",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "sk_...", type: "password" },
        ],
      },
      {
        title: "Voice Configuration",
        description: "Set a default voice ID for your automations.",
        fields: [
          { key: "voice_id", label: "Default Voice ID", placeholder: "21m00Tcm4TlvDq8ikWAM" },
        ],
      },
    ],
  },
  deepgram: {
    name: "Deepgram",
    steps: [
      {
        title: "Deepgram API Key",
        description: "Enter your Deepgram API key for speech-to-text.",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "dg_...", type: "password" },
        ],
      },
    ],
  },
  plivo: {
    name: "Plivo",
    steps: [
      {
        title: "Plivo Credentials",
        description: "Enter your Plivo Auth ID and Auth Token.",
        fields: [
          { key: "auth_id", label: "Auth ID", placeholder: "MAXXXXXXXXXXXXXXXXXX" },
          { key: "auth_token", label: "Auth Token", placeholder: "Enter your auth token", type: "password" },
        ],
      },
    ],
  },
  facebook: {
    name: "Facebook",
    steps: [
      {
        title: "Facebook Pages API",
        description: "Enter your Meta app credentials.",
        fields: [
          { key: "app_id", label: "App ID", placeholder: "123456789012345" },
          { key: "page_token", label: "Page Access Token", placeholder: "EAABsb...", type: "password" },
        ],
      },
    ],
  },
  sendgrid: {
    name: "SendGrid",
    steps: [
      {
        title: "SendGrid API Key",
        description: "Enter your SendGrid API key for email delivery.",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "SG....", type: "password" },
        ],
      },
    ],
  },
}

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewType>("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null)

  // Credential modal state
  const [credModalOpen, setCredModalOpen] = useState(false)
  const [credService, setCredService] = useState<string>("")

  const openCredentialModal = (serviceId: string) => {
    setCredService(serviceId)
    setCredModalOpen(true)
  }

  const handleCommand = useCallback(
    (command: string) => {
      const lower = command.toLowerCase()

      // Check for service connection keywords
      const serviceKeywords: Record<string, string> = {
        tiktok: "tiktok",
        instagram: "instagram",
        facebook: "facebook",
        vapi: "vapi",
        elevenlabs: "elevenlabs",
        deepgram: "deepgram",
        plivo: "plivo",
        sendgrid: "sendgrid",
      }

      for (const [key, keyword] of Object.entries(serviceKeywords)) {
        if (lower.includes(keyword) && (lower.includes("connect") || lower.includes("setup") || lower.includes("configure"))) {
          openCredentialModal(key)
          return
        }
      }

      // Route to flows if describing an automation
      if (lower.includes("flow") || lower.includes("automate") || lower.includes("when") || lower.includes("trigger")) {
        setActiveView("flows")
        return
      }

      // Route to inbox for social messages
      if (lower.includes("dm") || lower.includes("reply") || lower.includes("inbox") || lower.includes("message") || lower.includes("comment")) {
        setActiveView("inbox")
        return
      }

      // Route to calls for voice-related queries
      if (lower.includes("call") || lower.includes("voice") || lower.includes("phone") || lower.includes("dial")) {
        setActiveView("calls")
        return
      }

      // Route to rules for post-related queries
      if (lower.includes("post") || lower.includes("schedule") || lower.includes("rule") || lower.includes("publish")) {
        setActiveView("rules")
        return
      }

      // Default: route to integrations for connect-like queries
      if (lower.includes("connect") || lower.includes("integrate") || lower.includes("api")) {
        setActiveView("integrations")
        return
      }

      // Fallback: stay on current view
      setActiveView("overview")
    },
    []
  )

  const currentCredConfig = credentialConfigs[credService]

  return (
    <div className="flex h-screen overflow-hidden bg-background" suppressHydrationWarning>
      <SidebarNav
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view)
          setSelectedFlow(null)
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex shrink-0 flex-col border-b border-border bg-card">
            <div className="flex items-center justify-between px-6 py-3">
              <div>
                <h1 className="text-sm font-semibold text-foreground">
                  {viewTitles[activeView]}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {viewDescriptions[activeView]}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                <span className="text-xs text-muted-foreground">
                  Systems Online
                </span>
              </div>
            </div>
            {/* KPI Strip */}
            <div className="flex items-center gap-6 border-t border-border px-6 py-2">
              <KpiPill icon={Users} label="Leads" value="1,245" />
              <KpiPill icon={Phone} label="Calls (24h)" value="34" />
              <KpiPill icon={MessageSquare} label="Messages" value="312" />
              <KpiPill icon={Zap} label="AI Actions" value="2,847" />
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6 p-6">
              <CommandBar onCommand={handleCommand} />

              {activeView === "overview" && (
                <OverviewView onNavigateToFlows={() => setActiveView("flows")} />
              )}
              {activeView === "flows" && (
                <FlowsView
                  onSelectFlow={(flow) => setSelectedFlow(flow)}
                  selectedFlowId={selectedFlow?.id}
                />
              )}
              {activeView === "inbox" && <InboxView />}
              {activeView === "calls" && <CallsView />}
              {activeView === "rules" && <RulesView />}
              {activeView === "integrations" && (
                <IntegrationsView onConnect={openCredentialModal} />
              )}
            </div>
          </div>
        </main>

        {/* Flow Detail Slide-in Panel */}
        {selectedFlow && activeView === "flows" && (
          <FlowDetailPanel
            flow={selectedFlow}
            onClose={() => setSelectedFlow(null)}
          />
        )}
      </div>

      {/* Credential Configuration Modal */}
      {currentCredConfig && (
        <CredentialModal
          open={credModalOpen}
          onOpenChange={setCredModalOpen}
          serviceName={currentCredConfig.name}
          steps={currentCredConfig.steps}
          onComplete={() => {
            setCredModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

function KpiPill({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground">{value}</span>
    </div>
  )
}
