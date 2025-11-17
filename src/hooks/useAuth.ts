import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, logout } from 'services/auth.service';
import { ILoginRequest } from 'types/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: ILoginRequest) => {
      // Clear any stale session data before login attempt
      queryClient.setQueryData(['session'], null);
      return login(credentials);
    },
    onSuccess: (data) => {
      // Set the session data directly to prevent race conditions
      queryClient.setQueryData(['session'], data);
      // On success, invalidate user-related queries and redirect to dashboard
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/admin/default');
    },
    onError: (error) => {
      // Clear session data on login error to prevent loops
      queryClient.setQueryData(['session'], null);
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
      // Clear all cached data and redirect to the login page.
      queryClient.clear();
      queryClient.setQueryData(['session'], null);
      queryClient.setQueryData(['user'], null);
      router.push('/auth/sign-in');
    },
    onError: () => {
      // Even if logout fails, clear local state
      queryClient.clear();
      queryClient.setQueryData(['session'], null);
      queryClient.setQueryData(['user'], null);
      router.push('/auth/sign-in');
    },
  });
};
