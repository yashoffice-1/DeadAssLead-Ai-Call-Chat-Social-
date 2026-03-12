"use client"

import { useState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommandBarProps {
  onCommand?: (command: string) => void
}

export function CommandBar({ onCommand }: CommandBarProps) {
  const [input, setInput] = useState("")

  const handleRun = () => {
    if (input.trim() && onCommand) {
      onCommand(input.trim())
      setInput("")
    }
  }

  return (
    <div suppressHydrationWarning className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 shadow-sm">
      <Sparkles className="size-4 shrink-0 text-muted-foreground" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleRun()}
        placeholder="Describe an automation... e.g. &quot;Connect TikTok and reply to DMs&quot;"
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <Button
        size="sm"
        onClick={handleRun}
        disabled={!input.trim()}
        className="gap-1.5"
      >
        Run
        <ArrowRight className="size-3" />
      </Button>
    </div>
  )
}
