"use client"

import { useState } from "react"
import { PhoneCall, Plus, Search, Trash2, Edit, X, ChevronDown, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const phoneNumbers = [
  {
    id: "1", number: "+1 (415) 555-0182", provider: "Twilio",
    agent: "SalesBot Alpha", country: "USA", status: "active", created: "Mar 10, 2026",
  },
  {
    id: "2", number: "+1 (628) 555-0147", provider: "Plivo",
    agent: "LeadQual Pro", country: "USA", status: "active", created: "Mar 11, 2026",
  },
  {
    id: "3", number: "+44 20 7946 0301", provider: "Vonage",
    agent: "—", country: "UK", status: "idle", created: "Mar 13, 2026",
  },
  {
    id: "4", number: "+1 (213) 555-0198", provider: "Retell",
    agent: "Appointment Setter", country: "USA", status: "active", created: "Mar 15, 2026",
  },
]

const providers = [
  { name: "Twilio", logo: "TW", color: "from-red-500/10 to-rose-500/5 border-red-500/20 text-red-600" },
  { name: "Plivo", logo: "PL", color: "from-green-500/10 to-emerald-500/5 border-green-500/20 text-emerald-600" },
  { name: "Retell", logo: "RE", color: "from-blue-500/10 to-cyan-500/5 border-blue-500/20 text-blue-600" },
  { name: "Vonage", logo: "VO", color: "from-indigo-500/10 to-violet-500/5 border-indigo-500/20 text-indigo-600" },
]

const statusConfig = {
  active: { label: "Active", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  idle: { label: "Idle", color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
}

export function PhoneNumbersView() {
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("Twilio")
  const [form, setForm] = useState({ accountSid: "", authToken: "", phoneNumber: "", friendlyName: "", agent: "" })

  const filtered = phoneNumbers.filter(p =>
    p.number.includes(search) || p.provider.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 animate-view-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Phone Numbers</h2>
          <p className="text-sm text-muted-foreground">Numbers used by AI agents to make and receive calls</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 active:scale-[0.97]"
        >
          <Plus className="size-4" />
          Add Phone Number
        </button>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {providers.map((p, i) => (
          <div key={p.name} className={cn("rounded-xl border bg-gradient-to-br p-4 animate-card-enter cursor-pointer hover:shadow-md transition-all", p.color)} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/50 dark:bg-black/20 font-bold text-sm">
                {p.logo}
              </div>
              <CheckCircle className="size-4 opacity-60" />
            </div>
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="text-xs opacity-70 mt-0.5">
              {phoneNumbers.filter(n => n.provider === p.name).length} number(s)
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search numbers..."
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Phone Number", "Provider", "Assigned Agent", "Country", "Status", "Created", "Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((num, i) => {
                const st = statusConfig[num.status as keyof typeof statusConfig]
                return (
                  <tr key={num.id} className="group hover:bg-muted/30 transition-colors animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-foreground/5">
                          <PhoneCall className="size-4 text-foreground/70" />
                        </div>
                        <span className="text-sm font-medium text-foreground font-mono">{num.number}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{num.provider}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{num.agent}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{num.country}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", st.color)}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{num.created}</td>
                    <td className="px-4 py-3 flex items-center gap-1">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"><Edit className="size-3.5" /></button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="size-3.5" /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Number Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Add Phone Number</h3>
                <p className="text-xs text-muted-foreground">Connect a telephony provider</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">Provider</label>
                <div className="grid grid-cols-2 gap-2">
                  {providers.map(p => (
                    <button
                      key={p.name}
                      onClick={() => setSelectedProvider(p.name)}
                      className={cn("flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all", selectedProvider === p.name ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/30")}
                    >
                      <span className="font-bold text-xs">{p.logo}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: "Account SID / Auth ID", key: "accountSid", placeholder: "ACxxxxxxxxxx" },
                { label: "Auth Token", key: "authToken", placeholder: "••••••••••", type: "password" },
                { label: "Phone Number", key: "phoneNumber", placeholder: "+1 (555) 000-0000" },
                { label: "Friendly Name", key: "friendlyName", placeholder: "My Sales Number" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Assign to Agent</label>
                <div className="relative">
                  <select value={form.agent} onChange={e => setForm(f => ({ ...f, agent: e.target.value }))} className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none pr-8 transition-all">
                    <option value="">Select agent (optional)</option>
                    <option>SalesBot Alpha</option>
                    <option>LeadQual Pro</option>
                    <option>Appointment Setter</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              <button onClick={() => setDrawerOpen(false)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all active:scale-[0.97]">
                <PhoneCall className="size-4" /> Add Number
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
