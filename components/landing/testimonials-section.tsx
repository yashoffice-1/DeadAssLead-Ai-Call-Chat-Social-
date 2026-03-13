import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      company: "Apex Real Estate",
      image: "https://i.pravatar.cc/150?u=sarah",
      text: "This AI revived leads we thought were completely dead and generated new meetings within days. Insancely good ROI."
    },
    {
      name: "Mike Robertson",
      company: "SunPower Solar",
      image: "https://i.pravatar.cc/150?u=mike",
      text: "We had 5,000 old leads sitting in HubSpot. DeadAssLead booked 45 appointments in the first week. It's magic."
    },
    {
      name: "David Chen",
      company: "Growth Marketing",
      image: "https://i.pravatar.cc/150?u=david",
      text: "Our clients love this. We export cold lists, drop them into the AI engine, and watch the calendar fill up with demos."
    }
  ]

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Trusted By Sales Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm flex flex-col justify-between animate-card-enter hover:shadow-xl transition-shadow" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-lg text-foreground italic leading-relaxed mb-8 flex-1">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full border-2 border-border object-cover" />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
