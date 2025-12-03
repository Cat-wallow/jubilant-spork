import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
export type NormalSide = 'Debit' | 'Credit';
export type AccountStatus = 'Active' | 'Inactive';

export interface ClientCoa {
  id: string;
  client_id: string;
  account_number: string;
  account_name: string;
  account_type: AccountType;
  normal_side: NormalSide;
  tax_mapping: string[];
  status: AccountStatus;
  description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CoaFilters {
  status?: string;
  account_type?: string;
  search?: string;
}

interface CoaApiResponse {
  success: boolean;
  data: ClientCoa[];
  count: number;
}

interface SingleCoaApiResponse {
  success: boolean;
  data: ClientCoa;
  message?: string;
}

// Get all COA for a client
export const useClientCoa = (tenantId: string, clientId: string, filters?: CoaFilters) => {
  return useQuery<ClientCoa[]>({
    queryKey: ['clientCoa', tenantId, clientId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.account_type) params.append('account_type', filters.account_type);
      if (filters?.search) params.append('search', filters.search);

      const { data } = await api.get<CoaApiResponse>(
        `/client-wp/api/clients/${clientId}/coa?${params.toString()}`,
        {
          headers: {
            'X-Tenant-Id': tenantId,
          },
        },
      );

      return data.data || [];
    },
    enabled: !!tenantId && !!clientId,
  });
};

// Create COA
export interface CreateCoaPayload {
  tenantId: string;
  clientId: string;
  data: {
    account_number: string;
    account_name: string;
    account_type?: AccountType;
    normal_side?: NormalSide;
    tax_mapping?: string[];
    status?: AccountStatus;
    description?: string;
    parent_code?: string;
  };
}

export const useCreateCoa = () => {
  const queryClient = useQueryClient();

  return useMutation<ClientCoa, unknown, CreateCoaPayload>({
    mutationFn: async ({ tenantId, clientId, data }) => {
      const response = await api.post<SingleCoaApiResponse>(
        `/client-wp/api/clients/${clientId}/coa`,
        data,
        {
          headers: { 'X-Tenant-Id': tenantId },
        },
      );
      return response.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientCoa', variables.tenantId, variables.clientId],
      });
    },
  });
};

// Update COA
export interface UpdateCoaPayload {
  tenantId: string;
  clientId: string;
  coaId: string;
  data: Partial<{
    account_number: string;
    account_name: string;
    account_type: AccountType;
    normal_side: NormalSide;
    tax_mapping: string[];
    status: AccountStatus;
    description: string;
    parent_code: string;
  }>;
}

export const useUpdateCoa = () => {
  const queryClient = useQueryClient();

  return useMutation<ClientCoa, unknown, UpdateCoaPayload>({
    mutationFn: async ({ tenantId, clientId, coaId, data }) => {
      const response = await api.put<SingleCoaApiResponse>(
        `/client-wp/api/clients/${clientId}/coa/${coaId}`,
        data,
        {
          headers: { 'X-Tenant-Id': tenantId },
        },
      );
      return response.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientCoa', variables.tenantId, variables.clientId],
      });
    },
  });
};

// Delete COA
export interface DeleteCoaPayload {
  tenantId: string;
  clientId: string;
  coaId: string;
}

export const useDeleteCoa = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteCoaPayload>({
    mutationFn: async ({ tenantId, clientId, coaId }) => {
      await api.delete(`/client-wp/api/clients/${clientId}/coa/${coaId}`, {
        headers: { 'X-Tenant-Id': tenantId },
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientCoa', variables.tenantId, variables.clientId],
      });
    },
  });
};
