"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "@/components/icons";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.push("/dashboard");
    }
  }, [isAuthLoading, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        // A full navigation guarantees the server sees the freshly-set
        // session cookie immediately — router.push()+router.refresh() here
        // race the client transition against the cookie write.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/dashboard";
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = "/dashboard";
        } else {
          setInfoMessage("Check your email to confirm your account, then log in.");
          setMode("login");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-2 to-accent">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-base font-bold tracking-tight">
          Reelscraper<span className="text-accent-2">.ai</span>
        </span>
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-6 glow-border">
        <h1 className="text-xl font-bold">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {mode === "login"
            ? "Sign in to continue to your dashboard"
            : "Join us and start scraping reels"}
        </p>

        <div className="mt-5 flex rounded-full border border-white/10 bg-surface-2 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-1.5 font-medium transition ${
              mode === "login" ? "bg-white text-black" : "text-muted hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-1.5 font-medium transition ${
              mode === "signup" ? "bg-white text-black" : "text-muted hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-xs font-medium text-muted">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm placeholder:text-muted focus:border-accent/60 focus:outline-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm placeholder:text-muted focus:border-accent/60 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-muted">
              Password
            </label>
            <div className="flex items-center rounded-lg border border-white/10 bg-black/40 px-3.5 focus-within:border-accent/60">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent py-2.5 text-sm placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-muted transition hover:text-foreground"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-medium text-muted">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm placeholder:text-muted focus:border-accent/60 focus:outline-none"
              />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          {infoMessage && (
            <div className="rounded-lg border border-accent/20 bg-accent-soft px-3 py-2 text-xs text-accent-2">
              {infoMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Please wait…"
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
            {!isLoading && <ArrowRightIcon />}
          </button>
        </form>
      </div>
    </div>
  );
}
