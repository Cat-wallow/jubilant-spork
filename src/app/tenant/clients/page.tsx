'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useClients, useCreateClient, useDeleteClient, useTenantComplianceSummary } from '@/hooks/useClients';
import { useAuth } from '@/contexts/AuthContext';
import { SummaryCards } from './components/SummaryCards';
import { AdvancedFilters } from './components/AdvancedFilters';
import { CreateClientModalUpdated } from './components/CreateClientModalUpdated';
import {
  ColumnFiltersState,
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MoreHorizontal,
  Plus,
  FileDown,
  Filter,
  Edit,
  Link,
  Trash2,
  Search,
  Eye,
  Building2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Client } from '@/hooks/useClients';
import { useToast } from '@/hooks/use-toast';

// const columns: ColumnDef<Client>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Klien',
//     cell: ({ row }) => (
//       <div className="font-medium">
//         <div className="flex flex-col">
//           <span className="text-sm font-medium">{row.getValue('name')}</span>
//           <span className="text-xs text-muted-foreground">{row.original.code}</span>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status Client',
//     cell: ({ row }) => {
//       const status = row.getValue('status') as string;
//       return (
//         <Badge
//           variant={status === 'active' ? 'default' : 'secondary'}
//           className={
//             status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }
//         >
//           {status === 'active' ? 'Active' : 'Non Aktif'}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: 'type',
//     header: 'Jenis Usaha',
//     cell: ({ row }) => {
//       const type = row.getValue('type') as string;
//       const typeLabels = {
//         corporate: 'Konstruksi',
//         individual: 'Trading',
//         other: 'Manufaktur',
//       };
//       return typeLabels[type as keyof typeof typeLabels] || type;
//     },
//   },
//   {
//     accessorKey: 'npwp',
//     header: 'NPWP',
//     cell: ({ row }) => <span className="font-mono text-sm">{row.getValue('npwp') || '-'}</span>,
//   },
//   {
//     accessorKey: 'pkp_status',
//     header: 'Status PKP',
//     cell: ({ row }) => {
//       const pkpStatus = row.original.pkp_status;
//       return (
//         <Badge
//           variant={pkpStatus ? 'default' : 'secondary'}
//           className={pkpStatus ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
//         >
//           {pkpStatus ? 'PKP' : 'NON PKP'}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: 'active_projects',
//     header: 'Active Project',
//     cell: ({ row }) => (
//       <span className="text-sm font-medium">{row.original.active_projects || 0}</span>
//     ),
//   },
//   {
//     accessorKey: 'updated_at',
//     header: 'Last Update',
//     cell: ({ row }) => {
//       const date = new Date(row.getValue('updated_at'));
//       return (
//         <span className="text-sm">
//           {date.toLocaleDateString('id-ID', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//           })}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: 'deadline_project',
//     header: 'Deadline Project',
//     cell: ({ row }) => {
//       const deadline = row.original.deadline_project;
//       if (!deadline) return <span className="text-sm text-muted-foreground">-</span>;

//       const date = new Date(deadline);
//       const isOverdue = date < new Date();
//       return (
//         <span className={`text-sm ${isOverdue ? 'font-medium text-red-600' : ''}`}>
//           {date.toLocaleDateString('id-ID', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//           })}
//         </span>
//       );
//     },
//   },
//   {
//     id: 'actions',
//     header: 'Action',
//     cell: ({ row }) => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem>
//             <Edit className="mr-2 h-4 w-4" />
//             Edit
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Link className="mr-2 h-4 w-4" />
//             View Details
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem className="text-red-600">
//             <Trash2 className="mr-2 h-4 w-4" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
// ];

