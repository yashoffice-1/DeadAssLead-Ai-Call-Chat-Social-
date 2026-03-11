"use client"

import { Zap } from "lucide-react"
import Link from "next/link"

const footerLinks = [
  { label: "Features", href: "#conversational-setup" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-secondary/30 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 md:flex-row md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                <Zap className="h-3.5 w-3.5 text-background" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">DeadAssLead</span>
            </div>
            <span className="text-xs text-muted-foreground sm:text-sm">Your Private AI Social &amp; Call Center</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span className="text-[10px] text-muted-foreground sm:text-xs">
            &copy; {new Date().getFullYear()} DeadAssLead. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
