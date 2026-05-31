import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  AlertTriangle,
  Inbox,
  Ban,
  Key,
  Activity,
  ArrowRight,
  Chrome,
  Mail,
  Code2,
  Building2,
  Github,
  CircleDot,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { RiskBadge } from "@/components/risk-badge";
import { plugins, alerts, riskTrend, coverage, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview · ScopeGuard" }] }),
  component: Overview,
});

function Overview() {
  const topRisky = [...plugins].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const max = Math.max(...riskTrend.map((d) => d.low + d.medium + d.high + d.critical));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">
            Plugin risk posture across browsers, OAuth, email, and IDEs.
          </p>
        </div>
        <Button variant="outline" size="sm">
          Last 7 days
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total plugins" value={stats.total} icon={Boxes} delta="+12 wk" />
        <StatCard label="High risk" value={stats.highRisk} icon={AlertTriangle} tone="critical" delta="+3 wk" />
        <StatCard label="Pending reviews" value={stats.pending} icon={Inbox} tone="warning" />
        <StatCard label="Blocked installs" value={stats.blocked} icon={Ban} tone="critical" />
        <StatCard label="Sensitive OAuth scopes" value={stats.sensitiveOAuth} icon={Key} tone="primary" />
        <StatCard label="Permission drift" value={stats.drifted} icon={Activity} tone="warning" />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Risk trend</h2>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Legend color="bg-success" label="Low" />
              <Legend color="bg-warning" label="Medium" />
              <Legend color="bg-destructive" label="High" />
              <Legend color="bg-critical" label="Critical" />
            </div>
          </div>
          <div className="mt-6 flex h-48 items-end gap-3">
            {riskTrend.map((d) => {
              const total = d.low + d.medium + d.high + d.critical;
              const h = (total / max) * 100;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full flex-col-reverse overflow-hidden rounded-md bg-muted/40" style={{ height: `${h}%` }}>
                    <div className="bg-success" style={{ height: `${(d.low / total) * 100}%` }} />
                    <div className="bg-warning" style={{ height: `${(d.medium / total) * 100}%` }} />
                    <div className="bg-destructive" style={{ height: `${(d.high / total) * 100}%` }} />
                    <div className="bg-critical" style={{ height: `${(d.critical / total) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Top risky plugins</h2>
            <Link to="/app/inventory" className="text-xs text-primary hover:underline">
              View all <ArrowRight className="ml-1 inline size-3" />
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {topRisky.map((p) => (
              <li key={p.id} className="flex items-center gap-3 rounded-md border border-border bg-surface/40 p-2.5">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-xs font-semibold text-primary">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.publisher}</p>
                </div>
                <RiskBadge level={p.riskLevel} score={p.riskScore} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent install attempts</h2>
            <Link to="/app/review" className="text-xs text-primary hover:underline">
              Review queue <ArrowRight className="ml-1 inline size-3" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {[
              { who: "Maya Okafor", what: "ChatMail Assistant", time: "2h", level: "critical" as const },
              { who: "Daniel Reyes", what: "Prompt Saver Plus", time: "5h", level: "high" as const },
              { who: "Ingrid Sato", what: "AI Meeting Summarizer Pro", time: "1d", level: "high" as const },
              { who: "Owen Bennett", what: "CodePilot Helper", time: "2d", level: "medium" as const },
            ].map((r) => (
              <li key={r.who} className="flex items-center gap-3 py-3 text-sm">
                <div className="size-7 rounded-full bg-gradient-to-br from-primary/40 to-accent/30" />
                <div className="flex-1">
                  <span className="font-medium">{r.who}</span>{" "}
                  <span className="text-muted-foreground">requested install of</span>{" "}
                  <span className="font-medium">{r.what}</span>
                </div>
                <RiskBadge level={r.level} />
                <span className="w-10 text-right text-xs text-muted-foreground">{r.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border bg-card p-5">
          <h2 className="font-semibold">Permission drift alerts</h2>
          <ul className="mt-4 space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-2 text-sm">
                <AlertTriangle className={`mt-0.5 size-3.5 shrink-0 ${a.severity === "critical" ? "text-critical" : a.severity === "high" ? "text-destructive" : "text-warning"}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border bg-card p-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Coverage status</h2>
            <Link to="/app/settings" className="text-xs text-primary hover:underline">
              Manage integrations
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((c) => {
              const Icon = iconFor(c.name);
              return (
                <div key={c.name} className="flex items-center gap-3 rounded-md border border-border bg-surface/40 p-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.connected ? `${c.devices.toLocaleString()} devices` : "Not connected"}
                    </div>
                  </div>
                  <CircleDot className={`size-4 ${c.connected ? "text-success" : "text-muted-foreground"}`} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-2 rounded-sm ${color}`} />
      {label}
    </span>
  );
}

function iconFor(name: string) {
  if (name.includes("Chrome")) return Chrome;
  if (name.includes("Edge")) return Chrome;
  if (name.includes("Google")) return Mail;
  if (name.includes("Microsoft")) return Mail;
  if (name.includes("GitHub")) return Github;
  if (name.includes("VS Code")) return Code2;
  return Building2;
}
