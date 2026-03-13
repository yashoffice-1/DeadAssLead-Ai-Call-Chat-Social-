import { 
  Bot, 
  Calendar,
  Database, 
  GitBranch, 
  MessageSquare, 
  MousePointer2, 
  PhoneCall, 
  Play, 
  Plus, 
  Save, 
  Settings2, 
  Users 
} from "lucide-react"

export function FlowBuilderSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center animate-[fade-in-up_0.6s_ease-out_both]">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Visual Flow Builder
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground mx-auto max-w-xl">
            Design your perfect reactivation pathways in seconds. Drag, drop, and let the AI handle the rest. No coding required.
          </p>
        </div>

        <div className="mt-16 animate-[card-enter_0.6s_ease-out_0.2s_both]">
          {/* Mac-style Window Frame */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl flex flex-col h-[600px] z-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span>My Flows</span>
                  <span className="text-border">/</span>
                  <span className="text-foreground flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-500" />
                    Dead Lead Reactivation
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted transition-colors">
                  <Save className="w-3.5 h-3.5" /> Save Draft
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-400 transition-colors shadow-emerald-500/20">
                  <Play className="w-3.5 h-3.5" fill="currentColor" /> Publish Flow
                </button>
              </div>
            </div>

            {/* Main Application Area */}
            <div className="flex flex-1 overflow-hidden relative">
              {/* Sidebar Toolbar */}
              <div className="w-64 border-r border-border bg-card/50 p-4 hidden md:flex flex-col gap-6 overflow-y-auto">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Triggers</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5 text-sm font-medium hover:border-emerald-500/30 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                      <Users className="w-4 h-4 text-emerald-500" /> New Lead Uploaded
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5 text-sm font-medium hover:border-emerald-500/30 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                      <Calendar className="w-4 h-4 text-emerald-500" /> Appointment Missed
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">AI Agents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5 text-sm font-medium hover:border-emerald-500/30 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                      <PhoneCall className="w-4 h-4 text-violet-500" /> AI Voice Caller
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5 text-sm font-medium hover:border-emerald-500/30 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                      <MessageSquare className="w-4 h-4 text-blue-500" /> AI SMS Engine
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Logic</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-2.5 text-sm font-medium hover:border-emerald-500/30 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                      <GitBranch className="w-4 h-4 text-orange-500" /> Condition Split
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas Area (Flow Builder) */}
              <div className="flex-1 bg-muted/10 relative overflow-hidden flex flex-col items-center py-10">
                {/* Dotted Grid Background */}
                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40" 
                     style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, currentcolor 1px, transparent 0)', backgroundSize: '24px 24px', color: 'gray' }} />

                {/* Simulated Nodes & Paths */}
                <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm mt-4">
                  
                  {/* Floating Cursor (Animation effect) */}
                  <MousePointer2 className="absolute -left-16 top-42 w-6 h-6 text-foreground drop-shadow-md animate-[bounce_2s_infinite] z-50 pointer-events-none" />

                  {/* Node 1: Trigger */}
                  <div className="w-64 rounded-xl border-2 border-emerald-500/50 bg-background shadow-lg shadow-emerald-500/10 transition-transform hover:scale-105 group cursor-pointer relative">
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Settings2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3 bg-emerald-500/5">
                      <div className="bg-emerald-500 text-white rounded p-1.5 shadow-sm">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm">Lead Uploaded</span>
                    </div>
                    <div className="px-4 py-3 text-xs text-muted-foreground">
                      List: "Old 2023 CRM Leads"
                    </div>
                  </div>

                  {/* SVG Connector Down */}
                  <div className="h-6 w-0.5 bg-emerald-500/50" />

                  {/* Node 2: Logic Split */}
                  <div className="w-64 rounded-xl border border-border bg-background shadow-lg transition-transform hover:scale-105 group cursor-pointer relative">
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Settings2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3 bg-orange-500/5">
                      <div className="bg-orange-500 text-white rounded p-1.5 shadow-sm">
                        <GitBranch className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm">Condition Split</span>
                    </div>
                    <div className="px-4 py-3 text-xs font-medium text-foreground">
                      "Lead has Phone Number?"
                    </div>
                  </div>

                  {/* SVG Connector Split Branches */}
                  <div className="relative w-full h-8 flex justify-center mt-[-8px]">
                     {/* Horizontal bar */}
                     <div className="absolute top-8 w-48 h-0.5 bg-border rounded-full" />
                     {/* Vertical down to left */}
                     <div className="absolute top-8 left-[calc(50%-96px)] w-0.5 h-6 bg-border" />
                     {/* Vertical down to center */}
                     <div className="absolute top-4 w-0.5 h-4 bg-emerald-500/50" />
                     {/* Vertical down to right */}
                     <div className="absolute top-8 right-[calc(50%-96px)] w-0.5 h-6 bg-border" />
                  </div>

                  {/* Branch Nodes Row */}
                  <div className="flex gap-8 w-[400px] justify-center mt-4">
                    {/* Left Node (Yes) */}
                    <div className="w-48 rounded-xl border border-border bg-background shadow-lg transition-transform hover:scale-105 relative mt-2 group cursor-pointer">
                      <div className="absolute -top-3 right-4 bg-background px-1 text-[10px] font-bold text-emerald-500 uppercase">Yes</div>
                      <div className="flex flex-col items-center gap-2 p-4 text-center">
                        <div className="bg-violet-500/10 text-violet-500 p-3 rounded-full mb-1 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                          <PhoneCall className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm leading-tight">AI Voice Call</span>
                        <span className="text-[10px] text-muted-foreground font-medium">Agent: "Sarah (Sales)"</span>
                      </div>
                    </div>

                    {/* Right Node (No) */}
                    <div className="w-48 rounded-xl border border-border bg-background shadow-lg transition-transform hover:scale-105 relative mt-2 group cursor-pointer">
                      <div className="absolute -top-3 left-4 bg-background px-1 text-[10px] font-bold text-red-500 uppercase">No</div>
                      <div className="flex flex-col items-center gap-2 p-4 text-center">
                        <div className="bg-blue-500/10 text-blue-500 p-3 rounded-full mb-1 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm leading-tight">AI SMS Outreach</span>
                        <span className="text-[10px] text-muted-foreground font-medium">Template: "Reconnect"</span>
                      </div>
                    </div>
                  </div>

                  {/* Plus button at the bottom */}
                  <div className="mt-8 flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-border bg-background text-muted-foreground hover:text-foreground hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors shadow-sm cursor-pointer">
                    <Plus className="w-5 h-5" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
