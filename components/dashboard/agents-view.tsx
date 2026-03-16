"use client"

import { useState } from "react"
import {
  Bot, Plus, Search, MoreHorizontal, Edit, Copy, Trash2,
  Rocket, X, ChevronDown, CheckCircle, Circle, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialAgents = [
  {
    id: "1", name: "SalesBot Alpha", voiceProvider: "ElevenLabs", model: "GPT-4o",
    language: "English", status: "active", created: "Mar 10, 2026", phoneNumber: "+1 (415) 555-0182"
  },
  {
    id: "2", name: "LeadQual Pro", voiceProvider: "Vapi", model: "Claude 3.5",
    language: "English", status: "active", created: "Mar 12, 2026", phoneNumber: "+1 (628) 555-0147"
  },
  {
    id: "3", name: "Appointment Setter", voiceProvider: "Deepgram", model: "GPT-4o-mini",
    language: "Spanish", status: "draft", created: "Mar 14, 2026", phoneNumber: "+1 (213) 555-0198"
  },
  {
    id: "4", name: "Follow-Up Agent", voiceProvider: "ElevenLabs", model: "GPT-4o",
    language: "English", status: "inactive", created: "Mar 15, 2026", phoneNumber: "—"
  },
]

const statusConfig = {
  active: { label: "Active", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  draft: { label: "Draft", color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  inactive: { label: "Inactive", color: "text-muted-foreground bg-muted border-border" },
}

export function AgentsView() {
  const [agentsList, setAgentsList] = useState(initialAgents)
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "", voiceProvider: "ElevenLabs", model: "GPT-4o",
    language: "English", prompt: "", knowledgeBase: "",
    voiceStyle: "Professional", responseStyle: "Concise", fallback: "Transfer to human",
  })

  // Handlers for action buttons
  const deleteAgent = (id: string) => setAgentsList(prev => prev.filter(a => a.id !== id))
  
  const duplicateAgent = (agent: typeof initialAgents[0]) => {
    const newAgent = { ...agent, id: Date.now().toString(), name: `${agent.name} (Copy)`, status: "draft" }
    setAgentsList(prev => [...prev, newAgent])
  }

  const deployAgent = (id: string) => {
    setAgentsList(prev => prev.map(a => a.id === id ? { ...a, status: "active" } : a))
  }

  const openDrawerForCreate = () => {
    setEditingId(null)
    setForm({
      name: "", voiceProvider: "ElevenLabs", model: "GPT-4o",
      language: "English", prompt: "", knowledgeBase: "",
      voiceStyle: "Professional", responseStyle: "Concise", fallback: "Transfer to human",
    })
    setDrawerOpen(true)
  }

  const openDrawerForEdit = (agent: typeof initialAgents[0]) => {
    setEditingId(agent.id)
    setForm(prev => ({ ...prev, name: agent.name, voiceProvider: agent.voiceProvider, model: agent.model, language: agent.language }))
    setDrawerOpen(true)
  }

  const saveAgent = () => {
    if (editingId) {
      setAgentsList(prev => prev.map(a => a.id === editingId ? { ...a, name: form.name, voiceProvider: form.voiceProvider, model: form.model, language: form.language } : a))
    } else {
      setAgentsList(prev => [...prev, {
        id: Date.now().toString(), name: form.name || "Unnamed Agent", voiceProvider: form.voiceProvider, model: form.model,
        language: form.language, status: "draft", created: "Just now", phoneNumber: "—"
      }])
    }
    setDrawerOpen(false)
  }

  const filtered = agentsList.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.voiceProvider.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 animate-view-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Agents</h2>
          <p className="text-sm text-muted-foreground">Create and manage AI voice assistants</p>
        </div>
        <button
          onClick={openDrawerForCreate}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 active:scale-[0.97]"
        >
          <Plus className="size-4" />
          Create Agent
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search agents..."
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all"
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Agents", value: agentsList.length.toString(), accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20" },
          { label: "Active", value: agentsList.filter(a => a.status === "active").length.toString(), accent: "from-emerald-500/10 to-green-500/5 border-emerald-500/20" },
          { label: "Draft", value: agentsList.filter(a => a.status === "draft").length.toString(), accent: "from-amber-500/10 to-orange-500/5 border-amber-500/20" },
          { label: "Calls Today", value: "147", accent: "from-blue-500/10 to-cyan-500/5 border-blue-500/20" },
        ].map(stat => (
          <div key={stat.label} className={cn("rounded-xl border bg-gradient-to-br p-4 animate-card-enter", stat.accent)}>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Agent Name", "Phone Number", "Voice Provider", "Model", "Language", "Status", "Created", "Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((agent, i) => {
                const st = statusConfig[agent.status as keyof typeof statusConfig]
                return (
                  <tr key={agent.id} className="group hover:bg-muted/30 transition-colors animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-foreground/5 border border-border">
                          <Bot className="size-4 text-foreground/70" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{agent.phoneNumber}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{agent.voiceProvider}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{agent.model}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{agent.language}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", st.color)}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{agent.created}</td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center gap-1">
                        {agent.status !== "active" && (
                          <button onClick={() => deployAgent(agent.id)} className="rounded-md p-1.5 text-blue-600 hover:bg-blue-500/10 transition-colors" title="Deploy">
                            <Rocket className="size-3.5" />
                          </button>
                        )}
                        <button onClick={() => openDrawerForEdit(agent)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Edit">
                          <Edit className="size-3.5" />
                        </button>
                        <button onClick={() => duplicateAgent(agent)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Duplicate">
                          <Copy className="size-3.5" />
                        </button>
                        <button onClick={() => deleteAgent(agent.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Agent Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-foreground/5 border border-border">
                  <Bot className="size-4 text-foreground/70" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{editingId ? "Edit Agent" : "Create Agent"}</h3>
                  <p className="text-xs text-muted-foreground">{editingId ? "Update your AI voice assistant" : "Configure a new AI voice assistant"}</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
              {[
                { label: "Agent Name", key: "name", type: "input", placeholder: "e.g. Sales Qualifier" },
                { label: "Prompt Instructions", key: "prompt", type: "textarea", placeholder: "Describe your agent's role, tone, and goals..." },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={4}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all resize-none"
                    />
                  ) : (
                    <input
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all"
                    />
                  )}
                </div>
              ))}
              {[
                { label: "Voice Provider", key: "voiceProvider", options: ["ElevenLabs", "Vapi", "Deepgram"] },
                { label: "LLM Model", key: "model", options: ["GPT-4o", "GPT-4o-mini", "Claude 3.5 Sonnet", "Claude 3 Haiku"] },
                { label: "Language", key: "language", options: ["English", "Spanish", "French", "German", "Portuguese"] },
                { label: "Response Style", key: "responseStyle", options: ["Concise", "Detailed", "Friendly", "Professional"] },
                { label: "Fallback Behavior", key: "fallback", options: ["Transfer to human", "End call", "Schedule callback"] },
              ].map(sel => (
                <div key={sel.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{sel.label}</label>
                  <div className="relative">
                    <select
                      value={form[sel.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [sel.key]: e.target.value }))}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/30 pr-8 transition-all"
                    >
                      {sel.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              <button
                onClick={saveAgent}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all active:scale-[0.97]"
              >
                {editingId ? <Edit className="size-4" /> : <Zap className="size-4" />}
                {editingId ? "Save Changes" : "Create Agent"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
