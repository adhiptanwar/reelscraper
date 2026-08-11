import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — Reelscraper.ai",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar user={user} />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
