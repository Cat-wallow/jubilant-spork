import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  getMyInvitations,
  acceptInvitation,
  rejectInvitation,
  verifyInvitationToken,
} from 'services/invitation.service';
import { ListInvitationsParams } from 'types/invitation';

/**
 * React Query Hooks for Invitation Management
 */

/**
 * Hook to get user's invitations
 */
export const useInvitations = (params?: ListInvitationsParams) => {
  return useQuery({
    queryKey: ['invitations', params],
    queryFn: () => getMyInvitations(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook to accept invitation
 */
export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (invitationId: string) => acceptInvitation(invitationId),
    onSuccess: (data) => {
      // Invalidate invitations list
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      
      // Invalidate user data (to refresh tenant list)
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Show success message (you can use toast here)
      console.log('✅ Invitation accepted:', data.message);
      
      // Optional: Redirect to dashboard or tenant page
      // router.push('/admin/default');
    },
    onError: (error: any) => {
      console.error('❌ Failed to accept invitation:', error);
      // Show error message (you can use toast here)
    },
  });
};

/**
 * Hook to reject invitation
 */
export const useRejectInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => rejectInvitation(invitationId),
    onSuccess: (data) => {
      // Invalidate invitations list
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      
      // Show success message
      console.log('✅ Invitation rejected:', data.message);
    },
    onError: (error: any) => {
      console.error('❌ Failed to reject invitation:', error);
    },
  });
};

/**
 * Hook to verify invitation token
 */
export const useVerifyInvitationToken = (token: string | null) => {
  return useQuery({
    queryKey: ['invitation-verify', token],
    queryFn: () => verifyInvitationToken(token!),
    enabled: !!token, // Only run if token exists
    retry: false, // Don't retry on failure
  });
};

/**
 * Hook to get invitation counts (from invitations list)
 */
export const useInvitationCounts = () => {
  return useQuery({
    queryKey: ['invitations', { status: 'all', limit: 1 }],
    queryFn: () => getMyInvitations({ status: 'all', limit: 1 }),
    select: (data) => data.counts, // Only return counts
    staleTime: 60000, // 1 minute
  });
};
