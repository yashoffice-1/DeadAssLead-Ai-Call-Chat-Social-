import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ConnectionHub } from "@/components/landing/connection-hub"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { ConversationalSetup } from "@/components/landing/conversational-setup"
import { FlowBuilderSection } from "@/components/landing/flow-builder-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { SignupSection } from "@/components/landing/signup-section"
import { ProductDemoSection } from "@/components/landing/product-demo-section"
import { IndustriesSection } from "@/components/landing/industries-section"
import { ResultsSection } from "@/components/landing/results-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCtaSection } from "@/components/landing/final-cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="snap-container bg-background" suppressHydrationWarning>
      <Navbar />
      <div className="snap-section"><HeroSection /></div>
      <div className="snap-section"><ConnectionHub /></div>
      <div className="snap-section"><ProblemSection /></div>
      <div className="snap-section"><SolutionSection /></div>
      <div className="snap-section"><ConversationalSetup /></div>
      <div className="snap-section"><FlowBuilderSection /></div>
      <div className="snap-section"><HowItWorksSection /></div>
      <div className="snap-section"><FeaturesSection /></div>
      <div className="snap-section"><SignupSection /></div>
      <div className="snap-section"><ProductDemoSection /></div>
      <div className="snap-section"><IndustriesSection /></div>
      <div className="snap-section"><ResultsSection /></div>
      <div className="snap-section"><TestimonialsSection /></div>
      <div className="snap-section"><PricingSection /></div>
      <div className="snap-section"><FaqSection /></div>
      <div className="snap-section"><FinalCtaSection /></div>
      <div className="snap-section-footer"><Footer /></div>
    </main>
  )
}

