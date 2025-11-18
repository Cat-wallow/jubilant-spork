import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth.service';

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
