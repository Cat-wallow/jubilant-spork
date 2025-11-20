import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface Client {
  id: string;
  code: string;
  name: string;
  legal_name?: string | null;
  type: string;
  npwp?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  pkp_status?: boolean | null;
  active_projects?: number | null;
  deadline_project?: string | null;
}

interface ClientsResponse {
  items: Client[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseClientsParams {
  tenantId: string;
  search?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export const useClients = (params: UseClientsParams) => {
  const {
    tenantId,
    search,
    status,
    type,
    page = 1,
    limit = 10,
  } = params;

  return useQuery<ClientsResponse>({
    queryKey: ['clients', tenantId, { search, status, type, page, limit }],
    queryFn: async () => {
      const { data } = await api.get<{
        items: Client[];
        total: number;
        page: number;
        size: number;
      }>('/client-wp/api/clients', {
        params: {
          search,
          status,
          type,
          page,
          size: limit,
        },
        headers: {
          'X-Tenant-Id': tenantId,
        },
      });

      const d = data;
      const response: ClientsResponse = {
        items: d.items,
        pagination: {
          page: d.page,
          limit: d.size,
          total: d.total,
          totalPages: Math.ceil((d.total || 0) / (d.size || 1)),
        },
      };

      return response;
    },
    staleTime: 1000 * 60 * 5,
  });
};
