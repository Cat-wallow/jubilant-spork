import { useQuery } from '@tanstack/react-query';
import { getTenantById } from '@/services/tenant.service';

export const useTenantById = (tenantId: string) => {
  return useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId, // Only run the query if tenantId is available
  });
};
