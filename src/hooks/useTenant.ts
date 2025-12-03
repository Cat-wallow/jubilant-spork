import { useQuery } from '@tanstack/react-query';
import { getTenantById } from '@/services/tenant.service';
import api from "@/lib/api"; // Add this import

// Placeholder for Tenant User interface. This should ideally come from a shared types module.
// For now, assuming a basic user structure.
interface ITenantUser {
  id: string;
  email: string;
  username: string;
  name: string; // Added name field
  first_name?: string;
  last_name?: string;
  status: string; // e.g., 'active', 'inactive'
  role?: string; // Role within the tenant
  created_at?: string;
  updated_at?: string;
}

interface TenantUsersResponse {
  items: ITenantUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseTenantUsersParams {
  tenantId: string;
  search?: string;
  status?: string;
  permission?: string; // Added permission filter
  page?: number;
  limit?: number;
}

export const useTenantById = (tenantId: string) => {
  return useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId, // Only run the query if tenantId is available
  });
};

export const useTenantUsers = (params: UseTenantUsersParams) => {
  const { tenantId, search, status, permission, page = 1, limit = 10 } = params;

  return useQuery<TenantUsersResponse>({
    queryKey: ['tenantUsers', tenantId, { search, status, permission, page, limit }],
    queryFn: async () => {
      const { data } = await api.get<any>('/tenant/user', {
        params: {
          search,
          status,
          permission, // Pass permission to API
          page,
          size: limit,
        },
        headers: {
          'X-Tenant-Id': tenantId,
        },
      });

      // Handle response structure: { success: true, data: [...] }
      const items = Array.isArray(data.data) ? data.data : [];
      const total = items.length; // Fallback if no total provided

      const response: TenantUsersResponse = {
        items: items,
        pagination: {
          page: page,
          limit: limit,
          total: total,
          totalPages: Math.ceil(total / limit),
        },
      };

      return response;
    },
    enabled: !!tenantId,
    staleTime: 1000 * 60 * 5,
  });
};