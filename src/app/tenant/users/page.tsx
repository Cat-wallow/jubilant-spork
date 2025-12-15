'use client';
import RBAC from '@/components/rbac/RBAC';
import UserTable from './components/UserTable';

function UsersPageContent() {
  return (
    <div className="h-full w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-3xl font-bold ">Manajemen Pengguna</h1>
      </div>
      <UserTable />
    </div>
  );
}

export default function TenantUsersPage() {
  return (
    <RBAC requiredPermission={['user:manage', 'user:read']} unauthorizedPage={true}>
      <UsersPageContent />
    </RBAC>
  );
}
