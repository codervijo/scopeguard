import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RiskBadge, StatusBadge } from "@/components/risk-badge";
import { PluginDetailPanel } from "@/components/plugin-detail-panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, BadgeCheck, AlertTriangle, Download } from "lucide-react";
import { plugins, type Plugin, type RiskLevel, type PluginStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/app/inventory")({
  head: () => ({ meta: [{ title: "Plugin Inventory · ScopeGuard" }] }),
  component: Inventory,
});

const TYPES = [
  "Chrome extension",
  "Edge extension",
  "Google OAuth app",
  "Microsoft OAuth app",
  "Gmail add-on",
  "VS Code plugin",
  "JetBrains plugin",
];

function Inventory() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [risk, setRisk] = useState<RiskLevel | null>(null);
  const [status, setStatus] = useState<PluginStatus | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sensitiveOnly, setSensitiveOnly] = useState(false);
  const [aiOnly, setAiOnly] = useState(false);
  const [selected, setSelected] = useState<Plugin | null>(null);

  const filtered = useMemo(() => {
    return plugins.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.publisher.toLowerCase().includes(q.toLowerCase())) return false;
      if (type && p.type !== type) return false;
      if (risk && p.riskLevel !== risk) return false;
      if (status && p.status !== status) return false;
      if (verifiedOnly && !p.publisherVerified) return false;
      if (sensitiveOnly && !p.sensitiveScopes) return false;
      if (aiOnly && !p.aiRelated) return false;
      return true;
    });
  }, [q, type, risk, status, verifiedOnly, sensitiveOnly, aiOnly]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Plugin Inventory</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {plugins.length} plugins · Click a row for detail.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="size-4" /> Export
        </Button>
      </div>

      <Card className="border-border bg-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by plugin or publisher…"
              className="h-9 bg-surface/40 pl-8"
            />
          </div>
          <FilterSelect label="Type" value={type} options={TYPES} onChange={setType} />
          <FilterSelect
            label="Risk"
            value={risk}
            options={["low", "medium", "high", "critical"]}
            onChange={(v) => setRisk(v as RiskLevel | null)}
          />
          <FilterSelect
            label="Status"
            value={status}
            options={["Allowed", "Blocked", "Pending Review", "Monitored"]}
            onChange={(v) => setStatus(v as PluginStatus | null)}
          />
          <ToggleChip checked={verifiedOnly} onChange={setVerifiedOnly} label="Verified" />
          <ToggleChip checked={sensitiveOnly} onChange={setSensitiveOnly} label="Sensitive scopes" />
          <ToggleChip checked={aiOnly} onChange={setAiOnly} label="AI-related" />
          {(type || risk || status || verifiedOnly || sensitiveOnly || aiOnly || q) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setQ(""); setType(null); setRisk(null); setStatus(null); setVerifiedOnly(false); setSensitiveOnly(false); setAiOnly(false); }}
            >
              Reset
            </Button>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead className="text-right">Users</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last changed</TableHead>
              <TableHead>Data access</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                onClick={() => setSelected(p)}
                className="cursor-pointer border-border hover:bg-surface/40"
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-[10px] font-semibold text-primary">
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.type}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1">
                    {p.publisher}
                    {p.publisherVerified ? (
                      <BadgeCheck className="size-3.5 text-success" />
                    ) : (
                      <AlertTriangle className="size-3.5 text-warning" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">{p.users}</TableCell>
                <TableCell><RiskBadge level={p.riskLevel} score={p.riskScore} /></TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell className="text-muted-foreground">{p.lastChanged}</TableCell>
                <TableCell className="max-w-[220px] truncate text-muted-foreground">
                  {p.dataAccess.join(", ")}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                  No plugins match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <PluginDetailPanel
        plugin={selected}
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="h-9 appearance-none rounded-md border border-border bg-surface/40 pl-8 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="">{label}: All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {o}
          </option>
        ))}
      </select>
      <Filter className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function ToggleChip({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border bg-surface/40 px-3 text-sm">
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(!!v)} />
      {label}
    </label>
  );
}
