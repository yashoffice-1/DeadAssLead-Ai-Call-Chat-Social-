"use client"

import { useState, useRef } from "react"
import {
  BookOpen, Plus, Search, Upload, FileText, Globe, File, Trash2, Link2,
  X, CloudUpload, AlertCircle, FileSpreadsheet
} from "lucide-react"
import { cn } from "@/lib/utils"

const documents = [
  {
    id: "1", name: "Product FAQ.pdf", type: "PDF", size: "245 KB",
    uploaded: "Mar 10, 2026", linkedAgents: ["SalesBot Alpha", "LeadQual Pro"],
  },
  {
    id: "2", name: "Pricing Guide 2026.docx", type: "DOCX", size: "88 KB",
    uploaded: "Mar 12, 2026", linkedAgents: ["SalesBot Alpha"],
  },
  {
    id: "3", name: "Objection Handling.txt", type: "TXT", size: "32 KB",
    uploaded: "Mar 14, 2026", linkedAgents: ["Appointment Setter", "Follow-Up Agent"],
  },
  {
    id: "4", name: "https://deadasslead.com/docs", type: "URL", size: "—",
    uploaded: "Mar 15, 2026", linkedAgents: ["LeadQual Pro"],
  },
  {
    id: "5", name: "Q1 Campaign Leads.xlsx", type: "XLSX", size: "1.2 MB",
    uploaded: "Mar 16, 2026", linkedAgents: ["LeadQual Pro", "SalesBot Alpha"],
  },
]

const typeIcon = (type: string) => {
  if (type === "URL") return <Globe className="size-4 text-blue-500" />
  if (type === "PDF") return <FileText className="size-4 text-red-500" />
  if (type === "DOCX") return <File className="size-4 text-indigo-500" />
  if (type === "XLSX" || type === "CSV" || type === "XLS") return <FileSpreadsheet className="size-4 text-emerald-500" />
  return <FileText className="size-4 text-muted-foreground" />
}

export function KnowledgeBaseView() {
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = documents.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 animate-view-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
          <p className="text-sm text-muted-foreground">Documents used by AI agents during calls</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 active:scale-[0.97]"
        >
          <Plus className="size-4" />
          Upload File
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Documents", value: documents.length.toString(), accent: "from-blue-500/10 to-indigo-500/5 border-blue-500/20" },
          { label: "PDFs", value: documents.filter(d => d.type === "PDF").length.toString(), accent: "from-red-500/10 to-rose-500/5 border-red-500/20" },
          { label: "Linked Agents", value: "4", accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20" },
          { label: "Total Size", value: "365 KB", accent: "from-emerald-500/10 to-green-500/5 border-emerald-500/20" },
        ].map(stat => (
          <div key={stat.label} className={cn("rounded-xl border bg-gradient-to-br p-4 animate-card-enter", stat.accent)}>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition-all",
          dragging
            ? "border-foreground/40 bg-foreground/5"
            : "border-border bg-card hover:border-foreground/20 hover:bg-muted/30"
        )}
      >
        <CloudUpload className={cn("size-10 mb-3 transition-colors", dragging ? "text-foreground" : "text-muted-foreground/50")} />
        <p className="text-sm font-medium text-foreground">Drop files here or <span className="text-blue-500 underline underline-offset-2">browse</span></p>
        <p className="mt-1 text-xs text-muted-foreground">Supports PDF, TXT, DOCX, XLSX, CSV — max 25 MB</p>
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.txt,.docx,.xlsx,.xls,.csv" multiple />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Document Name", "Type", "Size", "Uploaded", "Linked Agents", "Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((doc, i) => (
                <tr key={doc.id} className="group hover:bg-muted/30 transition-colors animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-foreground/5 border border-border">
                        {typeIcon(doc.type)}
                      </div>
                      <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground">{doc.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{doc.size}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{doc.uploaded}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {doc.linkedAgents.map(agent => (
                        <span key={agent} className="inline-flex items-center gap-1 rounded-full bg-foreground/5 border border-border px-2 py-0.5 text-[10px] text-foreground">
                          <Link2 className="size-2.5" />{agent}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* URL Upload Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Upload to Knowledge Base</h3>
                <p className="text-xs text-muted-foreground">Add a file or website URL</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false) }}
                onClick={() => fileRef.current?.click()}
                className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition-all",
                  dragging ? "border-foreground/40 bg-foreground/5" : "border-border hover:border-foreground/20 hover:bg-muted/30")}
              >
                <CloudUpload className="size-10 mb-3 text-muted-foreground/50" />
                <p className="text-sm font-medium text-foreground">Drop files or <span className="text-blue-500">browse</span></p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, TXT, DOCX, XLSX, CSV — max 25 MB</p>
                <input ref={fileRef} type="file" className="hidden" accept=".pdf,.txt,.docx,.xlsx,.xls,.csv" multiple />
              </div>
              <div className="flex items-center gap-3"><div className="h-px flex-1 bg-border" /><span className="text-xs text-muted-foreground">or</span><div className="h-px flex-1 bg-border" /></div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Website URL</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://your-docs.com" className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/30 transition-all" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 flex gap-2">
                <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400">Files are processed and chunked for semantic search. Large files may take a few minutes to index.</p>
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              <button onClick={() => setDrawerOpen(false)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all active:scale-[0.97]">
                <Upload className="size-4" />Upload
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
