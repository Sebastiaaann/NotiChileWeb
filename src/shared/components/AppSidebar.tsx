import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/application/stores/sidebar-store";
import { useAuthStore } from "@/application/stores/auth-store";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Settings,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Licitaciones", icon: LayoutDashboard },
  { to: "/settings", label: "Configuración", icon: Settings },
];

export function AppSidebar() {
  const { isCollapsed, toggle } = useSidebarStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, clearSession } = useAuthStore();

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile: Sheet */}
      <Sheet>
        <SheetTrigger className="md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileSidebarContent
            currentPath={location.pathname}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
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

        {/* Cerrar sesión al fondo */}
        {isAuthenticated && !isCollapsed && (
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground mb-2 truncate">
              {user?.email}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        )}
        {isAuthenticated && isCollapsed && (
          <div className="border-t p-2 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}

function MobileSidebarContent({
  currentPath,
  isAuthenticated,
  user,
  onLogout,
}: {
  currentPath: string;
  isAuthenticated: boolean;
  user: { email?: string | null; nombre?: string | null } | null;
  onLogout: () => void;
}) {
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
      {isAuthenticated && (
        <>
          <div className="border-t pt-4 mt-4">
            <p className="text-xs text-muted-foreground mb-2">{user?.email}</p>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-destructive w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
