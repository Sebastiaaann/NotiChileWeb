import { useLocation, useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "@/application/hooks/use-auth";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { ROUTES } from "@/shared/lib";

export function AuthContainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = async (data: { email: string; password: string }) => {
    await loginMutation.mutateAsync(data);
    navigate(ROUTES.HOME);
  };

  const handleRegister = async (data: {
    nombre: string;
    email: string;
    password: string;
  }) => {
    await registerMutation.mutateAsync(data);
    navigate(ROUTES.HOME);
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      {isLogin ? (
        <LoginForm
          onSubmit={handleLogin}
          isPending={loginMutation.isPending}
          error={loginMutation.error}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          isPending={registerMutation.isPending}
          error={registerMutation.error}
        />
      )}
    </main>
  );
}
