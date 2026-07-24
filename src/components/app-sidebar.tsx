import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  ShoppingBag,
  MessageSquare,
  Map,
  DollarSign,
  Gauge,
  BookOpen,
  Rocket,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Skill Match", url: "/skill-match", icon: Sparkles },
  { title: "Proposal Generator", url: "/proposal", icon: FileText },
  { title: "Fiverr Gig Generator", url: "/gig", icon: ShoppingBag },
  { title: "Client Reply Assistant", url: "/reply", icon: MessageSquare },
  { title: "Learning Roadmap", url: "/roadmap", icon: Map },
  { title: "Pricing Assistant", url: "/pricing", icon: DollarSign },
  { title: "Readiness Score", url: "/readiness", icon: Gauge },
  { title: "Resources", url: "/resources", icon: BookOpen },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-bold">FreelanceLaunch</span>
            <span className="truncate text-[10px] text-muted-foreground">AI Mentor</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-gradient-primary p-3 text-primary-foreground shadow-soft">
          <p className="text-xs font-semibold">Pro Tip</p>
          <p className="mt-1 text-[11px] opacity-90">
            Complete your Readiness Score to unlock personalized insights.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
