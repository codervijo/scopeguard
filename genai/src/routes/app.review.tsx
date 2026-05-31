import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import { reviewRequests } from "@/lib/mock-data";
import { Check, Ban, MessageCircle, Inbox } from "lucide-react";

export const Route = createFileRoute("/app/review")({
  head: () => ({ meta: [{ title: "Review Queue · ScopeGuard" }] }),
  component: ReviewQueue,
});

function ReviewQueue() {
  const items = reviewRequests;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Review Queue</h1>
        <p className="text-sm text-muted-foreground">
          {items.length} pending install requests waiting on a security decision.
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="border-border bg-card p-12 text-center">
          <Inbox className="mx-auto size-10 text-muted-foreground" />
          <h2 className="mt-3 font-semibold">Queue is clear</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No install requests are waiting. New requests appear here in real time.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {items.map((r) => (
            <Card key={r.id} className="border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-primary/40 to-accent/30" />
                  <div>
                    <div className="font-medium">{r.employee}</div>
                    <div className="text-xs text-muted-foreground">{r.email} · {r.requestedAt}</div>
                  </div>
                </div>
                <RiskBadge level={r.riskLevel} score={r.riskScore} />
              </div>

              <div className="mt-4 rounded-md border border-border bg-surface/40 p-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Plugin</div>
                <div className="mt-1 font-medium">{r.plugin}</div>
                <div className="text-xs text-muted-foreground">{r.pluginType}</div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Data access</div>
                  <div className="mt-1 text-sm">{r.dataAccess.join(", ")}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Recommendation</div>
                  <div className="mt-1 text-sm font-medium">{r.recommendation}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Justification</div>
                <p className="mt-1 text-sm italic text-foreground/90">"{r.justification}"</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                  <Check className="size-3.5" /> Approve
                </Button>
                <Button size="sm" variant="destructive">
                  <Ban className="size-3.5" /> Block
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="size-3.5" /> Ask for more info
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
