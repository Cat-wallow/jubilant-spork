import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ClientBranch {
  id: string;
  client_id: string;
  shareholder?: string | null;
  position?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  phone?: string | null;
  pic_name?: string | null;
  pic_position?: string | null;
  pic_email?: string | null;
  pic_phone?: string | null;
  address?: string | null;
  is_hq?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface BranchesApiResponse {
  client_id: string;
  branches: ClientBranch[];
}

export const useClientBranches = (tenantId: string, clientId: string) => {
  return useQuery<ClientBranch[]>({
    queryKey: ['clientBranches', tenantId, clientId],
    queryFn: async () => {
      const { data } = await api.get<BranchesApiResponse>(
        `/client-wp/api/clients/${clientId}/branches`,
        {
          headers: {
            'X-Tenant-Id': tenantId,
          },
        },
      );

      return data.branches || [];
    },
    enabled: !!tenantId && !!clientId,
  });
};

interface UpsertBranchPayload {
  tenantId: string;
  clientId: string;
  branchId?: string;
  data: Partial<
    Pick<
      ClientBranch,
      | 'shareholder'
      | 'position'
      | 'country'
      | 'province'
      | 'city'
      | 'phone'
      | 'pic_name'
      | 'pic_position'
      | 'pic_email'
      | 'pic_phone'
      | 'address'
      | 'is_hq'
    >
  >;
}

interface DeleteBranchPayload {
  tenantId: string;
  clientId: string;
  branchId: string;
}

export const useUpsertClientBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, UpsertBranchPayload>({
    mutationFn: async ({ tenantId, clientId, branchId, data }) => {
      const headers = { 'X-Tenant-Id': tenantId };

      if (branchId) {
        const response = await api.put(
          `/client-wp/api/clients/${clientId}/branches/${branchId}`,
          data,
          { headers },
        );
        return response.data;
      }

      const response = await api.post(
        `/client-wp/api/clients/${clientId}/branches`,
        data,
        { headers },
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientBranches', variables.tenantId, variables.clientId],
      });
    },
  });
};

export const useDeleteClientBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, DeleteBranchPayload>({
    mutationFn: async ({ tenantId, clientId, branchId }) => {
      const headers = { 'X-Tenant-Id': tenantId };

      const response = await api.delete(
        `/client-wp/api/clients/${clientId}/branches/${branchId}`,
        { headers },
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientBranches', variables.tenantId, variables.clientId],
      });
    },
  });
};
