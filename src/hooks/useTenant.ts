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
  enabled?: boolean;
}

export const useTenantById = (tenantId: string) => {
  return useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId, // Only run the query if tenantId is available
  });
};

export const useTenantUsers = (params: UseTenantUsersParams) => {
  const { tenantId, search, status, permission, page = 1, limit = 10, enabled } = params;
  const safeLimit = Math.min(Math.max(1, limit), 100);

  return useQuery<TenantUsersResponse>({
    queryKey: ['tenantUsers', tenantId, { search, status, permission, page, limit: safeLimit }],
    queryFn: async () => {
      const { data } = await api.get<{
        success: boolean;
        data?: {
          items?: Array<{
            id: string;
            name: string;
            email: string;
            role?: string;
            status?: string;
            joinedAt?: string;
          }>;
          total?: number;
          page?: number;
          size?: number;
        };
      }>(`/api/v1/tenants/${tenantId}/users`, {
        params: {
          search,
          status: status || 'all',
          page,
          size: safeLimit,
          // NOTE: permission filter is not supported by this endpoint currently.
          // We keep it in the queryKey for caching but ignore it in request params.
        },
      });

      const d = data?.data || {};
      const rawItems = Array.isArray(d.items) ? d.items : [];

      const items: ITenantUser[] = rawItems.map((u) => {
        const fullName = String(u.name ?? '').trim();
        const parts = fullName.split(/\s+/).filter(Boolean);
        const firstName = parts[0] || undefined;
        const lastName = parts.length > 1 ? parts.slice(1).join(' ') : undefined;

        return {
          id: String(u.id),
          email: String(u.email ?? ''),
          username: fullName || String(u.email ?? ''),
          name: fullName,
          first_name: firstName,
          last_name: lastName,
          status: String(u.status ?? 'active'),
        };
      });

      const total = typeof d.total === 'number' ? d.total : items.length;
      const resolvedPage = typeof d.page === 'number' ? d.page : page;
      const resolvedLimit = typeof d.size === 'number' ? d.size : safeLimit;

      return {
        items,
        pagination: {
          page: resolvedPage,
          limit: resolvedLimit,
          total,
          totalPages: Math.ceil((total || 0) / (resolvedLimit || 1)),
        },
      };
    },
    enabled: typeof enabled === 'boolean' ? enabled : !!tenantId,
    staleTime: 1000 * 60 * 5,
  });
};