'use client';

import UserTable from '@/app/tenant/users/components/UserTable';

export default function UsersTab({ tenantId }: { tenantId: string }) {
  return (
    <UserTable tenantid={tenantId} />
  );
}
