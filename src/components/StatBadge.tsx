import { ReactNode } from "react";

export default function StatBadge({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      title={label}
      className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-muted"
    >
      <span className="text-foreground/70">{icon}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
