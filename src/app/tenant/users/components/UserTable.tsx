import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useTenantUsers } from "@/hooks/useTenantUsers";
import { getCoreRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import UserActionsMenu from "./UserActionsMenu";
import { UsersTableToolbar } from "./data-table-toolbar";
import { DataTable } from '@/components/ui/data-table';
import InviteUserModal from "./InviteUserModal";
import ImportUsersModal from "./ImportUsersModal";
import { columns } from "./columns";

export default function UserTable( {tenantid}: {tenantid?: string}) {
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
const tenantId = tenantid || tenant.id ;

const { data, isLoading, isFetching, error, refetch } = useTenantUsers({
  tenantId: tenantId,
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
              <UserActionsMenu user={row.original} onSuccess={refetch} tenantId={tenantId} />
            </div>
          ),
        };
      }
      return col;
    }),
  [refetch, tenantId],
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
    <>
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
      tenantId={tenantId}
      isOpen={showInviteModal}
      onClose={() => setShowInviteModal(false)}
      onSuccess={() => {
        setShowInviteModal(false);
        refetch();
      }}
    />

    <ImportUsersModal
      tenantId={tenantId}
      isOpen={showImportModal}
      onClose={() => setShowImportModal(false)}
      onSuccess={() => {
        setShowImportModal(false);
        refetch();
      }}
    />
    </>
    );
};
