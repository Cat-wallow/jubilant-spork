'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTenantStatus } from '@/services/tenant.service';
import { toast } from 'sonner';

export function useToggleTenantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) => toggleTenantStatus(tenantId),
    onSuccess: (data) => {
      const action = data.status === 'active' ? 'diaktifkan' : 'dinonaktifkan';
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
    onError: (error: any) => {
      toast.error('Gagal memperbarui status tenant.', {
        description:
          error.response?.data?.message || 'Terjadi kesalahan pada server.',
      });
    },
  });
}
