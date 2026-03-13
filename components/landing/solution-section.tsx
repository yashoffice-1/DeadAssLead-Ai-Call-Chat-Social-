"use client"

import { useState } from "react"
import { MessageSquare, PhoneCall, CheckCircle, Calendar, Play, Bot, Target } from "lucide-react"

export function SolutionSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { 
      id: 0,
      title: "AI SMS Conversations", 
      icon: MessageSquare,
      content: (
        <div className="flex flex-col gap-4 font-sans text-sm h-full animate-[fade-in-up_0.3s_ease-out_both]" key="sms">
          <div className="flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-2xl rounded-tl-none p-3 max-w-[80%] border border-emerald-500/20 shadow-sm">
              Hi John! Noticed you looked at our platform a few months ago. Are you still trying to solve your lead generation issues?
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="h-8 w-8 shrink-0 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-xs font-bold">J</div>
            <div className="bg-secondary text-foreground rounded-2xl rounded-tr-none p-3 max-w-[80%] shadow-sm">
              Yes, but we didn't have the budget back then.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-2xl rounded-tl-none p-3 max-w-[80%] border border-emerald-500/20 shadow-sm">
              Got it! We actually just launched a new pricing model specifically for growing teams that might fit perfectly. Do you have 10 mins tomorrow to chat?
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 1,
      title: "AI Voice Calling Agent", 
      icon: PhoneCall,
      content: (
        <div className="flex flex-col items-center justify-center h-full gap-6 animate-[scale-in_0.3s_ease-out_both]" key="voice">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="absolute -inset-4 rounded-full bg-emerald-500/10 animate-pulse delay-75" />
            <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
               <PhoneCall className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2 mt-4">
            <div className="text-xl font-bold text-foreground">Calling Lead...</div>
            <div className="text-sm font-medium text-emerald-500">Connecting to: John Doe</div>
            <div className="text-xs text-muted-foreground bg-secondary/50 inline-flex px-3 py-1 rounded-full border border-border/50">00:14 / Active Call</div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 h-12">
             {[1, 3, 2, 5, 4, 2, 6, 3, 2, 4, 1].map((v, i) => (
                <div key={i} className="w-1.5 bg-emerald-500/80 rounded-full animate-pulse" style={{ height: `${v * 8}px`, animationDelay: `${i * 100}ms`, animationDuration: '0.8s' }} />
             ))}
          </div>
        </div>
      )
    },
    { 
      id: 2,
      title: "Smart Lead Qualification", 
      icon: CheckCircle,
      content: (
        <div className="flex flex-col gap-4 h-full animate-[fade-in-up_0.3s_ease-out_both]" key="qual">
           <div className="bg-background rounded-xl p-5 border border-border shadow-md relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="text-sm font-semibold text-foreground border-b border-border pb-3 mb-4 flex items-center gap-2">
               <CheckCircle className="w-4 h-4 text-emerald-500" /> Extracted Lead Data
             </div>
             <div className="space-y-4 relative z-10">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground font-medium">Budget</span>
                 <span className="font-semibold text-emerald-500 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md"><CheckCircle className="w-3.5 h-3.5" /> Confirmed</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground font-medium">Timeline</span>
                 <span className="font-semibold text-foreground">1-2 Months</span>
               </div>
               <div className="flex justify-between items-center text-sm pt-2">
                 <span className="text-muted-foreground font-medium">Intent Score</span>
                 <div className="flex items-center gap-3">
                   <div className="h-2.5 w-24 bg-secondary rounded-full overflow-hidden border border-border/50">
                     <div className="h-full bg-emerald-500 w-[85%] animate-[flow-dash_1.5s_ease-out]" />
                   </div>
                   <span className="font-bold text-emerald-500">85/100</span>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl border border-emerald-500/20 text-sm font-medium flex items-center justify-between shadow-sm">
              <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Goal: Book Demo</span>
              <span className="bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">Achieved</span>
           </div>
        </div>
      )
    },
    { 
      id: 3,
      title: "Automated Appointment Booking", 
      icon: Calendar,
      content: (
        <div className="flex flex-col h-full items-center justify-center py-4 px-2 animate-[scale-in_0.3s_ease-out_both]" key="booking">
          <div className="bg-background w-full rounded-2xl border border-border p-6 shadow-xl relative overflow-hidden hover:border-emerald-500/30 transition-colors cursor-default">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground tracking-tight">Strategy Session</div>
                <div className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                  <div className="w-4 h-4 bg-secondary rounded-full text-[8px] flex items-center justify-center font-bold text-foreground">JD</div>
                  with John Doe
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm font-semibold text-foreground bg-secondary/50 p-3 rounded-xl border border-border/50">
                <div className="w-6 h-6 bg-background rounded-md border border-border flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                Tomorrow, 2:00 PM EST
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg">
                <Bot className="w-4 h-4" /> AI Auto-Scheduled
              </div>
            </div>

            <button className="w-full bg-foreground text-background font-bold py-3 rounded-xl text-sm opacity-50 cursor-not-allowed">
              Confirmed & Synced in CRM ✓
            </button>
          </div>
        </div>
      )
    },
  ]

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Meet Your AI Lead Reactivation Engine
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The AI agent automatically reaches out to old leads and starts conversations. It intelligently responds, handles objections, and schedules demos 24/7 without human intervention.
            </p>
            <ul className="mt-10 space-y-3 relative">
              {/* Animated background highlights for tabs (optional, using pure CSS approach below) */}
              {features.map((feature) => (
                <li 
                  key={feature.title} 
                  className={`group flex items-center gap-4 transition-all duration-300 cursor-pointer p-4 rounded-xl border-2 ${activeFeature === feature.id ? 'bg-card border-border shadow-md scale-[1.02]' : 'border-transparent hover:bg-muted font-medium'}`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${activeFeature === feature.id ? 'bg-emerald-500/10 text-emerald-500 shadow-inner' : 'bg-secondary text-muted-foreground group-hover:text-foreground group-hover:bg-secondary/80'}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className={`text-base font-semibold transition-colors duration-300 ${activeFeature === feature.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {feature.title}
                  </span>
                  
                  {/* Subtle arrow indicator for active state */}
                  {activeFeature === feature.id && (
                    <div className="ml-auto text-emerald-500 opacity-60">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[fade-in-up_0.3s_ease-out_both] rotate-[-90deg]">
                        <path d="M12 20L12 4M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full min-h-[450px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-card-enter">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-background to-blue-500/10 opacity-50" />
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-4 bg-card/80 backdrop-blur-md z-10 relative">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-emerald-500/20">AI</div>
                <div>
                  <div className="text-sm font-bold text-foreground tracking-tight">AI Sales Engine</div>
                  <div className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    System Active
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 relative z-10 h-[calc(100%-72px)] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-emerald-500/20">
               {features[activeFeature].content}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
