"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, Eye, EyeOff, Zap, Check } from "lucide-react"

const plans = [
    { id: "free", label: "Free", desc: "0–100 contacts" },
    { id: "pro", label: "Pro — $299/mo", desc: "100–1,000 contacts" },
    { id: "business", label: "Business — $599/mo", desc: "1,000–5,000 contacts" },
]

export default function SignupPage() {
    const router = useRouter()
    const [step, setStep] = useState<1 | 2>(1)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState("free")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleStepOne = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setError("Please fill in all fields.")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }
        setError("")
        setStep(2)
    }

    const handleStepTwo = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="flex min-h-screen">
            {/* Left panel — branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-foreground p-12 lg:flex">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                        <Zap className="size-4 text-foreground" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-background">
                        DeadAssLead
                    </span>
                </div>

                <div>
                    <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-background">
                        Deploy Your
                        <br />
                        AI Instance Today.
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-background/60">
                        Get started in under 2 minutes. Connect your social platforms,
                        configure AI voice calling, and start automating your pipeline.
                    </p>
                    <div className="mt-8 space-y-3">
                        {[
                            "Private VPS deployment",
                            "100% secure DMs & calls",
                            "AI-powered voice calling",
                            "Instagram, TikTok & Facebook",
                        ].map((feat) => (
                            <div key={feat} className="flex items-center gap-2.5">
                                <div className="flex size-5 items-center justify-center rounded-full bg-background/10">
                                    <Check className="size-3 text-background" />
                                </div>
                                <span className="text-sm text-background/70">{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-background/40">
                    © {new Date().getFullYear()} DeadAssLead. All rights reserved.
                </p>
            </div>

            {/* Right panel — signup form */}
            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
                {/* Mobile logo */}
                <div className="mb-10 flex items-center gap-2.5 lg:hidden">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-foreground">
                        <Zap className="size-4 text-background" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-foreground">
                        DeadAssLead
                    </span>
                </div>

                <div className="w-full max-w-sm">
                    {/* Step indicator */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold ${step >= 1
                                        ? "bg-foreground text-background"
                                        : "border border-border text-muted-foreground"
                                    }`}
                            >
                                {step > 1 ? <Check className="size-3.5" /> : "1"}
                            </div>
                            <span className="text-xs font-medium text-foreground">
                                Account
                            </span>
                        </div>
                        <div className="h-px flex-1 bg-border" />
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold ${step >= 2
                                        ? "bg-foreground text-background"
                                        : "border border-border text-muted-foreground"
                                    }`}
                            >
                                2
                            </div>
                            <span
                                className={`text-xs font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"
                                    }`}
                            >
                                Plan
                            </span>
                        </div>
                    </div>

                    {step === 1 && (
                        <>
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                                Create your account
                            </h1>
                            <p className="mb-8 text-sm text-muted-foreground">
                                Start with a free plan — no credit card required
                            </p>

                            {error && (
                                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleStepOne} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="signup-name"
                                        className="mb-1.5 block text-sm font-medium text-foreground"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="signup-email"
                                        className="mb-1.5 block text-sm font-medium text-foreground"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        required
                                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="signup-password"
                                        className="mb-1.5 block text-sm font-medium text-foreground"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min. 6 characters"
                                            required
                                            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                                >
                                    Continue
                                    <ArrowRight className="size-4" />
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-xs text-muted-foreground">or</span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            {/* Social signup */}
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent active:scale-[0.98]">
                                <svg className="size-4" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="mt-8 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                                Choose your plan
                            </h1>
                            <p className="mb-8 text-sm text-muted-foreground">
                                Start free and scale when you&apos;re ready. You can change
                                plans anytime.
                            </p>

                            <form onSubmit={handleStepTwo} className="space-y-4">
                                <div className="space-y-3">
                                    {plans.map((plan) => (
                                        <button
                                            key={plan.id}
                                            type="button"
                                            onClick={() => setSelectedPlan(plan.id)}
                                            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${selectedPlan === plan.id
                                                    ? "border-foreground bg-accent/50 shadow-sm"
                                                    : "border-border hover:border-foreground/30"
                                                }`}
                                        >
                                            <div
                                                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selectedPlan === plan.id
                                                        ? "border-foreground bg-foreground"
                                                        : "border-border"
                                                    }`}
                                            >
                                                {selectedPlan === plan.id && (
                                                    <Check className="size-3 text-background" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {plan.label}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {plan.desc}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent active:scale-[0.98]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                Deploying...
                                            </>
                                        ) : (
                                            <>
                                                Get Started
                                                <ArrowRight className="size-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
