import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/mock-data";

const styles: Record<RiskLevel, string> = {
  low: "bg-success/15 text-success border-success/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  high: "bg-destructive/15 text-destructive border-destructive/30",
  critical: "bg-critical/20 text-critical border-critical/40",
};

const labels: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function RiskBadge({
  level,
  score,
  className,
}: {
  level: RiskLevel;
  score?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight",
        styles[level],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {labels[level]}
      {score !== undefined && <span className="text-foreground/70 font-mono">{score}</span>}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Allowed: "bg-success/15 text-success border-success/30",
    Blocked: "bg-critical/20 text-critical border-critical/40",
    "Pending Review": "bg-warning/15 text-warning border-warning/30",
    Monitored: "bg-primary/15 text-primary border-primary/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        map[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {status}
    </span>
  );
}
