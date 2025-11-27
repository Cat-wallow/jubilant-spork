'use client';

import RBAC from '@/components/rbac/RBAC';
import { useParams } from 'next/navigation';
import TenantDetailContent from './components/TenantDetailContent';
import { useQuery } from '@tanstack/react-query';
import { getTenantById } from '@/services/tenant.service';
import { Skeleton } from '@/components/ui/skeleton';

export default function TenantDetailPage() {
  const params = useParams();
  const tenantId = params.id as string;

  const {
    data: tenant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId,
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-10 w-1/4" />
          <div className="flex items-start gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading tenant data.</div>;
  }

  if (!tenant) {
    return <div>Tenant not found.</div>;
  }

  return (
    <RBAC requiredPermission="tenant:read" unauthorizedPage={true}>
      <TenantDetailContent tenant={tenant} />
    </RBAC>
  );
}
