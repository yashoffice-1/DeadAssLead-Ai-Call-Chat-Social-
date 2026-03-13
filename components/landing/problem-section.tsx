import { UserX, Clock, CircleDollarSign } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: UserX,
      title: "Leads never contacted again",
      description: "Once marked as unqualified or unreachable, they sit dormant forever."
    },
    {
      icon: Clock,
      title: "Sales teams too busy",
      description: "Reps focus on the newest, hottest leads and have no time for old ones."
    },
    {
      icon: CircleDollarSign,
      title: "Lost revenue sitting in CRM",
      description: "Thousands of dollars in potential commission are wasted every month."
    }
  ]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Your CRM Is Full of Missed Opportunities
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Most businesses generate thousands of leads that are never followed up properly. Sales teams move on to new leads while old ones are forgotten.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {problems.map((problem) => (
              <div key={problem.title} className="flex flex-col bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-colors animate-card-enter group overflow-hidden relative">
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-foreground">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                    <problem.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <h3 className="text-foreground font-semibold mb-2">{problem.title}</h3>
                  <p className="flex-auto">{problem.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
