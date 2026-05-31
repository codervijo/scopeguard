import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiskBadge, StatusBadge } from "@/components/risk-badge";
import type { Plugin } from "@/lib/mock-data";
import {
  Check,
  Ban,
  ShieldAlert,
  Send,
  Globe,
  Users,
  Building2,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

export function PluginDetailPanel({
  plugin,
  open,
  onOpenChange,
}: {
  plugin: Plugin | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto bg-card p-0 sm:max-w-xl">
        {plugin && (
          <>
            <SheetHeader className="border-b border-border p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 text-primary ring-1 ring-primary/30">
                  <span className="text-sm font-semibold">
                    {plugin.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <SheetTitle className="truncate">{plugin.name}</SheetTitle>
                  <SheetDescription className="flex items-center gap-2 truncate">
                    <Building2 className="size-3" />
                    {plugin.publisher}
                    {plugin.publisherVerified ? (
                      <BadgeCheck className="size-3.5 text-success" />
                    ) : (
                      <AlertTriangle className="size-3.5 text-warning" />
                    )}
                    <span>·</span>
                    <span>{plugin.type}</span>
                  </SheetDescription>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <RiskBadge level={plugin.riskLevel} score={plugin.riskScore} />
                    <StatusBadge status={plugin.status} />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                  <Check className="size-3.5" /> Allow
                </Button>
                <Button size="sm" variant="destructive">
                  <Ban className="size-3.5" /> Block
                </Button>
                <Button size="sm" variant="outline">
                  <ShieldAlert className="size-3.5" /> Allow with conditions
                </Button>
                <Button size="sm" variant="ghost">
                  <Send className="size-3.5" /> Send to legal/security
                </Button>
              </div>
            </SheetHeader>

            <div className="space-y-6 p-6">
              <Section title="Risk explanation">
                <p className="rounded-md border border-border bg-surface/50 p-3 text-sm text-foreground">
                  {plugin.description}
                </p>
              </Section>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Install count" value={plugin.users.toString()} icon={<Users className="size-3" />} />
                <Stat label="Versions" value={plugin.versions.length.toString()} />
                <Stat label="Domains" value={plugin.domains.length.toString()} icon={<Globe className="size-3" />} />
              </div>

              <Section title="Requested permissions">
                <ul className="space-y-1.5">
                  {plugin.permissions.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 rounded-full bg-destructive" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>

              {plugin.scopes.length > 0 && (
                <Section title="OAuth scopes">
                  <div className="flex flex-wrap gap-1.5">
                    {plugin.scopes.map((s) => (
                      <code
                        key={s}
                        className="rounded-md border border-border bg-surface/50 px-2 py-0.5 font-mono text-xs text-foreground"
                      >
                        {s}
                      </code>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Permission drift timeline">
                <ol className="relative space-y-3 border-l border-border pl-4">
                  {plugin.drift.length === 0 && (
                    <li className="text-sm text-muted-foreground">No drift detected.</li>
                  )}
                  {plugin.drift.map((d, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[21px] top-1 size-3 rounded-full border-2 border-background bg-destructive" />
                      <div className="text-sm">{d.event}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <RiskBadge level={d.severity} />
                        <span>{d.date}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section title="Version history">
                <ul className="divide-y divide-border rounded-md border border-border">
                  {plugin.versions.map((v) => (
                    <li key={v.version} className="flex items-start justify-between gap-3 p-3 text-sm">
                      <div>
                        <div className="font-mono text-xs text-muted-foreground">{v.version}</div>
                        <div className="mt-0.5">{v.note}</div>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{v.date}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Known domains contacted">
                <div className="flex flex-wrap gap-1.5">
                  {plugin.domains.map((d) => (
                    <code
                      key={d}
                      className="rounded-md border border-border bg-surface/50 px-2 py-0.5 font-mono text-xs"
                    >
                      {d}
                    </code>
                  ))}
                </div>
              </Section>

              <Separator />

              <Section title="Recommended action">
                <p className="rounded-md border border-warning/30 bg-warning/10 p-3 text-sm">
                  {plugin.riskLevel === "critical"
                    ? "Block install enterprise-wide and notify affected users."
                    : plugin.riskLevel === "high"
                      ? "Move to review queue. Require business justification before approval."
                      : "Continue monitoring. Re-evaluate on next version."}
                </p>
              </Section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface/50 p-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}
