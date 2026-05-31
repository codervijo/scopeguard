import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { coverage } from "@/lib/mock-data";
import { Chrome, Mail, Github, Code2, Building2, Plus, Copy } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · ScopeGuard" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Workspace configuration, integrations, and policies.</p>
      </div>

      <SectionCard title="Integrations" description="Connect identity providers and marketplaces to keep inventory current.">
        <div className="grid gap-3 md:grid-cols-2">
          {coverage.map((c) => {
            const Icon = c.name.includes("GitHub") ? Github : c.name.includes("VS Code") ? Code2 : c.name.includes("Chrome") || c.name.includes("Edge") ? Chrome : c.name.includes("Google") || c.name.includes("Microsoft") ? Mail : Building2;
            return (
              <div key={c.name} className="flex items-center gap-3 rounded-md border border-border bg-surface/40 p-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.connected ? `${c.devices.toLocaleString()} devices synced` : "Not connected"}</div>
                </div>
                <Button size="sm" variant={c.connected ? "outline" : "default"} className={c.connected ? "" : "bg-primary text-primary-foreground hover:bg-primary/90"}>
                  {c.connected ? "Manage" : "Connect"}
                </Button>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Notification settings" description="Where ScopeGuard alerts get routed.">
        <div className="space-y-3">
          {[
            { label: "Critical risk alerts", channel: "PagerDuty · CISO rotation", on: true },
            { label: "Permission drift", channel: "Slack · #security-alerts", on: true },
            { label: "Weekly inventory digest", channel: "Email · security@acme.com", on: true },
            { label: "New publisher onboarded", channel: "Slack · #security-alerts", on: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between rounded-md border border-border bg-surface/40 p-3">
              <div>
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.channel}</div>
              </div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="User management" description="Workspace members and roles.">
        <div className="divide-y divide-border rounded-md border border-border">
          {[
            { name: "Alex Chen", email: "alex.c@acme.com", role: "Security Admin" },
            { name: "Priya Nair", email: "priya.n@acme.com", role: "CISO" },
            { name: "Tom Halberg", email: "tom.h@acme.com", role: "IT Reviewer" },
            { name: "Jules Park", email: "jules.p@acme.com", role: "Analyst (read-only)" },
          ].map((u) => (
            <div key={u.email} className="flex items-center gap-3 p-3">
              <div className="size-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/30" />
              <div className="flex-1">
                <div className="text-sm font-medium">{u.name}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
              </div>
              <span className="text-xs text-muted-foreground">{u.role}</span>
            </div>
          ))}
        </div>
        <Button size="sm" variant="outline" className="mt-3">
          <Plus className="size-4" /> Invite member
        </Button>
      </SectionCard>

      <SectionCard title="Risk scoring preferences" description="Tune how ScopeGuard weights signals.">
        <div className="grid gap-5 md:grid-cols-2">
          <SliderRow label="Sensitive OAuth scopes" defaultValue={80} />
          <SliderRow label="All-sites browser permissions" defaultValue={75} />
          <SliderRow label="Publisher ownership changes" defaultValue={90} />
          <SliderRow label="New outbound domains" defaultValue={55} />
        </div>
      </SectionCard>

      <SectionCard title="API keys" description="Programmatic access for SIEM and SOAR integrations.">
        <div className="space-y-2 rounded-md border border-border bg-surface/40 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Production · Splunk integration</span>
            <Button size="sm" variant="ghost"><Copy className="size-3.5" /> Copy</Button>
          </div>
          <Input readOnly value="pgk_live_••••••••••••••••••••3f8a" className="bg-background/50 font-mono text-xs" />
        </div>
        <Button size="sm" variant="outline" className="mt-3">
          <Plus className="size-4" /> Generate key
        </Button>
      </SectionCard>
    </div>
  );
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </Card>
  );
}

function SliderRow({ label, defaultValue }: { label: string; defaultValue: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{defaultValue}</span>
      </div>
      <Slider defaultValue={[defaultValue]} max={100} step={5} />
    </div>
  );
}
