"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { label: "Features", href: "#conversational-setup" },
  { label: "Pricing", href: "#pricing" },
  { label: "Deploy", href: "#signup" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/70 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4" suppressHydrationWarning>
        <a href="#" className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground sm:text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground sm:h-8 sm:w-8">
            <Zap className="h-3.5 w-3.5 text-background sm:h-4 sm:w-4" />
          </div>
          DeadAssLead
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="relative overflow-hidden rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.97]"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmer 3s ease-in-out infinite", backgroundSize: "200% 100%" }} />
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[52px] bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed left-0 right-0 top-[52px] z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-5 md:hidden sm:px-6">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Sign In
              </Link>
              <div className="mt-2 pt-2 border-t border-border/50">
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-all active:scale-[0.97]"
                  suppressHydrationWarning
                >
                  Get Started
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
