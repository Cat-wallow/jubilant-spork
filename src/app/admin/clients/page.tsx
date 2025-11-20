'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useAuth } from '@/contexts/AuthContext';
import { useClients } from '@/hooks/useClients';
import { DataTable } from '@/components/ui/data-table';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search as SearchIcon, X } from 'lucide-react';
import { Client } from '@/hooks/useClients';

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'code',
    header: 'Kode',
  },
  {
    accessorKey: 'name',
    header: 'Nama Klien',
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{client.name}</span>
          {client.legal_name && (
            <span className="text-xs text-muted-foreground">
              {client.legal_name}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipe',
    cell: ({ row }) => {
      const type = row.getValue<string>('type');
      const label =
        type === 'corporate'
          ? 'Badan'
          : type === 'individual'
            ? 'Orang Pribadi'
            : type;
      return <span className="text-sm capitalize">{label}</span>;
    },
  },
  {
    accessorKey: 'npwp',
    header: 'NPWP',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = (row.getValue<string>('status') || 'active').toLowerCase();
      const isActive = status === 'active';
      return (
        <Badge
          variant={isActive ? 'default' : 'destructive'}
          className={
            isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40'
              : ''
          }
        >
          {isActive ? 'Aktif' : 'Nonaktif'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat',
    cell: ({ row }) => {
      const value = row.getValue<string>('created_at');
      if (!value) return null;
      const date = new Date(value);
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      );
    },
  },
];

export default function ClientsPage() {
  const { tenant } = useAuth();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isFetching, error } = useClients({
    tenantId: tenant.id,
    search: debouncedSearchQuery,
    status: statusFilter,
    type: typeFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const clients = data?.items || [];
  const pageCount = data?.pagination?.totalPages || 0;

  const table = useReactTable({
    data: clients,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="h-full w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-3xl font-bold tracking-tight">Klien / Wajib Pajak</h1>
        <p className="text-sm text-muted-foreground">
          Kelola daftar klien/WP yang ditangani oleh kantor Anda.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="rounded-lg border bg-card p-6">
        {/* Filters */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama, kode, atau NPWP klien..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full pl-10 lg:w-[280px]"
                disabled={isFetching}
              />
            </div>
            
            {/* Status Filter */}
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
              <SelectTrigger className="h-10 w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Nonaktif</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter - Disabled temporarily */}
            <Select disabled>
              <SelectTrigger className="h-10 w-full sm:w-[140px] opacity-50">
                <SelectValue placeholder="Tipe (Coming Soon)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="corporate">Badan</SelectItem>
                <SelectItem value="individual">Orang Pribadi</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(statusFilter || typeFilter) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter('');
                  setTypeFilter('');
                }}
                className="h-10 px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="mt-4">
          <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading || isFetching}
            isError={!!error}
          />
        </div>
      </div>
    </div>
  );
}
