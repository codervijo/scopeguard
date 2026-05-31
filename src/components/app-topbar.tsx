import { Bell, Search, ChevronsUpDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="hidden items-center gap-2 rounded-md border border-border bg-surface/60 px-2 py-1 text-xs md:flex">
        <span className="text-muted-foreground">Workspace</span>
        <span className="font-medium">Acme Corp</span>
        <ChevronsUpDown className="size-3 text-muted-foreground" />
      </div>
      <div className="relative ml-2 flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search plugins, publishers, scopes…"
          className="h-9 bg-surface/60 pl-8 text-sm"
        />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-critical" />
        </Button>
        <div className="ml-1 size-8 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-background" />
      </div>
    </header>
  );
}
