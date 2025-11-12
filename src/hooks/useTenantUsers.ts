import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'lib/api';

interface TenantUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  created_at: string;
}

interface TenantUsersResponse {
  items: TenantUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseTenantUsersParams {
  search?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}

export const useTenantUsers = (params: UseTenantUsersParams = {}) => {
  return useQuery({
    queryKey: ['tenantUsers', params],
    queryFn: async () => {
      const { data } = await api.get<TenantUsersResponse>('/users', { params });
      return data;
    },
  });
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { email: string; role_id: string }) => {
      const { data } = await api.post('/users/invite', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantUsers'] });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }) => {
      const { data } = await api.put(`/users/${userId}/role`, { role_id: roleId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantUsers'] });
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, reason }: { userId: string; reason?: string }) => {
      const { data } = await api.delete(`/users/${userId}`, { data: { reason } });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantUsers'] });
    },
  });
};

export const useReactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data} = await api.post(`/users/${userId}/reactivate`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantUsers'] });
    },
  });
};

export const useImportUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/users/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenantUsers'] });
    },
  });
};
