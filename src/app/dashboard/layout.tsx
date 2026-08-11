import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard — Reelscraper.ai",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
