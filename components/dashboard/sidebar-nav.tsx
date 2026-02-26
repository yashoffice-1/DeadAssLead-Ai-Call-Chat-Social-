"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  GitBranch,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Inbox,
  Phone,
  FileText,
  LogOut,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export type ViewType = "overview" | "flows" | "inbox" | "calls" | "rules" | "integrations"

const navItems: { id: ViewType; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "flows", label: "Flow Builder", icon: GitBranch },
  { id: "inbox", label: "Social Inbox", icon: Inbox },
  { id: "calls", label: "Call History", icon: Phone },
  { id: "rules", label: "Post Rules", icon: FileText },
  { id: "integrations", label: "Integrations", icon: Puzzle },
]

interface SidebarNavProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function SidebarNav({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
}: SidebarNavProps) {
  const router = useRouter()

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[200px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground">
          <Zap className="size-3.5 text-background" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight text-foreground">
            NexusAI
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
        {navItems.map((item) => {
          const isActive = activeView === item.id
          const btn = (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )

          if (collapsed) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>{btn}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            )
          }

          return <div key={item.id}>{btn}</div>
        })}
      </nav>

      {/* Log Out + Collapse */}
      <div className="border-t border-border p-2 space-y-1">
        {(() => {
          const logoutBtn = (
            <button
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4 shrink-0" />
              {!collapsed && <span>Log Out</span>}
            </button>
          )
          if (collapsed) {
            return (
              <Tooltip>
                <TooltipTrigger asChild>{logoutBtn}</TooltipTrigger>
                <TooltipContent side="right">Log Out</TooltipContent>
              </Tooltip>
            )
          }
          return logoutBtn
        })()}
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
