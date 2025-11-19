'use client';

import RBAC from '@/components/rbac/RBAC';
import { getTenants } from '@/services/tenant.service';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  getCoreRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TenantStats from './components/TenantStats';
import { DataTableToolbar } from './components/data-table-toolbar';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './components/columns';
import { useDebounce } from 'use-debounce';

function TenantsPageContent() {
  const router = useRouter();

  // Table state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'tenants',
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      debouncedSearch,
      statusFilter,
      planFilter,
    ],
    queryFn: () => {
      const sortDescriptor = sorting.length > 0 ? sorting[0] : undefined;
      const sort = sortDescriptor
        ? {
            column: sortDescriptor.id,
            direction: sortDescriptor.desc ? 'desc' : 'asc',
          }
        : undefined;

      return getTenants(
        pagination.pageIndex + 1,
        pagination.pageSize,
        searchQuery,
        statusFilter,
        planFilter,
        sort as any,
      );
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const tenants = data?.data?.tenants || [];
  const totalTenants = data?.data?.total || 0;
  const pageCount = Math.ceil(totalTenants / pagination.pageSize);

  const table = useReactTable({
    data: tenants,
    columns: columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  // Stats are mocked for now, as the API does not provide them yet.
  const stats = {
    totalClients: 29,
    pkpClients: 25,
    nonPkpClients: 2,
    activeClients: 10,
    totalProjects: 10,
    complianceRate: 80,
    complianceChange: 23,
  };

  return (
    <div className=" w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-3xl font-bold tracking-tight">
          Tenant (Perusahaan Konsultan Pajak)
        </h1>
      </div>

      {/* Stats */}
      <TenantStats stats={stats} />

      {/* Main Content Card */}
      <div className="rounded-lg border bg-card p-6">
        {/* Title and Add Button */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Daftar Tenant</h2>
            <p className="text-sm text-muted-foreground">
              Kelola data identitas, klasifikasi pajak, dan dokumen legal client
            </p>
          </div>
        </div>

        {/* Filters and Toolbar */}
        <DataTableToolbar
          table={table}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          planFilter={planFilter}
          setPlanFilter={setPlanFilter}
        />

        {/* Table */}
        <div className="mt-6">
          <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
}
export default function TenantsPage() {
  return (
    <RBAC requiredPermission="platform:tenant_manage" unauthorizedPage={true}>
      <TenantsPageContent />
    </RBAC>
  );
}
