import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ConnectionHub } from "@/components/landing/connection-hub"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ProductDemoSection } from "@/components/landing/product-demo-section"
import { IndustriesSection } from "@/components/landing/industries-section"
import { ResultsSection } from "@/components/landing/results-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCtaSection } from "@/components/landing/final-cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background" suppressHydrationWarning>
      <Navbar />
      <HeroSection />
      <ConnectionHub />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ProductDemoSection />
      <IndustriesSection />
      <ResultsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
