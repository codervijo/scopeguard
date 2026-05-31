import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Boxes,
  Inbox,
  Shield,
  Building2,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Plugin Inventory", url: "/app/inventory", icon: Boxes },
  { title: "Review Queue", url: "/app/review", icon: Inbox, badge: 7 },
  { title: "Policies", url: "/app/policies", icon: Shield },
  { title: "Publishers", url: "/app/publishers", icon: Building2 },
  { title: "Alerts", url: "/app/alerts", icon: Bell, badge: 4 },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <ShieldCheck className="size-4" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">ScopeGuard</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Acme Corp · Prod
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:hidden">
          <div className="size-7 rounded-full bg-gradient-to-br from-primary to-accent" />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium">Alex Chen</span>
            <span className="text-[10px] text-muted-foreground">Security Admin</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
