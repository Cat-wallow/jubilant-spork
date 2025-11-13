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
      // On success, invalidate user-related queries and redirect to dashboard
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/admin/default');
    },
    onError: (error) => {
      // Error is exposed through mutation.error in the component
      // This allows the form to handle API errors with react-hook-form
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
