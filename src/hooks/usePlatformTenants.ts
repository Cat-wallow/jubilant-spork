'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { toggleTenantStatus } from '@/services/tenant.service';

export function useToggleTenantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) => toggleTenantStatus(tenantId),
    onSuccess: (data) => {
      const action = data.status === 'active' ? 'diaktifkan' : 'dinonaktifkan';
      toast.success(`Tenant berhasil ${action}.`);
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
