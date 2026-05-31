import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Users, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function AlertsPage() {
  return (
    <AppShell>
      <Alerts />
    </AppShell>
  );
}

function Alerts() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
        <p className="text-sm text-muted-foreground">
          {alerts.length} active alerts across install attempts, scopes, permissions, and publishers.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <Card key={a.id} className="border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-md ${
                a.severity === "critical" ? "bg-critical/15 text-critical"
                : a.severity === "high" ? "bg-destructive/15 text-destructive"
                : "bg-warning/15 text-warning"
              }`}>
                <AlertTriangle className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{a.title}</h3>
                  <RiskBadge level={a.severity} />
                  <span className="rounded-md border border-border bg-surface/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {a.type}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {a.timestamp}</span>
                  <span className="inline-flex items-center gap-1"><Users className="size-3" /> {a.users} affected user{a.users !== 1 ? "s" : ""}</span>
                  <span>Plugin: <span className="text-foreground">{a.plugin}</span></span>
                </div>
                <p className="mt-3 rounded-md border border-border bg-surface/40 p-2.5 text-sm">
                  <span className="text-muted-foreground">Recommended action — </span>
                  {a.recommendation}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Investigate</Button>
                <Button size="sm" variant="ghost">Dismiss</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
