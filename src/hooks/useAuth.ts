import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, logout } from 'services/auth.service';
import { ILoginRequest } from 'types/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: ILoginRequest) => login(credentials),
    onSuccess: (data) => {
      // On success, you might want to invalidate user-related queries
      // and redirect to the dashboard.
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/admin/default');
    },
    onError: (error) => {
      // Handle login error, e.g., show a notification
      console.error('Login failed:', error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear user data and redirect to the login page.
      queryClient.setQueryData(['user'], null);
      router.push('/auth/sign-in');
    },
  });
};
