"use client"

import { useState, useCallback, useEffect } from "react"
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
import { AgentsView } from "@/components/dashboard/agents-view"
import { KnowledgeBaseView } from "@/components/dashboard/knowledge-base-view"
import { PhoneNumbersView } from "@/components/dashboard/phone-numbers-view"
import { BatchCallView } from "@/components/dashboard/batch-call-view"
import { CampaignsView } from "@/components/dashboard/campaigns-view"

import {
  Users,
  Phone,
  Zap,
  MessageSquare,
  Menu,
  Bell,
  Search,
  GitBranch,
  Inbox,
  FileText,
  Puzzle,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Activity,
  Bot,
  BookOpen,
  PhoneCall,
  RadioTower,
  Megaphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const viewTitles: Record<ViewType, string> = {
  overview: "Dashboard",
  flows: "Flow Builder",
  inbox: "Social Inbox",
  calls: "Call History",
  rules: "Post Rules",
  integrations: "Integrations",
  agents: "Agents",
  "knowledge-base": "Knowledge Base",
  "phone-numbers": "Phone Numbers",
  "batch-call": "Batch Call",
  campaigns: "Campaigns",
}

const viewDescriptions: Record<ViewType, string> = {
  overview: "Monitor active automations and real-time event log",
  flows: "Build and manage your automation pipelines",
  inbox: "Unified comments, DMs, and AI-drafted replies",
  calls: "Inbound & outbound call logs with sentiment analysis",
  rules: "Schedule AI-generated posts and manage publishing rules",
  integrations: "Connect your tools and services",
  agents: "Create and manage AI voice assistants",
  "knowledge-base": "Documents used by AI agents during calls",
  "phone-numbers": "Numbers used by AI agents to make and receive calls",
  "batch-call": "Launch outbound AI calling campaigns at scale",
  campaigns: "Track AI call campaign performance and metrics",
}

const viewIcons: Record<ViewType, React.ElementType> = {
  overview: LayoutDashboard,
  flows: GitBranch,
  inbox: Inbox,
  calls: Phone,
  rules: FileText,
  integrations: Puzzle,
  agents: Bot,
  "knowledge-base": BookOpen,
  "phone-numbers": PhoneCall,
  "batch-call": RadioTower,
  campaigns: Megaphone,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [viewKey, setViewKey] = useState(0) // for re-triggering animations

  // Credential modal state
  const [credModalOpen, setCredModalOpen] = useState(false)
  const [credService, setCredService] = useState<string>("")
  
  const openCredentialModal = (serviceId: string) => {
    setCredService(serviceId)
    setCredModalOpen(true)
  }

  const changeView = (view: ViewType) => {
    setActiveView(view)
    setSelectedFlow(null)
    setViewKey((k) => k + 1) // trigger animation
  }

  const handleCommand = useCallback(
    (command: string) => {
      const lower = command.toLowerCase()

      const serviceKeywords: Record<string, string> = {
        tiktok: "tiktok", instagram: "instagram", facebook: "facebook",
        vapi: "vapi", elevenlabs: "elevenlabs", deepgram: "deepgram",
        plivo: "plivo", sendgrid: "sendgrid",
      }

      for (const [key, keyword] of Object.entries(serviceKeywords)) {
        if (lower.includes(keyword) && (lower.includes("connect") || lower.includes("setup") || lower.includes("configure"))) {
          openCredentialModal(key)
          return
        }
      }

      if (lower.includes("flow") || lower.includes("automate") || lower.includes("when") || lower.includes("trigger")) {
        changeView("flows"); return
      }
      if (lower.includes("dm") || lower.includes("reply") || lower.includes("inbox") || lower.includes("message") || lower.includes("comment")) {
        changeView("inbox"); return
      }
      if (lower.includes("call") || lower.includes("voice") || lower.includes("phone") || lower.includes("dial")) {
        changeView("calls"); return
      }
      if (lower.includes("post") || lower.includes("schedule") || lower.includes("rule") || lower.includes("publish")) {
        changeView("rules"); return
      }
      if (lower.includes("connect") || lower.includes("integrate") || lower.includes("api")) {
        changeView("integrations"); return
      }
      if (lower.includes("agent") || lower.includes("bot") || lower.includes("assistant")) {
        changeView("agents"); return
      }
      if (lower.includes("knowledge") || lower.includes("document") || lower.includes("upload") || lower.includes("pdf")) {
        changeView("knowledge-base"); return
      }
      if (lower.includes("phone") || lower.includes("number") || lower.includes("twilio") || lower.includes("plivo")) {
        changeView("phone-numbers"); return
      }
      if (lower.includes("batch") || lower.includes("outbound") || lower.includes("blast")) {
        changeView("batch-call"); return
      }
      if (lower.includes("campaign") || lower.includes("analytics") || lower.includes("stats") || lower.includes("performance")) {
        changeView("campaigns"); return
      }
      changeView("overview")
    },
    []
  )

  const CurrentViewIcon = viewIcons[activeView]
  const currentCredConfig = credentialConfigs[credService]

  return (
    <div className="flex h-screen overflow-hidden bg-background" suppressHydrationWarning>
      <SidebarNav
        activeView={activeView}
        onViewChange={changeView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-card/80 px-3 py-2.5 backdrop-blur-sm md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-foreground shadow-sm">
                <Zap className="size-3.5 text-background" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">DeadAssLead</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent">
                <Bell className="size-4" />
              </button>
              <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                <span className="text-[10px] font-medium text-success">Live</span>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <header className="hidden shrink-0 flex-col border-b border-border/60 bg-card/80 backdrop-blur-sm md:flex">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-accent/80">
                  <CurrentViewIcon className="size-4 text-foreground" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-foreground">
                    {viewTitles[activeView]}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {viewDescriptions[activeView]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Search className="size-4" />
                </button>
                <button className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Bell className="size-4" />
                  <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-white">3</span>
                </button>
                <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  <span className="text-xs font-medium text-success">Systems Online</span>
                </div>
              </div>
            </div>
            {/* KPI Strip - Desktop */}
            <div className="flex items-center gap-6 border-t border-border/40 px-6 py-2">
              <KpiPill icon={Users} label="Leads" value="1,245" trend="+12%" positive />
              <KpiPill icon={Phone} label="Calls (24h)" value="34" trend="+8%" positive />
              <KpiPill icon={MessageSquare} label="Messages" value="312" trend="+23%" positive />
              <KpiPill icon={Zap} label="AI Actions" value="2,847" trend="+5%" positive />
              <KpiPill icon={Activity} label="Uptime" value="99.9%" />
            </div>
          </header>

          {/* Mobile Page Title + KPI Row */}
          <div className="flex flex-col border-b border-border/60 bg-card/50 md:hidden">
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-accent/80">
                <CurrentViewIcon className="size-3.5 text-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground">
                  {viewTitles[activeView]}
                </h1>
                <p className="text-[11px] text-muted-foreground">
                  {viewDescriptions[activeView]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto border-t border-border/40 px-3 py-2 no-scrollbar">
              <KpiPill icon={Users} label="Leads" value="1,245" />
              <KpiPill icon={Phone} label="Calls" value="34" />
              <KpiPill icon={MessageSquare} label="Msgs" value="312" />
              <KpiPill icon={Zap} label="AI" value="2,847" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6">
              <CommandBar onCommand={handleCommand} />

              {/* Quick Navigation Cards (visible on overview) */}
              {activeView === "overview" && (
                <QuickNavGrid onNavigate={changeView} />
              )}

              {/* Animated View Container */}
              <div key={viewKey} className="animate-view-in">
                {activeView === "overview" && (
                  <OverviewView onNavigateToFlows={() => changeView("flows")} />
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
                {activeView === "agents" && <AgentsView />}
                {activeView === "knowledge-base" && <KnowledgeBaseView />}
                {activeView === "phone-numbers" && <PhoneNumbersView />}
                {activeView === "batch-call" && <BatchCallView />}
                {activeView === "campaigns" && <CampaignsView />}
                {activeView === "integrations" && (
                  <IntegrationsView onConnect={openCredentialModal} />
                )}
              </div>
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

/* ---------- Sub-Components ---------- */

function KpiPill({
  icon: Icon,
  label,
  value,
  trend,
  positive,
}: {
  icon: React.ElementType
  label: string
  value: string
  trend?: string
  positive?: boolean
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <Icon className="size-3 text-muted-foreground sm:size-3.5" />
      <span className="whitespace-nowrap text-[10px] text-muted-foreground sm:text-xs">{label}</span>
      <span className="whitespace-nowrap text-[10px] font-semibold text-foreground sm:text-xs">{value}</span>
      {trend && (
        <span className={cn(
          "hidden items-center gap-0.5 text-[9px] font-medium sm:flex",
          positive ? "text-success" : "text-destructive"
        )}>
          <TrendingUp className="size-2.5" />
          {trend}
        </span>
      )}
    </div>
  )
}

function QuickNavGrid({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const cards: { view: ViewType; icon: React.ElementType; label: string; desc: string; accent: string; count?: string }[] = [
    { view: "flows", icon: GitBranch, label: "Flow Builder", desc: "4 active flows", accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20 hover:border-violet-500/40", count: "4" },
    { view: "inbox", icon: Inbox, label: "Social Inbox", desc: "3 pending replies", accent: "from-blue-500/10 to-cyan-500/5 border-blue-500/20 hover:border-blue-500/40", count: "3" },
    { view: "calls", icon: Phone, label: "Call History", desc: "5 interested leads", accent: "from-emerald-500/10 to-green-500/5 border-emerald-500/20 hover:border-emerald-500/40", count: "5" },
    { view: "agents", icon: Bot, label: "Agents", desc: "4 AI agents", accent: "from-cyan-500/10 to-teal-500/5 border-cyan-500/20 hover:border-cyan-500/40", count: "4" },
    { view: "knowledge-base", icon: BookOpen, label: "Knowledge Base", desc: "4 documents", accent: "from-indigo-500/10 to-blue-500/5 border-indigo-500/20 hover:border-indigo-500/40", count: "4" },
    { view: "phone-numbers", icon: PhoneCall, label: "Phone Numbers", desc: "4 numbers", accent: "from-lime-500/10 to-green-500/5 border-lime-500/20 hover:border-lime-500/40", count: "4" },
    { view: "batch-call", icon: RadioTower, label: "Batch Call", desc: "2 active", accent: "from-orange-500/10 to-red-500/5 border-orange-500/20 hover:border-orange-500/40", count: "2" },
    { view: "campaigns", icon: Megaphone, label: "Campaigns", desc: "1,037 calls", accent: "from-fuchsia-500/10 to-pink-500/5 border-fuchsia-500/20 hover:border-fuchsia-500/40", count: "4" },
    { view: "rules", icon: FileText, label: "Post Rules", desc: "3 active rules", accent: "from-amber-500/10 to-orange-500/5 border-amber-500/20 hover:border-amber-500/40", count: "3" },
    { view: "integrations", icon: Puzzle, label: "Integrations", desc: "8 connected", accent: "from-pink-500/10 to-rose-500/5 border-pink-500/20 hover:border-pink-500/40", count: "8" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 sm:gap-3">
      {cards.map((card, idx) => (
        <button
         
          key={card.view}
          onClick={() => onNavigate(card.view)}
          className={cn(
            "group relative flex flex-col gap-2 overflow-hidden rounded-xl border bg-gradient-to-br p-3 text-left transition-all duration-300 hover:shadow-md sm:p-4",
            card.accent,
            "animate-card-enter"
          )}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <div className="flex items-center justify-between">
            <card.icon className="size-5 text-foreground/70 transition-transform duration-300 group-hover:scale-110 sm:size-6" />
            {card.count && (
              <span className="flex size-5 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold text-foreground sm:size-6 sm:text-xs">
                {card.count}
              </span>
            )}
          </div>
          <div>
            <span className="text-xs font-semibold text-foreground sm:text-sm">{card.label}</span>
            <p className="text-[10px] text-muted-foreground sm:text-xs">{card.desc}</p>
          </div>
          <ArrowRight className="absolute bottom-3 right-3 size-3.5 text-muted-foreground/0 transition-all duration-300 group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 sm:size-4" />
        </button>
      ))}
    </div>
  )
}
