import api from 'lib/api';
import {
  Invitation,
  InvitationListResponse,
  AcceptRejectInvitationResponse,
  VerifyInvitationTokenResponse,
  ListInvitationsParams,
} from 'types/invitation';

/**
 * Invitation Service
 * API calls for invitation management (UM-BE-03.5)
 */

/**
 * Get user's invitations
 * GET /api/v1/users/me/invitations
 */
export const getMyInvitations = async (
  params?: ListInvitationsParams
): Promise<InvitationListResponse> => {
  const { data } = await api.get<{ success: boolean; data: InvitationListResponse }>(
    '/users/me/invitations',
    { params }
  );
  return data.data;
};

/**
 * Accept an invitation
 * POST /api/v1/invitations/:id/accept
 */
export const acceptInvitation = async (
  invitationId: string
): Promise<AcceptRejectInvitationResponse> => {
  const { data } = await api.post<{ success: boolean; data: AcceptRejectInvitationResponse }>(
    `/invitations/${invitationId}/accept`
  );
  return data.data;
};

/**
 * Reject an invitation
 * POST /api/v1/invitations/:id/reject
 */
export const rejectInvitation = async (
  invitationId: string
): Promise<AcceptRejectInvitationResponse> => {
  const { data } = await api.post<{ success: boolean; data: AcceptRejectInvitationResponse }>(
    `/invitations/${invitationId}/reject`
  );
  return data.data;
};

/**
 * Verify invitation token
 * GET /api/v1/invitations/verify?token=XXX
 * Note: This is a public endpoint (no auth required)
 */
export const verifyInvitationToken = async (
  token: string
): Promise<VerifyInvitationTokenResponse> => {
  const { data } = await api.get<{ success: boolean; data: VerifyInvitationTokenResponse }>(
    '/invitations/verify',
    { params: { token } }
  );
  return data.data;
};
