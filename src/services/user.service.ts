import api from '@/lib/api';
import { User, InviteUserPayload } from '@/types/user';

/**
 * Invites a new user to a specific tenant.
 * @param payload - The invitation payload.
 * @returns The newly created user invitation record.
 */
export const inviteUser = async (payload: InviteUserPayload): Promise<any> => {
  // Assuming the endpoint is something like POST /user/invitations based on kong.yml
  // The actual endpoint might be different, e.g., /users/invite
  const response = await api.post('/user/invitations', payload);
  return response.data;
};
