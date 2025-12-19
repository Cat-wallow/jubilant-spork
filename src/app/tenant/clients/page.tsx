
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useClients, useCreateClient, useDeleteClient, useTenantComplianceSummary, useTerminateClient, useActivateClient } from '@/hooks/useClients';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Ban,
  CheckCircle,
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

interface ClientDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onConfirm: () => void;
  isDeleting: boolean;
}

function ClientDeleteDialog({
  open,
  onOpenChange,
  client,
  onConfirm,
  isDeleting,
}: ClientDeleteDialogProps) {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText === 'SETUJU';

  useEffect(() => {
    if (open) {
      setConfirmText('');
    }
  }, [open]);

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Klien</DialogTitle>
          <DialogDescription>
            Apakah anda yakin? menghapus klien ini berarti kehilangan{' '}
            <span className="font-bold text-red-500">
              {client.active_projects || 0} project
            </span>{' '}
            dari klien tersebut. Tindakan ini tidak dapat dibatalkan sepenuhnya (soft delete).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-text">
              Ketik <span className="font-bold">SETUJU</span> untuk melanjutkan
            </Label>
            <Input
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Ketik SETUJU"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!isConfirmed || isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Klien'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ClientTerminateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onConfirm: () => void;
  isTerminating: boolean;
}

function ClientTerminateDialog({
  open,
  onOpenChange,
  client,
  onConfirm,
  isTerminating,
}: ClientTerminateDialogProps) {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText === 'PUTUS';

  useEffect(() => {
    if (open) {
      setConfirmText('');
    }
  }, [open]);

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Putus Kerja Sama</DialogTitle>
          <DialogDescription asChild>
            <div>
              Apakah anda yakin ingin memutus kerja sama dengan <span className="font-bold">{client.name}</span>?
              <br /><br />
              Tindakan ini akan:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Mengubah status klien menjadi <span className="font-bold text-orange-600">Non Aktif</span></li>
                <li>Menangguhkan (suspend) semua <span className="font-bold">{client.active_projects || 0} project aktif</span></li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-terminate">
              Ketik <span className="font-bold">PUTUS</span> untuk melanjutkan
            </Label>
            <Input
              id="confirm-terminate"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Ketik PUTUS"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!isConfirmed || isTerminating}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isTerminating ? 'Memproses...' : 'Putus Kerja Sama'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ClientActivateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onConfirm: () => void;
  isActivating: boolean;
}

