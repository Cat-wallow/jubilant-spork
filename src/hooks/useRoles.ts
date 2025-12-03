import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface Role {
  id: string;
  name: string;
  description: string | null;
}

interface RolesResponse {
  success: boolean;
  data: Role[];
}

export const useRoles = () => {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await api.get<RolesResponse>('user/roles');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
