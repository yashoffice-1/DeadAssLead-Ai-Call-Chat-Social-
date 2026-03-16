"use client"

import { useState } from "react"
import {
  CalendarClock,
  Filter,
  LayoutDashboard,
  Tag,
  Download,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const vapiCalls = [
  { id: "1", time: "Mar 16, 2026 12:45 PM", duration: "1m 12s", channelType: "PSTN", cost: "$0.14", sessionId: "req_a1b2c3d4", endReason: "customer_hung_up", sessionStatus: "completed", userSentiment: "neutral", from: "+1 (415) 555-1234", to: "+1 (800) 555-0199", direction: "inbound" },
  { id: "2", time: "Mar 16, 2026 11:20 AM", duration: "4m 32s", channelType: "Web", cost: "$0.00", sessionId: "req_x9y8z7w6", endReason: "assistant_hung_up", sessionStatus: "completed", userSentiment: "interested", from: "Web Widget", to: "Agent", direction: "inbound" },
  { id: "3", time: "Mar 15, 2026 09:15 AM", duration: "0m 45s", channelType: "PSTN", cost: "$0.09", sessionId: "req_p5q6r7s8", endReason: "customer_hung_up", sessionStatus: "completed", userSentiment: "not_interested", from: "+1 (800) 555-0199", to: "+1 (212) 555-8888", direction: "outbound" },
  { id: "4", time: "Mar 14, 2026 03:30 PM", duration: "6m 18s", channelType: "PSTN", cost: "$0.85", sessionId: "req_m1n2o3p4", endReason: "assistant_hung_up", sessionStatus: "completed", userSentiment: "interested", from: "+1 (800) 555-0199", to: "+44 20 7946", direction: "outbound" },
  { id: "5", time: "Mar 14, 2026 10:15 AM", duration: "2m 05s", channelType: "PSTN", cost: "$0.22", sessionId: "req_o8m7n6b5", endReason: "customer_hung_up", sessionStatus: "completed", userSentiment: "interested", from: "+1 (312) 555-4444", to: "+1 (800) 555-0199", direction: "inbound" },
  { id: "6", time: "Mar 13, 2026 04:50 PM", duration: "0m 12s", channelType: "PSTN", cost: "$0.02", sessionId: "req_z1x2c3v4", endReason: "voicemail", sessionStatus: "completed", userSentiment: "neutral", from: "+1 (800) 555-0199", to: "+1 (415) 555-9999", direction: "outbound" },
]

export function CallsView() {
  return (
    <div className="flex flex-col gap-6 animate-view-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-foreground">Call History</h2>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="gap-2 bg-card text-xs font-semibold hover:bg-accent hover:text-foreground border-border">
          <CalendarClock className="size-4" /> Date Range
        </Button>
        <Button variant="outline" className="gap-2 bg-card text-xs font-semibold hover:bg-accent hover:text-foreground border-border">
          <Filter className="size-4" /> Filter
        </Button>
        <Button variant="outline" className="gap-2 bg-card text-xs font-semibold hover:bg-accent hover:text-foreground border-border">
          <LayoutDashboard className="size-4" /> Customize View
        </Button>
        <Button variant="outline" className="gap-2 bg-card text-xs font-semibold hover:bg-accent hover:text-foreground border-border">
          <Tag className="size-4" /> Custom Attributes
        </Button>
        <div className="flex-1" />
        <Button variant="secondary" className="gap-2 bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold transition-all shadow-sm active:scale-95">
          <Download className="size-4" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Time", "Duration", "Channel Type", "Cost", "Session ID", "End Reason", "Session Status", "User Sentiment", "From", "To", "Direction"].map((col) => (
                  <th key={col} className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vapiCalls.map((call) => (
                <tr key={call.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium whitespace-nowrap text-foreground">{call.time}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{call.duration}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] bg-background font-medium">{call.channelType}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{call.cost}</td>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground font-mono bg-muted/10 selection:bg-muted/50">{call.sessionId}</td>
                  <td className="px-4 py-3 text-xs text-foreground/80">{call.endReason}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 text-[10px] uppercase tracking-wider font-semibold shadow-none">
                      {call.sessionStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-[10px] font-semibold bg-background shadow-sm", 
                      call.userSentiment === "interested" ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : 
                      call.userSentiment === "not_interested" ? "text-red-600 dark:text-red-400 border-red-500/30" : 
                      "text-amber-600 dark:text-amber-400 border-amber-500/30"
                    )}>
                      {call.userSentiment.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap">{call.from}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap">{call.to}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground capitalize">
                      {call.direction === "inbound" ? (
                        <PhoneIncoming className="size-3.5 text-cyan-500" />
                      ) : (
                        <PhoneOutgoing className="size-3.5 text-blue-500" />
                      )}
                      {call.direction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
