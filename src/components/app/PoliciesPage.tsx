import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { policies as initialPolicies } from "@/lib/mock-data";
import { Plus, Shield } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function PoliciesPage() {
  return (
    <AppShell>
      <Policies />
    </AppShell>
  );
}

function Policies() {
  const [list, setList] = useState(initialPolicies);
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Policies</h1>
          <p className="text-sm text-muted-foreground">
            Rules that decide what gets allowed, blocked, or sent to review.
          </p>
        </div>
        <Button size="sm" onClick={() => setShowBuilder((v) => !v)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> New policy
        </Button>
      </div>

      {showBuilder && <PolicyBuilder onClose={() => setShowBuilder(false)} />}

      <Card className="divide-y divide-border border-border bg-card">
        {list.map((p) => (
          <div key={p.id} className="flex items-start gap-4 p-5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Shield className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{p.name}</h3>
                <Switch
                  checked={p.enabled}
                  onCheckedChange={(v) => setList((arr) => arr.map((x) => x.id === p.id ? { ...x, enabled: v } : x))}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <Chip>Action: {p.action}</Chip>
                <Chip>Scope: {p.scope}</Chip>
                <Chip>Matches: {p.matches}</Chip>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface/40 px-2 py-0.5 text-muted-foreground">
      {children}
    </span>
  );
}

function PolicyBuilder({ onClose }: { onClose: () => void }) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">New policy</h2>
        <Button size="sm" variant="ghost" onClick={onClose}>Cancel</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Plugin type">
          <Select options={["All types", "Chrome extension", "Edge extension", "Google OAuth app", "Microsoft OAuth app", "Gmail add-on", "VS Code plugin", "JetBrains plugin"]} />
        </Field>
        <Field label="Permission / scope condition">
          <Select options={["Requests all-site access", "Requests Gmail read/send", "Requests Drive access", "Requests workspace file read", "Requests outbound network"]} />
        </Field>
        <Field label="Publisher condition">
          <Select options={["Any", "Unverified", "Ownership changed in last 30 days", "Suspicious watchlist"]} />
        </Field>
        <Field label="Risk threshold">
          <Select options={["Any", "Medium or higher", "High or higher", "Critical only"]} />
        </Field>
        <Field label="Action">
          <Select options={["Allow", "Block", "Require review", "Allow with conditions", "Monitor"]} />
        </Field>
        <Field label="Notification channel">
          <Select options={["Email · security@acme.com", "Slack · #security-alerts", "PagerDuty · CISO rotation"]} />
        </Field>
        <Field label="Policy name" className="md:col-span-2">
          <Input placeholder="e.g. Block unverified Gmail OAuth requests" className="bg-surface/40" />
        </Field>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Save as draft</Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Activate policy</Button>
      </div>
    </Card>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="h-9 rounded-md border border-border bg-surface/40 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
