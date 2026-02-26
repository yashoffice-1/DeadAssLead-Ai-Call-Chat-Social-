export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <span className="font-medium text-foreground">DeadAssLead</span>
        <span>Your Private AI Social {"&"} Call Center</span>
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  )
}
