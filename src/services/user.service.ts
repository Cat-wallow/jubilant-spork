import api from "@/lib/api";

export type InviteUserPayload = {
	email: string;
	role_id: string;
};

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