function ClientActivateDialog({
  open,
  onOpenChange,
  client,
  onConfirm,
  isActivating,
}: ClientActivateDialogProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aktifkan Klien</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin mengaktifkan kembali klien <span className="font-bold">{client.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={onConfirm}
            disabled={isActivating}
          >
            {isActivating ? 'Mengaktifkan...' : 'Ya, Aktifkan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ClientsPage() {
  const { tenant } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const createClientMutation = useCreateClient();
  const deleteClientMutation = useDeleteClient();
  const terminateClientMutation = useTerminateClient();
  const activateClientMutation = useActivateClient();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>('');
  const [pkpFilter, setPkpFilter] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [businessTypeOptions, setBusinessTypeOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [clientToTerminate, setClientToTerminate] = useState<Client | null>(null);
  const [showTerminateDialog, setShowTerminateDialog] = useState(false);
  const [clientToActivate, setClientToActivate] = useState<Client | null>(null);
  const [showActivateDialog, setShowActivateDialog] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadBusinessTypes = async () => {
      try {
        const resp = await api.get('project/reference-types', {
          params: { type: 'BUSINESS_TYPE' },
        });

        const data = resp?.data?.data ?? resp?.data ?? [];
        const normalized = Array.isArray(data)
          ? data
              .map((item: any) => ({
                id: String(item?.id ?? item?.name ?? ''),
                name: String(item?.name ?? item?.description ?? item?.id ?? ''),
              }))
              .filter((x: any) => x.id && x.name)
          : [];

        if (!cancelled) setBusinessTypeOptions(normalized);
      } catch {
        if (!cancelled) setBusinessTypeOptions([]);
      }
    };

    loadBusinessTypes();
    return () => {
      cancelled = true;
    };
  }, []);

  const { data, isLoading, isFetching, error } = useClients({
    tenantId: tenant.id,
    search: debouncedSearchQuery,
    status: statusFilter,
    business_type: businessTypeFilter,
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
        accessorKey: 'business_type',
        header: 'Jenis Usaha',
        cell: ({ row }) => {
          const businessType = row.getValue('business_type') as string | null | undefined;
          return businessType || '-';
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
        accessorKey: 'project_fiscal_year',
        header: 'Masa Pajak / Volume',
        cell: ({ row }) => {
          const fy = row.original.project_fiscal_year;
          const volRaw = row.original.project_volume as any;
          const volNum = typeof volRaw === 'number' ? volRaw : volRaw ? Number(volRaw) : null;
          const vol = volNum && !Number.isNaN(volNum)
            ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(volNum)
            : '-';

          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{fy ? `FY ${fy}` : '-'}</span>
              <span className="text-xs text-muted-foreground">{vol}</span>
            </div>
          );
        },
      },
      {
        id: 'work_period',
        header: 'Periode Pengerjaan',
        cell: ({ row }) => {
          const start = row.original.project_start_date;
          const end = row.original.project_end_date;
          if (!start && !end) return <span className="text-sm text-muted-foreground">-</span>;

          const startStr = start
            ? new Date(start).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            : '-';
          const endStr = end
            ? new Date(end).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            : '-';

          return (
            <span className="text-sm">{startStr} - {endStr}</span>
          );
        },
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
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/tenant/clients/${row.original.id}/edit`); }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/tenant/clients/${row.original.id}`); }}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              
              {row.original.status === 'inactive' ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-green-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setClientToActivate(row.original);
                      setShowActivateDialog(true);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aktifkan
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-orange-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setClientToTerminate(row.original);
                      setShowTerminateDialog(true);
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Putus Kerja Sama
                  </DropdownMenuItem>
                </>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setClientToDelete(row.original);
                  setShowDeleteDialog(true);
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
    [
      deleteClientMutation,
      terminateClientMutation,
      activateClientMutation,
      tenant.id,
      router,
      setClientToDelete,
      setShowDeleteDialog,
      setClientToTerminate,
      setShowTerminateDialog,
      setClientToActivate,
      setShowActivateDialog
    ]
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
    setBusinessTypeFilter('');
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
            businessTypeFilter={businessTypeFilter}
            onBusinessTypeFilterChange={setBusinessTypeFilter}
            businessTypeOptions={businessTypeOptions}
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
            onRowClick={(row) => router.push(`/tenant/clients/${(row as any).original.id}`)}
          />
        </div>
      </div>

      {/* Create Client Modal */}
      <CreateClientModalUpdated
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={async (data) => {
          return createClientMutation.mutateAsync({
            tenantId: tenant.id,
            data,
          });
        }}
      />

      <ClientDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        client={clientToDelete}
        isDeleting={deleteClientMutation.isPending}
        onConfirm={() => {
          if (clientToDelete) {
            deleteClientMutation.mutate(
              {
                tenantId: tenant.id,
                id: clientToDelete.id,
              },
              {
                onSuccess: () => {
                  toast({
                    title: 'Berhasil',
                    description: 'Klien berhasil dihapus',
                  });
                  setShowDeleteDialog(false);
                  setClientToDelete(null);
                },
                onError: (error: any) => {
                  const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Terjadi kesalahan saat menghapus klien';
                  toast({
                    title: 'Gagal menghapus klien',
                    description: errorMessage,
                    variant: 'destructive',
                  });
                },
              }
            );
          }
        }}
      />

      <ClientTerminateDialog
        open={showTerminateDialog}
        onOpenChange={setShowTerminateDialog}
        client={clientToTerminate}
        isTerminating={terminateClientMutation.isPending}
        onConfirm={() => {
          if (clientToTerminate) {
            terminateClientMutation.mutate(
              {
                tenantId: tenant.id,
                id: clientToTerminate.id,
              },
              {
                onSuccess: () => {
                  toast({
                    title: 'Berhasil',
                    description: 'Kerja sama berhasil diputus',
                  });
                  setShowTerminateDialog(false);
                  setClientToTerminate(null);
                },
                onError: (error: any) => {
                  const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Terjadi kesalahan saat memutus kerja sama';
                  toast({
                    title: 'Gagal memutus kerja sama',
                    description: errorMessage,
                    variant: 'destructive',
                  });
                },
              }
            );
          }
        }}
      />

      <ClientActivateDialog
        open={showActivateDialog}
        onOpenChange={setShowActivateDialog}
        client={clientToActivate}
        isActivating={activateClientMutation.isPending}
        onConfirm={() => {
          if (clientToActivate) {
            activateClientMutation.mutate(
              {
                tenantId: tenant.id,
                id: clientToActivate.id,
              },
              {
                onSuccess: () => {
                  toast({
                    title: 'Berhasil',
                    description: 'Klien berhasil diaktifkan kembali',
                  });
                  setShowActivateDialog(false);
                  setClientToActivate(null);
                },
                onError: (error: any) => {
                  const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Terjadi kesalahan saat mengaktifkan klien';
                  toast({
                    title: 'Gagal mengaktifkan klien',
                    description: errorMessage,
                    variant: 'destructive',
                  });
                },
              }
            );
          }
        }}
      />
    </div>
  );
}
