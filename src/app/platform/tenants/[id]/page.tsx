'use client';

import RBAC from '@/components/rbac/RBAC';
import { useParams } from 'next/navigation';
import TenantDetailContent from './components/TenantDetailContent';

export default function TenantDetailPage() {
  const params = useParams();
  const tenantId = params.id as string;

  return (
    <RBAC requiredPermission="tenant:view" unauthorizedPage={true}>
      <TenantDetailContent tenantId={tenantId} />
    </RBAC>
  );
}
