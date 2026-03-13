import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "Does the AI sound human?",
      answer: "Yes. Our conversational AI models are trained specifically on sales dialogs and objection handling. Both SMS and voice agents sound entirely natural, and most leads never realize they aren't speaking to a human rep."
    },
    {
      question: "How long does setup take?",
      answer: "Under 10 minutes. Simply connect your calendar, define the goal of the conversation, and drag-and-drop a CSV file of your old leads."
    },
    {
      question: "Can I upload my CRM leads?",
      answer: "Absolutely. You can import leads via CSV spreadsheet from any CRM, or use our direct integrations with platforms like Salesforce, HubSpot, and GoHighLevel to sync automatically."
    },
    {
      question: "Does it work with cold leads?",
      answer: "It works exceptionally well on 'dead' or unresponsive leads that were generated in the past but never closed. For purely cold list outreach, it can also work, but reactivation generally yields the highest ROI."
    },
    {
      question: "Is it compliant with messaging rules?",
      answer: "Yes. The platform is built to handle Opt-Outs (like responding 'STOP') natively. We recommend ensuring you have prior consent to message the leads you acquired according to local regulations (like TCPA/A2P 10DLC)."
    }
  ]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto max-w-3xl border-t border-border pt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-lg text-foreground hover:text-emerald-500 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed p-4 bg-muted/20 rounded-xl mb-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
