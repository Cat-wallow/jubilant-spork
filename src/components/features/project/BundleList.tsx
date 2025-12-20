'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReferenceTypes } from '@/services/reference-type.service';
import { useBundles, useCreateBundle, useDeleteBundle, type DocumentBundle } from '@/hooks/useBundles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Edit3,
  Trash2,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type BundleRow = DocumentBundle;

const formatDate = (value: string | null) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getStatusBadgeClasses = (status: BundleRow['status']) => {
  if (status === 'Selesai') return 'bg-emerald-100 text-emerald-800';
  if (status === 'In Review') return 'bg-amber-100 text-amber-800';
  return 'bg-blue-100 text-blue-800';
};

interface BundleListProps {
  projectId: string;
  tenantId: string;
  userId: string;
  userName?: string;
}

export function BundleList({ projectId, tenantId, userId, userName }: BundleListProps) {
  const router = useRouter();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BundleRow['status']>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<'all' | string>('all');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [isCreateBundleOpen, setIsCreateBundleOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundleType, setBundleType] = useState<string>('');
  
  // Period state
  const [date, setDate] = useState<DateRange | undefined>();
  
  const [bundleScope, setBundleScope] = useState('');

  const { data: bundleTypes, isLoading: isBundleTypesLoading } = useQuery({
    queryKey: ['reference-types', 'JENIS_BUNDLE'],
    queryFn: () => getReferenceTypes('JENIS_BUNDLE'),
  });

  const { data: bundlesResponse, isLoading: isBundlesLoading } = useBundles(tenantId, projectId);
  const createBundleMutation = useCreateBundle();
  const deleteBundleMutation = useDeleteBundle();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<BundleRow | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const bundles: BundleRow[] = useMemo(
    () => bundlesResponse?.items ?? [],
    [bundlesResponse],
  );

  const assignees = useMemo(
    () => Array.from(new Set(bundles.map((b) => b.assignee).filter(Boolean) as string[])),
    [bundles],
  );

  const filteredBundles = useMemo(() => {
    return bundles.filter((bundle) => {
      if (search && !bundle.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && bundle.status !== statusFilter) {
        return false;
      }
      if (assigneeFilter !== 'all' && bundle.assignee !== assigneeFilter) {
        return false;
      }
      return true;
    });
  }, [bundles, search, statusFilter, assigneeFilter]);

  const totalBundles = filteredBundles.length;
  const totalGaps = filteredBundles.reduce((sum, b) => sum + b.gaps, 0);
  const totalStatements = filteredBundles.reduce((sum, b) => sum + b.statements, 0);
  const bundlesWithNoGaps = filteredBundles.filter((b) => b.gaps === 0).length;
  const complianceRate = totalBundles > 0 ? (bundlesWithNoGaps / totalBundles) * 100 : 0;
  const bundlesReady = filteredBundles.filter((b) => b.status === 'Selesai').length;

  const totalPages = Math.max(1, Math.ceil(totalBundles / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredBundles.slice(startIndex, startIndex + pageSize);

  const handleExport = (type: 'xlsx' | 'pdf') => {
    toast.info(`Export ${type.toUpperCase()} belum tersedia`);
  };

  const handleCreateBundle = () => {
    setIsCreateBundleOpen(true);
  };

  const resetBundleForm = () => {
    setBundleName('');
    setBundleType('');
    setDate(undefined);
    setBundleScope('');
  };

  const handleSubmitCreateBundle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bundleName.trim()) {
      toast.error('Nama bundle wajib diisi');
      return;
    }

    if (!date?.from || !date?.to) {
      toast.error('Periode lengkap wajib dipilih');
      return;
    }

    const bundlePeriod = `${format(date.from, 'dd MMM yyyy', { locale: id })} - ${format(date.to, 'dd MMM yyyy', { locale: id })}`;

    if (!bundleScope.trim()) {
      toast.error('Scope pekerjaan wajib diisi');
      return;
    }

    if (!tenantId || !userId) {
      toast.error('Tenant atau user tidak valid');
      return;
    }

    try {
      await createBundleMutation.mutateAsync({
        tenantId,
        projectId,
        userId,
        payload: {
          name: bundleName.trim(),
          bundleType,
          period: bundlePeriod,
          scope: bundleScope,
          assigneeName: userName,
        },
      });

      toast.success('Bundle berhasil dibuat');
      resetBundleForm();
      setIsCreateBundleOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Gagal membuat bundle');
    }
  };

  const handleDeleteClick = (bundle: BundleRow) => {
    setBundleToDelete(bundle);
    setDeleteConfirmationText('');
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bundleToDelete) return;
    if (deleteConfirmationText !== 'SETUJU') {
      toast.error('Ketik SETUJU untuk mengkonfirmasi penghapusan');
      return;
    }

    try {
      await deleteBundleMutation.mutateAsync({
        tenantId,
        projectId,
        bundleId: bundleToDelete.id,
        userId,
      });

      toast.success('Bundle berhasil dihapus (Soft Delete)');
      setIsDeleteOpen(false);
      setBundleToDelete(null);
      setDeleteConfirmationText('');
    } catch (error) {
      toast.error('Gagal menghapus bundle');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Dialog open={isCreateBundleOpen} onOpenChange={setIsCreateBundleOpen}>
        <DialogContent className="max-w-xl sm:max-w-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle>Buat Bundle Dokumen</DialogTitle>
            <DialogDescription>
              Buat bundle dokumen di dalam Project
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreateBundle} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="bundle-name">Nama Bundle</Label>
              <Input
                id="bundle-name"
                value={bundleName}
                onChange={(e) => setBundleName(e.target.value)}
                placeholder="Masukkan nama bundle (contoh: PO-Februari-Maret)"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bundle-type">Jenis Bundle</Label>
                <Select
                  value={bundleType || undefined}
                  onValueChange={setBundleType}
                >
                  <SelectTrigger id="bundle-type">
                    <SelectValue placeholder="Pilih jenis bundle" />
                  </SelectTrigger>
                  <SelectContent>
                    {isBundleTypesLoading ? (
                       <div className="p-2 text-sm text-muted-foreground">Loading...</div>
                    ) : bundleTypes && Array.isArray(bundleTypes) && bundleTypes.length > 0 ? (
                      bundleTypes.map((type: any) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))
                    ) : (
                      // Fallback if no types found or loading
                      <>
                        <SelectItem value="PO">PO</SelectItem>
                        <SelectItem value="Invoice">Invoice</SelectItem>
                        <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Periode</Label>
              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "dd MMM yyyy", { locale: id })} -{" "}
                            {format(date.to, "dd MMM yyyy", { locale: id })}
                          </>
                        ) : (
                          format(date.from, "dd MMM yyyy", { locale: id })
                        )
                      ) : (
                        <span>Pilih periode</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bundle-scope">
                Scope Pekerjaan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="bundle-scope"
                placeholder="Deskripsi catatan"
                value={bundleScope}
                onChange={(e) => setBundleScope(e.target.value)}
                className="min-h-[96px]"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetBundleForm();
                  setIsCreateBundleOpen(false);
                }}
              >
                Batal
              </Button>
              <Button type="submit" disabled={createBundleMutation.isPending}>
                {createBundleMutation.isPending ? 'Membuat Bundle...' : 'Buat Bundle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Metric cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none bg-blue-50/70 dark:bg-blue-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-card/80 p-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-700">Compliance Rate</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {complianceRate.toFixed(1)}%
              </p>
              <p className="text-[11px] text-muted-foreground">Rata-rata semua bundle</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-red-50/70 dark:bg-red-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-card/80 p-3 shadow-sm">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-700">Total Gaps</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{totalGaps}</p>
              <p className="text-[11px] text-muted-foreground">Dokumen tidak lengkap</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-violet-50/70 dark:bg-violet-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-card/80 p-3 shadow-sm">
              <FileText className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-violet-700">Pernyataan</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{totalStatements}</p>
              <p className="text-[11px] text-muted-foreground">Pernyataan ketidaksesuaian dokumen</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-emerald-50/70 dark:bg-emerald-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-card/80 p-3 shadow-sm">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-700">Bundle Siap Entry</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {bundlesReady}/{totalBundles || 1}
              </p>
              <p className="text-[11px] text-muted-foreground">Bundle siap diproses ke tahap berikutnya</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-2">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Bundle List
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Button onClick={handleCreateBundle} className="bg-blue-600 hover:bg-blue-700 text-white">
                Buat Bundle
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('xlsx')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export XLSX
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={String(pageSize)}
                onValueChange={(val) => {
                  const size = parseInt(val, 10) || 10;
                  setPageSize(size);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full md:w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari bundle..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={(val) => setStatusFilter(val as any)}
              >
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={assigneeFilter}
                onValueChange={(val) => setAssigneeFilter(val)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Assignee</SelectItem>
                  {assignees.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nama Bundle</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Gaps</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isBundlesLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Tidak ada bundle ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageItems.map((bundle) => (
                    <TableRow
                      key={bundle.id}
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900"
                      onClick={() => router.push(`form1/bundles/${bundle.id}`)}
                    >
                      <TableCell className="font-medium">
                        {bundle.name}
                      </TableCell>
                      <TableCell>{bundle.bundleType}</TableCell>
                      <TableCell>{bundle.period}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-medium text-blue-700">
                            {bundle.assignee?.charAt(0) || '?'}
                          </div>
                          <span className="text-sm">{bundle.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {bundle.gaps > 0 ? (
                          <span className="flex items-center text-red-600 text-sm font-medium">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            {bundle.gaps}
                          </span>
                        ) : (
                          <span className="flex items-center text-emerald-600 text-sm font-medium">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            0
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClasses(bundle.status)}`}>
                          {bundle.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(bundle.lastUpdate)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(bundle);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, totalBundles)} of {totalBundles} entries
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Bundle</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus bundle ini? Ketik <strong>SETUJU</strong> untuk mengkonfirmasi.
              Data yang dihapus (soft delete) masih dapat dikembalikan oleh administrator database jika diperlukan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nama Bundle</Label>
              <Input disabled value={bundleToDelete?.name || ''} />
            </div>
            <div className="space-y-2">
              <Label>Konfirmasi Penghapusan</Label>
              <Input
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Ketik SETUJU"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteConfirmationText !== 'SETUJU' || deleteBundleMutation.isPending}
            >
              {deleteBundleMutation.isPending ? 'Menghapus...' : 'Hapus Bundle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
