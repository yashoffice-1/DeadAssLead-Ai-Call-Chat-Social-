"use client"

import { useState } from "react"
import { Megaphone, Phone, CheckCircle, XCircle, TrendingUp, BarChart2, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple bar + line chart using SVG (no recharts dependency needed)
const dailyData = [
  { day: "Mon", calls: 48, connected: 31 },
  { day: "Tue", calls: 72, connected: 54 },
  { day: "Wed", calls: 65, connected: 40 },
  { day: "Thu", calls: 91, connected: 67 },
  { day: "Fri", calls: 84, connected: 58 },
  { day: "Sat", calls: 30, connected: 18 },
  { day: "Sun", calls: 22, connected: 12 },
]

const agentPerformance = [
  { name: "SalesBot Alpha", calls: 412, rate: 38, color: "bg-violet-500" },
  { name: "LeadQual Pro", calls: 287, rate: 44, color: "bg-blue-500" },
  { name: "Apt. Setter", calls: 195, rate: 29, color: "bg-emerald-500" },
  { name: "Follow-Up", calls: 143, rate: 22, color: "bg-amber-500" },
]

const outcomes = [
  { label: "Qualified Lead", value: 34, color: "bg-emerald-500" },
  { label: "Callback Scheduled", value: 22, color: "bg-blue-500" },
  { label: "Not Interested", value: 28, color: "bg-rose-500" },
  { label: "No Answer", value: 16, color: "bg-amber-500" },
]

function BarChart({ data }: { data: typeof dailyData }) {
  const max = Math.max(...data.map(d => d.calls))
  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {data.map(d => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex flex-col items-center gap-0.5 w-full" style={{ height: "100%" }}>
            <div className="w-full flex flex-col justify-end h-full gap-0.5">
              <div
                className="w-full rounded-t-sm bg-foreground/20 transition-all hover:bg-foreground/30"
                style={{ height: `${(d.calls / max) * 100}%` }}
                title={`${d.calls} calls`}
              />
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">{d.day}</span>
        </div>
      ))}
    </div>
  )
}

export function CampaignsView() {
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "outcomes">("overview")

  const stats = [
    { label: "Total Calls", value: "1,037", change: "+18%", positive: true, icon: Phone, accent: "from-blue-500/10 to-cyan-500/5 border-blue-500/20" },
    { label: "Connected Calls", value: "680", change: "+22%", positive: true, icon: CheckCircle, accent: "from-emerald-500/10 to-green-500/5 border-emerald-500/20" },
    { label: "Failed Calls", value: "357", change: "-8%", positive: false, icon: XCircle, accent: "from-rose-500/10 to-red-500/5 border-rose-500/20" },
    { label: "Conversion Rate", value: "34%", change: "+5%", positive: true, icon: TrendingUp, accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20" },
  ]

  return (
    <div className="space-y-5 animate-view-in">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Campaigns</h2>
        <p className="text-sm text-muted-foreground">Track AI call campaign performance and metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={cn("rounded-xl border bg-gradient-to-br p-4 animate-card-enter", stat.accent)} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="size-4 text-muted-foreground" />
              <span className={cn("text-[10px] font-semibold", stat.positive ? "text-emerald-600" : "text-rose-500")}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted/50 border border-border w-fit">
        {[
          { id: "overview" as const, label: "Daily Calls", icon: BarChart2 },
          { id: "agents" as const, label: "Agent Performance", icon: Activity },
          { id: "outcomes" as const, label: "Call Outcomes", icon: Megaphone },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="size-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="rounded-xl border border-border bg-card p-5 animate-view-in">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">Daily Calls This Week</h3>
            <span className="text-xs text-muted-foreground">Total: {dailyData.reduce((a, d) => a + d.calls, 0)}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Total outbound calls per day</p>
          <BarChart data={dailyData} />
          <div className="mt-4 grid grid-cols-7 gap-2">
            {dailyData.map(d => (
              <div key={d.day} className="text-center">
                <p className="text-xs font-semibold text-foreground">{d.calls}</p>
                <p className="text-[10px] text-emerald-500">{d.connected}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-foreground/20" /><span className="text-xs text-muted-foreground">Total Calls</span></div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-xs text-muted-foreground">Connected</span></div>
          </div>
        </div>
      )}

      {activeTab === "agents" && (
        <div className="rounded-xl border border-border bg-card p-5 animate-view-in space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Agent Performance</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Call volume and success rate by agent</p>
          </div>
          {agentPerformance.map((agent, i) => (
            <div key={agent.name} className="space-y-1.5 animate-card-enter" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{agent.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{agent.calls} calls</span>
                  <span className="text-xs font-semibold text-foreground">{agent.rate}%</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", agent.color)} style={{ width: `${agent.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "outcomes" && (
        <div className="rounded-xl border border-border bg-card p-5 animate-view-in">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Call Outcomes Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">How calls ended across all campaigns</p>
          </div>
          <div className="space-y-3">
            {outcomes.map((o, i) => (
              <div key={o.label} className="space-y-1.5 animate-card-enter" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", o.color)} />
                    <span className="text-sm text-foreground">{o.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{o.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", o.color)} style={{ width: `${o.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {outcomes.map(o => (
              <div key={o.label} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <div className={cn("mx-auto mb-1.5 h-2.5 w-2.5 rounded-full", o.color)} />
                <p className="text-lg font-bold text-foreground">{o.value}%</p>
                <p className="text-[10px] text-muted-foreground">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
