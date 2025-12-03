import api from '@/lib/api';

export interface Role {
  id: string;
  name: string;
  level: number;
  description?: string;
}

export const getTenantAssignableRoles = async (): Promise<Role[]> => {
  const response = await api.get('user/roles', {
    params: {
      permission: 'tenant:manage'
    },
  });
  return response.data.data;
};
