import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/application/hooks/use-auth";
import { ROUTES } from "@/shared/lib";

export function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse h-8 w-8 rounded-full bg-gray-200" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export function ReverseAuthGuard() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse h-8 w-8 rounded-full bg-gray-200" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
