"use client";

import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { LogOutIcon } from "@/components/icons";

export default function UserProfile({ user }: { user: User }) {
  const router = useRouter();

  const fullName = (user.user_metadata?.full_name as string | undefined)?.trim();
  const displayName = fullName || user.email?.split("@")[0] || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-2 to-accent text-sm font-semibold text-white">
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
        <p className="truncate text-xs text-muted">{user.email}</p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
        className="shrink-0 rounded-md p-1.5 text-muted transition hover:bg-white/10 hover:text-foreground"
      >
        <LogOutIcon />
      </button>
    </div>
  );
}