export default function ClientsPage() {
  const { tenant } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const createClientMutation = useCreateClient();
  const deleteClientMutation = useDeleteClient();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [pkpFilter, setPkpFilter] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isFetching, error } = useClients({
    tenantId: tenant.id,
    search: debouncedSearchQuery,
    status: statusFilter,
    type: typeFilter,
    pkp_status: pkpFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const { data: complianceSummary } = useTenantComplianceSummary(tenant.id);

  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Klien',
        cell: ({ row }) => (
          <div className="font-medium">
            <div className="flex flex-col">
              <span className="text-sm font-medium">{row.getValue('name')}</span>
              <span className="text-xs text-muted-foreground">{row.original.code}</span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status Client',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <Badge
              variant={status === 'active' ? 'default' : 'secondary'}
              className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
            >
              {status === 'active' ? 'Active' : 'Non Aktif'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'type',
        header: 'Jenis Usaha',
        cell: ({ row }) => {
          const type = row.getValue('type') as string;
          const typeLabels = {
            corporate: 'Konstruksi',
            individual: 'Trading',
            other: 'Manufaktur',
          };
          return typeLabels[type as keyof typeof typeLabels] || type;
        },
      },
      {
        accessorKey: 'npwp',
        header: 'NPWP',
        cell: ({ row }) => (
          <span className="text-sm font-mono">{row.getValue('npwp') || '-'}</span>
        ),
      },
      {
        accessorKey: 'pkp_status',
        header: 'Status PKP',
        cell: ({ row }) => {
          const pkpStatus = row.original.pkp_status;
          return (
            <Badge
              variant={pkpStatus ? 'default' : 'secondary'}
              className={pkpStatus ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
            >
              {pkpStatus ? 'PKP' : 'NON PKP'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'active_projects',
        header: 'Active Project',
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.original.active_projects || 0}</span>
        ),
      },
      {
        accessorKey: 'updated_at',
        header: 'Last Update',
        cell: ({ row }) => {
          const date = new Date(row.getValue('updated_at'));
          return (
            <span className="text-sm">
              {date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          );
        },
      },
      {
        accessorKey: 'deadline_project',
        header: 'Deadline Project',
        cell: ({ row }) => {
          const deadline = row.original.deadline_project;
          if (!deadline) return <span className="text-sm text-muted-foreground">-</span>;

          const date = new Date(deadline);
          const isOverdue = date < new Date();
          return (
            <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
              {date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/clients/${row.original.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/clients/${row.original.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this client?')) {
                    deleteClientMutation.mutate({
                      tenantId: tenant.id,
                      id: row.original.id,
                    });
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [deleteClientMutation, tenant.id]
  );

  const clients = data?.items || [];
  const pageCount = data?.pagination?.totalPages || 0;

  // Mock summary data - will be replaced with real API
  const summaryData = {
    totalClients: data?.pagination?.total || 0,
    activeClients: clients.filter((c) => c.status === 'active').length,
    totalProjects: clients.reduce((sum, c) => sum + (c.active_projects || 0), 0),
    complianceRate: complianceSummary?.compliance_rate ?? 0,
  };

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setTypeFilter('');
    setPkpFilter('');
  };

  return (
    <div className="h-full w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-3xl font-bold tracking-tight">Klien (WP)</h1>
        <p className="text-sm text-muted-foreground">
          Kelola data identitas, klasifikasi pajak, dan dokumen legal client
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        totalClients={summaryData.totalClients}
        activeClients={summaryData.activeClients}
        totalProjects={summaryData.totalProjects}
        complianceRate={summaryData.complianceRate}
      />

      {/* Main Content */}
      <div className="rounded-lg border bg-card">
        {/* Table Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Daftar Klien ({summaryData.totalClients})</h2>
            <p className="text-sm text-muted-foreground">
              Kelola data identitas, klasifikasi pajak, dan dokumen legal client
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Add Client Button */}
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Building2 className="h-4 w-4" />
              Tambah Klien
            </Button>

            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) =>
                  setPagination((prev) => ({ ...prev, pageSize: parseInt(value) }))
                }
              >
                <SelectTrigger className="h-8 w-[60px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="px-6 pb-4">
          <AdvancedFilters
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            pkpFilter={pkpFilter}
            onPkpFilterChange={setPkpFilter}
            onClearFilters={handleClearFilters}
            isFetching={isFetching}
          />
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading || isFetching}
            isError={!!error}
          />
        </div>
      </div>

      {/* Create Client Modal */}
      <CreateClientModalUpdated
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={async (data) => {
          try {
            await createClientMutation.mutateAsync({
              tenantId: tenant.id,
              data,
            });
            toast({
              title: 'Berhasil',
              description: 'Klien baru berhasil ditambahkan',
            });
            setShowCreateModal(false);
          } catch (error: any) {
            console.error('Failed to create client:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Terjadi kesalahan saat membuat klien';
            toast({
              title: 'Gagal membuat klien',
              description: errorMessage,
              variant: 'destructive',
            });
          }
        }}
      />
    </div>
  );
}
