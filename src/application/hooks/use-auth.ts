import { useMutation, useQuery } from "@tanstack/react-query";
import { authRepo } from "@/infrastructure/auth/auth-client";
import { useAuthStore } from "@/application/stores/auth-store";
import type { LoginRequest, RegisterRequest } from "@/core/entities";

export function useSession() {
  const { user, isAuthenticated, setSession, clearSession } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const u = await authRepo.getSession();
      if (u) {
        setSession(u, "");
      } else {
        clearSession();
      }
      return u;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return { user, isAuthenticated, isLoading };
}

export function useLogin() {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => authRepo.login(data),
    onSuccess: (res) => {
      setSession(res.user, res.token);
    },
  });
}

export function useRegister() {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authRepo.register(data),
    onSuccess: (res) => {
      setSession(res.user, res.token);
    },
  });
}

export function useLogout() {
  const { clearSession } = useAuthStore();

  return useMutation({
    mutationFn: () => authRepo.logout(),
    onSuccess: () => clearSession(),
  });
}
