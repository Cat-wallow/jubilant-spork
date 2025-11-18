import api from '@/lib/api';
import { ILoginResponse, ISwitchTenantRequest } from '@/types/auth';

/**
 * Switches the user's active tenant.
 * This will call the /switch-tenant endpoint which:
 * 1. Updates the user's active tenant
 * 2. Logs the action in the tenant_switches and audit_logs tables
 * 3. Returns updated session data including new tenant, role, and permissions
 *
 * @param {ISwitchTenantRequest} data - The tenant ID to switch to
 * @returns {Promise<ILoginResponse>} The updated session data with new tenant context
 */
export const switchTenant = async (
  data: ISwitchTenantRequest,
): Promise<ILoginResponse> => {
  try {
    const response = await api.post('auth/switch-tenant', data);

    // The API should return data in the same format as login response
    // containing user, tenant, role, availableTenants, and permissions
    return response.data as ILoginResponse;
  } catch (error) {
    console.error('Error switching tenant:', error);
    throw error;
  }
};

/**
 * Get available tenants for the current user
 * This can be used if you need to fetch tenants separately
 *
 * @returns {Promise<IUserTenant[]>} Array of available tenants with user roles
 */
export const getUserTenants = async () => {
  try {
    const response = await api.get('/user/tenants');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user tenants:', error);
    throw error;
  }
};
