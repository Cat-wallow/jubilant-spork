/**
 * Invitation Types
 * Matches backend DTOs from UM-BE-03.5
 */

export type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface Invitation {
  id: string;
  email: string;
  role: string;
  status: InvitationStatus;
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
  inviter: {
    id: string;
    name: string;
    email: string;
  };
  existing_user_id: string | null;
  created_at: string;
  accepted_at: string | null;
  expires_at: string;
}

export interface InvitationListResponse {
  invitations: Invitation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: {
    all: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

export interface AcceptRejectInvitationResponse {
  ok: boolean;
  message: string;
  invitation_id: string;
  user_tenant_role_id?: string;
}

export interface VerifyInvitationTokenResponse {
  valid: boolean;
  invitation?: Invitation;
  message?: string;
}

export interface ListInvitationsParams {
  status?: 'all' | 'pending' | 'accepted' | 'rejected';
  page?: number;
  limit?: number;
}
