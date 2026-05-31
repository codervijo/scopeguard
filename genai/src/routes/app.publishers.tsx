import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { RiskBadge } from "@/components/risk-badge";
import { publishers } from "@/lib/mock-data";
import { BadgeCheck, AlertTriangle, Building2, ShieldAlert } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/app/publishers")({
  head: () => ({ meta: [{ title: "Publishers · ScopeGuard" }] }),
  component: Publishers,
});

function Publishers() {
  const suspicious = publishers.filter((p) => p.trust === "Suspicious");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Publishers</h1>
        <p className="text-sm text-muted-foreground">
          Reputation and ownership history for every plugin publisher in your environment.
        </p>
      </div>

      {suspicious.length > 0 && (
        <div className="grid gap-3 md:grid-cols-3">
          {suspicious.map((p) => (
            <Card key={p.id} className="border-critical/40 bg-critical/5 p-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-4 text-critical" />
                <span className="text-xs font-semibold uppercase tracking-wider text-critical">
                  Suspicious publisher
                </span>
              </div>
              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.plugins} plugin{p.plugins > 1 ? "s" : ""} · {p.ownershipChanges} ownership change{p.ownershipChanges !== 1 ? "s" : ""} · Updated {p.lastUpdate}
              </p>
              <div className="mt-3">
                <RiskBadge level={p.riskHistory} />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="overflow-hidden border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Publisher</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Plugins</TableHead>
              <TableHead>Risk history</TableHead>
              <TableHead className="text-right">Ownership changes</TableHead>
              <TableHead>Last update</TableHead>
              <TableHead>Trust</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers.map((p) => (
              <TableRow key={p.id} className="border-border hover:bg-surface/40">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Building2 className="size-3.5" />
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {p.verified ? (
                    <span className="inline-flex items-center gap-1 text-sm text-success">
                      <BadgeCheck className="size-4" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-warning">
                      <AlertTriangle className="size-4" /> Unverified
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">{p.plugins}</TableCell>
                <TableCell><RiskBadge level={p.riskHistory} /></TableCell>
                <TableCell className="text-right tabular-nums">{p.ownershipChanges}</TableCell>
                <TableCell className="text-muted-foreground">{p.lastUpdate}</TableCell>
                <TableCell>
                  <TrustBadge trust={p.trust} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function TrustBadge({ trust }: { trust: string }) {
  const map: Record<string, string> = {
    Trusted: "bg-success/15 text-success border-success/30",
    Watchlist: "bg-warning/15 text-warning border-warning/30",
    Unknown: "bg-muted text-muted-foreground border-border",
    Suspicious: "bg-critical/20 text-critical border-critical/40",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${map[trust]}`}>
      {trust}
    </span>
  );
}
