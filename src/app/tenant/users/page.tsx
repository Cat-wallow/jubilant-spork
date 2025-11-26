'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import RBAC from '@/components/rbac/RBAC';
import InviteUserModal from './components/InviteUserModal';
import ImportUsersModal from './components/ImportUsersModal';
import { useTenantUsers } from '@/hooks/useTenantUsers';
import { useAuth } from '@/contexts/AuthContext';
import { columns } from './components/columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import UserActionsMenu from './components/UserActionsMenu';
import {
  ColumnFiltersState,
  getCoreRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { UsersTableToolbar } from './components/data-table-toolbar';
import { DataTable } from '@/components/ui/data-table';

function UsersPageContent() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { tenant, user: currentUser } = useAuth();

  const { data, isLoading, isFetching, error, refetch } = useTenantUsers({
    tenantId: tenant.id,
    search: debouncedSearchQuery,
    status: statusFilter === 'all' ? undefined : statusFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sorting,
  });

  const users = useMemo(
    () =>
      (data?.items || []).map((u) => ({
        ...u,
        isCurrentUser: !!currentUser && u.email === currentUser.email,
      })),
    [data?.items, currentUser],
  );
  const pageCount = data?.pagination?.totalPages || 0;

  const tableColumns = useMemo(
    () =>
      columns.map((col) => {
        if (col.id === 'actions') {
          return {
            ...col,
            cell: ({ row }) => (
              <div className="text-right">
                <UserActionsMenu user={row.original} onSuccess={refetch} tenantId={tenant.id} />
              </div>
            ),
          };
        }
        return col;
      }),
    [refetch, tenant.id],
  );

  const table = useReactTable({
    data: users,
    columns: tableColumns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <div className="h-full w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
      </div>

      {/* Main Content Card */}
      <div className="rounded-lg border bg-card p-6">
        {/* Title and Add Button */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Daftar Pengguna</h2>
            <p className="text-sm text-muted-foreground">
              Kelola pengguna yang ada di dalam tenant Anda
            </p>
          </div>
        </div>

        {/* Filters and Toolbar */}
        <UsersTableToolbar
          table={table}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onInvite={() => setShowInviteModal(true)}
          onImport={() => setShowImportModal(true)}
          isFetching={isFetching}
        />

        {/* Table */}
        <div className="mt-6">
          <DataTable
            table={table}
            columns={tableColumns}
            isLoading={isLoading || isFetching}
            isError={!!error}
          />
        </div>
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
          setShowInviteModal(false);
          refetch();
        }}
      />
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
