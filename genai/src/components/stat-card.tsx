import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "default" | "warning" | "critical" | "success" | "primary";
}) {
  const toneMap = {
    default: "text-muted-foreground bg-muted",
    warning: "text-warning bg-warning/15",
    critical: "text-critical bg-critical/15",
    success: "text-success bg-success/15",
    primary: "text-primary bg-primary/15",
  };
  return (
    <Card className="flex flex-col gap-2 border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className={cn("flex size-7 items-center justify-center rounded-md", toneMap[tone])}>
          <Icon className="size-3.5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
        {delta && <span className="text-xs text-muted-foreground">{delta}</span>}
      </div>
    </Card>
  );
}
