"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { label: "Features",  sectionId: "features" },
  { label: "Pricing",   sectionId: "pricing" },
  { label: "Request",   sectionId: "signup" },
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

  const scrollToSection = useCallback((sectionId: string) => {
    setOpen(false)
    const target = document.getElementById(sectionId)
    if (!target) return

    const container = document.querySelector(".snap-container") as HTMLElement | null
    if (!container) {
      target.scrollIntoView({ behavior: "smooth" })
      return
    }

    let el: HTMLElement | null = target
    while (el && el.parentElement !== container) {
      el = el.parentElement
    }

    if (el) {
      container.scrollTo({ top: el.offsetTop, behavior: "smooth" })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <header
        className={`pointer-events-auto relative flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-white/20 dark:border-white/10 bg-background/80 dark:bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          scrolled ? "max-w-xl scale-95" : "max-w-2xl w-full"
        }`}
        suppressHydrationWarning
      >
        <div className="flex items-center gap-2 pl-2">
          <a href="#" className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground transition-all hover:opacity-80">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground shadow-lg">
              <Zap className="h-4 w-4 text-background" />
            </div>
            <span className="hidden sm:inline-block">DeadAssLead</span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.sectionId)}
              className="text-xs font-semibold text-muted-foreground transition-all hover:text-foreground hover:scale-105 active:scale-95"
            >
              {link.label}
            </button>
          ))}
          <div className="h-4 w-px bg-border/50 mx-1" />
          <Link
            href="/login"
            className="text-xs font-semibold text-muted-foreground transition-all hover:text-foreground"
          >
            Sign In
          </Link>
          <button
            onClick={() => scrollToSection("signup")}
            className="group relative overflow-hidden rounded-full bg-foreground px-5 py-2 text-xs font-bold text-background shadow-lg transition-all hover:shadow-foreground/20 active:scale-[0.97]"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40 pointer-events-auto"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed left-4 right-4 top-20 z-50 rounded-3xl border border-white/20 bg-background/95 backdrop-blur-2xl p-6 md:hidden shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                  <Zap className="h-3 w-3 opacity-20" />
                </button>
              ))}
              <div className="my-2 h-px bg-border/50" />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-sm font-semibold text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
              >
                Sign In
              </Link>
              <button
                onClick={() => scrollToSection("signup")}
                className="mt-2 flex w-full items-center justify-center rounded-2xl bg-foreground py-4 text-sm font-bold text-background shadow-xl transition-all active:scale-[0.98]"
              >
                Get Started
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
