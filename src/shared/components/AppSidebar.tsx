import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/application/stores/sidebar-store";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Settings,
  LogIn,
  Menu,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Licitaciones", icon: LayoutDashboard },
  { to: "/login", label: "Ingresar", icon: LogIn },
  { to: "/settings", label: "Configuración", icon: Settings },
];

export function AppSidebar() {
  const { isCollapsed, toggle } = useSidebarStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile: Sheet */}
      <Sheet>
        <SheetTrigger className="md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent currentPath={location.pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop: collapsible sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-end p-2">
          <Button variant="ghost" size="icon" onClick={toggle}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                location.pathname === item.to
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
                isCollapsed && "justify-center px-2",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

function SidebarContent({ currentPath }: { currentPath: string }) {
  return (
    <nav className="space-y-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
            currentPath === item.to
              ? "bg-accent text-accent-foreground font-medium"
              : "text-muted-foreground",
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
