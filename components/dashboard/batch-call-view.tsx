"use client"

import { useState, useRef } from "react"
import {
  RadioTower, Plus, Search, Upload, X, ChevronDown, Play, Pause,
  Users, CheckCircle, XCircle, Clock, ArrowLeft, Download, RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

const campaigns = [
  {
    id: "1", name: "Q1 Re-engagement", contacts: 450, completed: 412, successRate: "34%",
    status: "completed", startTime: "Mar 10, 2026 09:00",
  },
  {
    id: "2", name: "New Leads March", contacts: 280, completed: 195, successRate: "41%",
    status: "running", startTime: "Mar 15, 2026 10:00",
  },
  {
    id: "3", name: "Cold Outreach Batch 7", contacts: 120, completed: 0, successRate: "—",
    status: "scheduled", startTime: "Mar 17, 2026 09:00",
  },
  {
    id: "4", name: "Re-activation Wave 2", contacts: 600, completed: 0, successRate: "—",
    status: "draft", startTime: "—",
  },
]

const statusConfig = {
  running: { label: "Running", color: "text-blue-600 bg-blue-500/10 border-blue-500/20", icon: Play },
  completed: { label: "Completed", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle },
  scheduled: { label: "Scheduled", color: "text-amber-600 bg-amber-500/10 border-amber-500/20", icon: Clock },
  draft: { label: "Draft", color: "text-muted-foreground bg-muted border-border", icon: Pause },
}

export function BatchCallView() {
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)
  const csvRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: "", agent: "", script: "", retries: "2", delay: "60", schedule: ""
  })

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId)

  if (selectedCampaign) {
    return (
      <div className="space-y-6 animate-view-in">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-border pb-4">
          <button 
            onClick={() => setSelectedCampaignId(null)} 
            className="p-2 border border-border bg-card rounded-md hover:bg-accent text-muted-foreground self-start transition-colors"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-foreground">{selectedCampaign.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Campaign Details
              <span>•</span>
              Started: {selectedCampaign.startTime}
            </p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent transition-colors">
              <Download className="size-4" /> Export
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90 transition-all active:scale-[0.97]">
              {selectedCampaign.status === "completed" ? <RefreshCw className="size-4" /> : <Play className="size-4" />}
              {selectedCampaign.status === "completed" ? "Restart" : "Resume"}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-border rounded-xl bg-card shadow-sm group hover:border-blue-500/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500" />
              Progress
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{selectedCampaign.completed}</p>
              <span className="text-sm text-muted-foreground">/ {selectedCampaign.contacts}</span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-border overflow-hidden">
               <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(selectedCampaign.completed / Math.max(1, selectedCampaign.contacts)) * 100}%` }} />
            </div>
          </div>
          <div className="p-5 border border-border rounded-xl bg-card shadow-sm group hover:border-emerald-500/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="size-4 text-violet-500" />
              Success Rate
            </p>
            <p className="text-3xl font-bold mt-3 text-emerald-600 dark:text-emerald-400">{selectedCampaign.successRate}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Goal converted</p>
          </div>
          <div className="p-5 border border-border rounded-xl bg-card shadow-sm group hover:border-amber-500/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <RadioTower className="size-4 text-amber-500" />
              Status
            </p>
            <p className="text-3xl font-bold mt-3 capitalize text-foreground">{selectedCampaign.status}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Current state</p>
          </div>
        </div>
        
        <div className="border border-border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="px-5 py-4 border-b border-border bg-muted/40 flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">Detailed Call Log</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold bg-background border border-border rounded-md shadow-sm hover:bg-accent transition-colors">Filter</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
             <div className="size-16 rounded-full bg-accent/50 flex items-center justify-center mb-4 border border-border">
               <RadioTower className="size-8 opacity-40 text-foreground" />
             </div>
             <p className="text-sm font-bold text-foreground">No call logs generated yet</p>
             <p className="text-xs max-w-sm mt-1">Detailed, step-by-step logs of every user dialed in this campaign will be tabulated here as they are processed.</p>
          </div>
        </div>
      </div>
    )
  }

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5 animate-view-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Batch Call</h2>
          <p className="text-sm text-muted-foreground">Launch outbound AI calling campaigns at scale</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 active:scale-[0.97]"
        >
          <Plus className="size-4" />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Campaigns", value: campaigns.length.toString(), icon: RadioTower, accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20" },
          { label: "Total Contacts", value: campaigns.reduce((a, c) => a + c.contacts, 0).toLocaleString(), icon: Users, accent: "from-blue-500/10 to-cyan-500/5 border-blue-500/20" },
          { label: "Calls Completed", value: campaigns.reduce((a, c) => a + c.completed, 0).toLocaleString(), icon: CheckCircle, accent: "from-emerald-500/10 to-green-500/5 border-emerald-500/20" },
          { label: "Active Now", value: campaigns.filter(c => c.status === "running").length.toString(), icon: Play, accent: "from-amber-500/10 to-orange-500/5 border-amber-500/20" },
        ].map(stat => (
          <div key={stat.label} className={cn("rounded-xl border bg-gradient-to-br p-4 animate-card-enter", stat.accent)}>
            <stat.icon className="size-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..."
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Campaign Name", "Contacts", "Completed", "Success Rate", "Status", "Start Time", "Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c, i) => {
                const st = statusConfig[c.status as keyof typeof statusConfig]
                const pct = c.contacts > 0 ? Math.round((c.completed / c.contacts) * 100) : 0
                return (
                  <tr 
                    key={c.id} 
                    className="group hover:bg-muted/30 transition-colors animate-card-enter cursor-pointer" 
                    style={{ animationDelay: `${i * 50}ms` }}
                    onClick={() => setSelectedCampaignId(c.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-foreground/5 border border-border">
                          <RadioTower className="size-4 text-foreground/70" />
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:underline decoration-foreground/30 underline-offset-4">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.contacts.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground">{c.completed.toLocaleString()}</span>
                        {c.contacts > 0 && (
                          <div className="h-1.5 w-24 rounded-full bg-border overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{c.successRate}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", st.color)}>
                        <st.icon className="size-3" />{st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.startTime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {c.status === "running" && (
                          <button onClick={(e) => e.stopPropagation()} className="rounded-md p-1.5 text-amber-600 hover:bg-amber-500/10 transition-colors" title="Pause"><Pause className="size-3.5" /></button>
                        )}
                        {c.status !== "running" && c.status !== "completed" && (
                          <button onClick={(e) => e.stopPropagation()} className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-500/10 transition-colors" title="Start"><Play className="size-3.5" /></button>
                        )}
                        <button onClick={(e) => e.stopPropagation()} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete"><XCircle className="size-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Create Campaign</h3>
                <p className="text-xs text-muted-foreground">Configure a new batch calling campaign</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Campaign Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Q2 Re-engagement" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Upload Contacts (CSV)</label>
                <div onClick={() => csvRef.current?.click()} className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-6 hover:border-foreground/20 hover:bg-muted/20 transition-all">
                  <Upload className="size-8 mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Click to upload CSV</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">Columns: name, phone, email</p>
                  <input ref={csvRef} type="file" accept=".csv" className="hidden" />
                </div>
              </div>
              {[
                { label: "Select Agent", key: "agent", type: "select", options: ["SalesBot Alpha", "LeadQual Pro", "Appointment Setter"] },
                { label: "Retry Attempts", key: "retries", type: "select", options: ["0", "1", "2", "3"] },
                { label: "Call Delay (seconds)", key: "delay", type: "select", options: ["30", "60", "120", "300"] },
              ].map(sel => (
                <div key={sel.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{sel.label}</label>
                  <div className="relative">
                    <select value={form[sel.key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [sel.key]: e.target.value }))} className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none pr-8 transition-all">
                      {sel.type === "select" && <option value="">Select...</option>}
                      {sel.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Call Script</label>
                <textarea rows={4} value={form.script} onChange={e => setForm(f => ({ ...f, script: e.target.value }))} placeholder="Hi {name}, I'm calling from DeadAssLead..." className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Schedule Start Time</label>
                <input type="datetime-local" value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/30 transition-all" />
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              <button onClick={() => setDrawerOpen(false)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all active:scale-[0.97]">
                <RadioTower className="size-4" /> Launch Campaign
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
