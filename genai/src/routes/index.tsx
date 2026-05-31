import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Lock,
  Eye,
  GitBranch,
  Search,
  Gauge,
  CheckCircle2,
  Activity,
  Chrome,
  Mail,
  Code2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScopeGuard — Stop risky AI plugins before they touch company data" },
      {
        name: "description",
        content:
          "ScopeGuard scans browser extensions, OAuth apps, email add-ons, and IDE plugins before installation and enforces policy on permissions, scopes, publisher identity, and version drift.",
      },
      { property: "og:title", content: "ScopeGuard — Pre-install security for AI-era plugins" },
      {
        property: "og:description",
        content:
          "Know which AI tools can read company data before employees install them. Enterprise plugin governance for browsers, OAuth, email, and IDEs.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogoStrip />
      <Problem />
      <Solution />
      <RiskExamples />
      <HowItWorks />
      <FooterCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <ShieldCheck className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">ScopeGuard</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground">Problem</a>
          <a href="#solution" className="hover:text-foreground">Solution</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#" className="hover:text-foreground">Customers</a>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link to="/app">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Request demo
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute left-1/2 top-0 -z-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 opacity-40 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent" />
          New · OAuth scope intelligence for Google Workspace and Microsoft 365
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">
          <span className="text-gradient-primary">Stop risky AI plugins</span>
          <br />
          before they touch company data.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          ScopeGuard scans browser extensions, OAuth apps, email add-ons, and IDE plugins
          before installation, then enforces security policy based on permissions, scopes,
          publisher identity, and version drift.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
            Request demo <ArrowRight className="ml-1 size-4" />
          </Button>
          <Link to="/app">
            <Button size="lg" variant="outline" className="border-border bg-surface/40">
              View dashboard
            </Button>
          </Link>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="rounded-xl border border-border bg-card/80 p-2 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2.5 rounded-full bg-critical/60" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
          <span className="ml-3 text-xs text-muted-foreground">app.scopeguard.com / overview</span>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-4">
          {[
            { l: "Plugins discovered", v: "221", t: "text-foreground" },
            { l: "High-risk", v: "14", t: "text-destructive" },
            { l: "Pending review", v: "7", t: "text-warning" },
            { l: "Blocked installs", v: "19", t: "text-critical" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-border bg-surface/40 p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className={`mt-1 text-2xl font-semibold ${s.t}`}>{s.v}</div>
            </div>
          ))}
          <div className="rounded-lg border border-border bg-surface/40 p-4 md:col-span-3">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium">Risk trend · last 7 days</span>
              <span className="text-muted-foreground">+18% high risk</span>
            </div>
            <div className="flex h-32 items-end gap-2">
              {[18, 22, 30, 38, 46, 52, 64].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface/40 p-4 text-left">
            <div className="mb-2 text-xs font-medium">Top alerts</div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-critical" />Gmail send scope added</li>
              <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-destructive" />All-sites permission added</li>
              <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-warning" />Publisher ownership change</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  const logos = ["Northwind", "Helix Bio", "Ardent Pay", "Stratify", "Quay Labs", "Linden & Co"];
  return (
    <section className="border-b border-border/60 bg-surface/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
          Trusted by security teams at modern enterprises
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-base font-semibold tracking-tight text-muted-foreground/70">
          {logos.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-accent">The problem</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Employees install AI tools faster than security can review them.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every Chrome extension, Gmail add-on, GitHub app, and VS Code plugin can read
              browser tabs, mailboxes, source code, and customer data. Most are installed in
              one click — and most security teams have no inventory, no policy, and no
              visibility into what changed last week.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              { icon: Chrome, t: "47 new browser extensions installed this quarter" },
              { icon: Mail, t: "12 OAuth apps granted Gmail read access without review" },
              { icon: Code2, t: "9 IDE plugins now reading workspace files" },
              { icon: GitBranch, t: "6 extensions silently expanded permissions in 30 days" },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex size-9 items-center justify-center rounded-md bg-destructive/15 text-destructive">
                  <x.icon className="size-4" />
                </div>
                <p className="text-sm text-foreground">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const cards = [
    {
      icon: Lock,
      title: "Pre-install control",
      body: "Every browser extension, OAuth app, and IDE plugin passes through a security gate before it can read company data.",
    },
    {
      icon: Eye,
      title: "OAuth scope intelligence",
      body: "See exactly which Google Workspace and Microsoft 365 scopes an app requests — and which sensitive ones to block by default.",
    },
    {
      icon: Activity,
      title: "Publisher and permission drift monitoring",
      body: "Get alerted when an installed plugin changes ownership, adds a scope, or starts contacting new domains.",
    },
  ];
  return (
    <section id="solution" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-accent">The solution</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            One control plane for every plugin and OAuth grant
          </h2>
          <p className="mt-4 text-muted-foreground">
            ScopeGuard sits between your employees and every plugin marketplace, mailbox, and IDE.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <Card key={c.title} className="border-border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskExamples() {
  const items: { sev: string; cls: string; t: string; s: string }[] = [
    { sev: "Critical", cls: "bg-critical/15 text-critical border-critical/30", t: "Extension requests access to all websites", s: "AI Meeting Summarizer Pro · Chrome" },
    { sev: "Critical", cls: "bg-critical/15 text-critical border-critical/30", t: "OAuth app requests Gmail read access", s: "ChatMail Assistant · Google Workspace" },
    { sev: "High", cls: "bg-destructive/15 text-destructive border-destructive/30", t: "Publisher changed last week", s: "Prompt Saver Plus · Indie Maker LLC" },
    { sev: "High", cls: "bg-destructive/15 text-destructive border-destructive/30", t: "New version added external data sharing", s: "ChatMail Assistant v3.2.0" },
    { sev: "Medium", cls: "bg-warning/15 text-warning border-warning/30", t: "Unverified publisher requesting Drive access", s: "Calendar Copilot · Tempora Labs" },
    { sev: "Medium", cls: "bg-warning/15 text-warning border-warning/30", t: "IDE plugin added workspace file read", s: "CodePilot Helper · VS Code" },
  ];
  return (
    <section className="border-b border-border/60 bg-surface/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-accent">What we catch</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Real signals from real installations
          </h2>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.t} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <span className={`mt-0.5 inline-flex shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${i.cls}`}>
                {i.sev}
              </span>
              <div>
                <p className="text-sm font-medium">{i.t}</p>
                <p className="text-xs text-muted-foreground">{i.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, icon: Search, t: "Discover plugins", b: "Pull inventory from Chrome Enterprise, Edge, Google Workspace, Microsoft 365, GitHub, and IDE marketplaces." },
    { n: 2, icon: Gauge, t: "Score risk", b: "Combine permissions, OAuth scopes, publisher identity, and behavior into a unified risk score." },
    { n: 3, icon: ShieldCheck, t: "Enforce policy", b: "Auto-allow, block, or route to review based on rules your security team controls." },
    { n: 4, icon: Activity, t: "Monitor drift", b: "Continuously watch for new scopes, new domains, and publisher ownership changes." },
  ];
  return (
    <section id="how" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-accent">How it works</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            From discovery to enforcement in one workflow
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {s.n}
                </span>
                Step {s.n}
              </div>
              <s.icon className="mt-4 size-5 text-primary" />
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute left-1/2 top-1/2 -z-0 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Building2 className="mx-auto size-10 text-primary" />
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Know which AI tools can read your company data — before employees install them.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Book a 30-minute walkthrough with a ScopeGuard security engineer.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
            Request demo <ArrowRight className="ml-1 size-4" />
          </Button>
          <Link to="/app">
            <Button size="lg" variant="outline" className="border-border bg-surface/40">
              View live dashboard
            </Button>
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> SOC 2 Type II</li>
          <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Read-only deployment</li>
          <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> 14-day pilot</li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-primary" />
          © 2026 ScopeGuard, Inc.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Trust center</a>
        </div>
      </div>
    </footer>
  );
}
