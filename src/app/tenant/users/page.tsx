'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import RBAC from '@/components/rbac/RBAC';
import InviteUserModal from './components/InviteUserModal';
import ImportUsersModal from './components/ImportUsersModal';
import { useTenantUsers } from '@/hooks/useTenantUsers';
import { useAuth } from '@/contexts/AuthContext';
import { columns } from './components/columns';
import { UsersDataTable } from './components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import UserActionsMenu from './components/UserActionsMenu';

function UsersPageContent() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const { tenant } = useAuth();

  const { data, isLoading, isFetching, error, refetch } = useTenantUsers({
    tenantId: tenant.id,
    search: debouncedSearchQuery,
    status: statusFilter === 'all' ? undefined : statusFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const users = data?.items || [];
  const pageCount = data?.pagination?.totalPages || 0;
  const totalRows = data?.pagination?.total || 0;

  const tableColumns = useMemo(
    () =>
      columns.map((col) => {
        if (col.id === 'actions') {
          return {
            ...col,
            cell: ({ row }) => (
              <div className="text-right">
                <UserActionsMenu
                  user={row.original}
                  onSuccess={refetch}
                  tenantId={tenant.id}
                />
              </div>
            ),
          };
        }
        return col;
      }),
    [refetch, tenant.id],
  );

  if (error) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-destructive">Failed to load users</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 h-full w-full space-y-6 font-dm">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold ">Manajemen Pengguna</h1>
        <p className="mt-2 text-muted-foreground">
          Kelola user yang tergabung dalam tenant Anda
        </p>
      </div>

      {/* Data Table */}
      <div className="space-y-4">
        {/*{isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[30rem] w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (*/}
        <UsersDataTable
          columns={tableColumns}
          data={users}
          pageCount={pageCount}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPageChange={(page) =>
            setPagination((p) => ({ ...p, pageIndex: page }))
          }
          onPageSizeChange={(size) =>
            setPagination({ pageIndex: 0, pageSize: size })
          }
          totalRows={totalRows}
          onInvite={() => setShowInviteModal(true)}
          onImport={() => setShowImportModal(true)}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        {/*)}*/}
      </div>

      {/* Modals */}
      <InviteUserModal
        tenantId={tenant.id}
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSuccess={() => {
          setShowInviteModal(false);
          refetch();
        }}
      />

      <ImportUsersModal
        tenantId={tenant.id}
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={() => {
          setShowImportModal(false);
          refetch();
        }}
      />
    </div>
  );
}

export default function TenantUsersPage() {
  return (
    <RBAC requiredPermission="tenant:user_manage" unauthorizedPage={true}>
      <UsersPageContent />
    </RBAC>
  );
}
