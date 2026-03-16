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
  X,
  Bot,
  BookOpen,
  PhoneCall,
  RadioTower,
  Megaphone,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"

export type ViewType =
  | "overview"
  | "flows"
  | "inbox"
  | "calls"
  | "rules"
  | "integrations"
  | "agents"
  | "knowledge-base"
  | "phone-numbers"
  | "batch-call"
  | "campaigns"

interface NavGroup {
  label: string
  items: { id: ViewType; label: string; icon: React.ElementType; badge?: string }[]
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Automation",
    items: [
      { id: "flows", label: "Flow Builder", icon: GitBranch },
      { id: "rules", label: "Post Rules", icon: FileText },
    ],
  },
  {
    label: "Communication",
    items: [
      { id: "inbox", label: "Social Inbox", icon: Inbox, badge: "3" },
      { id: "calls", label: "Call History", icon: Phone },
    ],
  },
  {
    label: "Call Center",
    items: [
      { id: "agents", label: "Agents", icon: Bot },
      { id: "knowledge-base", label: "Knowledge Base", icon: BookOpen },
      { id: "phone-numbers", label: "Phone Numbers", icon: PhoneCall },
      { id: "batch-call", label: "Batch Call", icon: RadioTower },
      { id: "campaigns", label: "Campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Settings",
    items: [
      { id: "integrations", label: "Integrations", icon: Puzzle },
    ],
  },
]

// Flat list for mobile
const allNavItems = navGroups.flatMap((g) => g.items)

interface SidebarNavProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function SidebarNav({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: SidebarNavProps) {
  const router = useRouter()

  const handleNavClick = (view: ViewType) => {
    onViewChange(view)
    onMobileClose?.()
  }

  const renderNavButton = (
    item: { id: ViewType; label: string; icon: React.ElementType; badge?: string },
    isActive: boolean,
    showLabel: boolean,
    large?: boolean
  ) => (
    <button
      onClick={() => handleNavClick(item.id)}
      className={cn(
        "group relative flex items-center rounded-lg text-sm font-medium transition-all duration-200",
        !showLabel ? "size-9 justify-center" : large ? "w-full gap-2.5 px-3 py-2.5" : "w-full gap-2.5 px-2.5 py-2",
        isActive
          ? "bg-foreground text-background shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <item.icon className={cn("shrink-0 transition-transform duration-200 group-hover:scale-105", large ? "size-[18px]" : "size-4")} />
      {showLabel && (
        <span className="flex-1 text-left">{item.label}</span>
      )}
      {showLabel && item.badge && (
        <span className={cn(
          "flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
          isActive
            ? "bg-background/20 text-background"
            : "bg-foreground/10 text-foreground"
        )}>
          {item.badge}
        </span>
      )}
    </button>
  )

  // Desktop sidebar
  const sidebarContent = (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border/60 bg-gradient-to-b from-sidebar to-sidebar/95 transition-all duration-300",
        "max-md:hidden",
        collapsed ? "w-[64px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border/60 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground shadow-sm">
          <Zap className="size-4 text-background" />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold tracking-tight text-foreground">
            DeadAssLead
          </span>
        )}
      </div>

      {/* Nav Groups */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pt-4 no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <span className="mb-1.5 block px-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.label}
              </span>
            )}
            {collapsed && group.label !== "Overview" && (
              <div className="mx-3 my-2 h-px bg-border/40" />
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = activeView === item.id
                const btn = renderNavButton(item, isActive, !collapsed)

                if (collapsed) {
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>{btn}</TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return <div key={item.id}>{btn}</div>
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/60 p-2 space-y-1">
        <div className={cn("flex mb-2", collapsed ? "justify-center" : "px-1.5")}>
          <ThemeToggle />
        </div>
        {(() => {
          const logoutBtn = (
            <button
              onClick={() => router.push("/")}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
                collapsed ? "size-9 justify-center mx-auto" : "w-full gap-2.5 px-2.5 py-2"
              )}
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
          className="flex w-full items-center justify-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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

  // Mobile drawer
  const mobileDrawer = (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col bg-gradient-to-b from-sidebar to-sidebar/95 shadow-2xl transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo + Close */}
        <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground shadow-sm">
              <Zap className="size-4 text-background" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">
              DeadAssLead
            </span>
          </div>
          <button
            onClick={onMobileClose}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Nav Groups */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pt-4 no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-3">
              <span className="mb-1.5 block px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.label}
              </span>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = activeView === item.id
                  return (
                    <div key={item.id}>
                      {renderNavButton(item, isActive, true, true)}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border/60 p-3 space-y-2">
          <div className="px-1">
            <ThemeToggle />
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )

  return (
    <>
      {sidebarContent}
      {mobileDrawer}
    </>
  )
}
