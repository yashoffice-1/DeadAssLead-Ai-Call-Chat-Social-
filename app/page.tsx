import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ConnectionHub } from "@/components/landing/connection-hub"
import { ConversationalSetup } from "@/components/landing/conversational-setup"
import { CommandCenter } from "@/components/landing/command-center"
import { RuleEngine } from "@/components/landing/rule-engine"
import { PricingSection } from "@/components/landing/pricing-section"
import { SignupSection } from "@/components/landing/signup-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background" suppressHydrationWarning>
      <Navbar />
      <HeroSection />
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <ConnectionHub />
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <ConversationalSetup />
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <CommandCenter />
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <RuleEngine />
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <section id="pricing">
        <PricingSection />
      </section>
      <div className="mx-auto max-w-6xl px-0">
        <hr className="border-border" />
      </div>
      <SignupSection />
      <Footer />
    </main>
  )
}
