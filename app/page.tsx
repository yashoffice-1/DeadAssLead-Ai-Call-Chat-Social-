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
      <ConnectionHub />
      <ConversationalSetup />
      <CommandCenter />
      <RuleEngine />
      <section id="pricing">
        <PricingSection />
      </section>
      <SignupSection />
      <Footer />
    </main>
  )
}
