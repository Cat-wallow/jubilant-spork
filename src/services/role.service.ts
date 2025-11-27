import api from '@/lib/api';

export interface Role {
  id: string;
  name: string;
  level: number;
  description?: string;
}

export const getTenantAssignableRoles = async (): Promise<Role[]> => {
  const response = await api.get('/api/v1/roles', {
    params: {
      permission: 'tenant:manage'
    },
  });
  return response.data.data;
};
