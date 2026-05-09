import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      authStorage.setAccessToken(response.data.token);
      queryClient.setQueryData(["user"], response.data.user);
      router.push("/profile");
    },
  });

  const useMe = () => 
    useQuery({
      queryKey: ["user"],
      queryFn: authService.me,
      enabled: !!authStorage.getAccessToken(),
      select: (response) => response.data,
    });

  const logout = () => {
    authStorage.clear();
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/login");
  };

  return {
    register: registerMutation,
    login: loginMutation,
    useMe,
    logout,
  };
};
