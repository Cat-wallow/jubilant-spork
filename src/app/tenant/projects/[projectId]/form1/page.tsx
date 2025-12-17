'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getProjectById, type Project } from '@/services/project.service';
import { useBundles, useCreateBundle, type DocumentBundle } from '@/hooks/useBundles';
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
import { Switch } from '@/components/ui/switch';
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
} from 'lucide-react';
import { toast } from 'sonner';

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

export default function ProjectFormOnePage() {
  const params = useParams();
  const router = useRouter();
  const { tenant, user } = useAuth();
  const projectId = params.projectId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BundleRow['status']>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<'all' | string>('all');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [published, setPublished] = useState(false);
  const [isCreateBundleOpen, setIsCreateBundleOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundleType, setBundleType] = useState('');
  const [bundlePeriod, setBundlePeriod] = useState('');
  const [bundleScope, setBundleScope] = useState('');

  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  const { data: bundlesResponse } = useBundles(tenantId, projectId);
  const createBundleMutation = useCreateBundle();

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
    setBundlePeriod('');
    setBundleScope('');
  };

  const handleSubmitCreateBundle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bundleName.trim()) {
      toast.error('Nama bundle wajib diisi');
      return;
    }

    if (!bundlePeriod) {
      toast.error('Periode wajib dipilih');
      return;
    }

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
          assigneeName: user?.name,
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

  return (
    <div className="space-y-6 p-6">
      <Dialog open={isCreateBundleOpen} onOpenChange={setIsCreateBundleOpen}>
        <DialogContent className="max-w-xl sm:max-w-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle>Buat Bundle Dokumen</DialogTitle>
            <DialogDescription>
              Buat bundle dokumen di dalam Project {project?.code || projectId}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreateBundle} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="bundle-name">Nama Bundle</Label>
              <Select
                value={bundleName || 'default'}
                onValueChange={(val) => setBundleName(val === 'default' ? '' : val)}
              >
                <SelectTrigger id="bundle-name">
                  <SelectValue placeholder="Pilih nama bundle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default" disabled>
                    Pilih nama bundle
                  </SelectItem>
                  <SelectItem value="PO-Februari-Maret">PO-Februari-Maret</SelectItem>
                  <SelectItem value="PO-Q1-2023">PO-Q1-2023</SelectItem>
                  <SelectItem value="SO-Q1-2023">Sales Order Q1 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bundle-type">Jenis Bundle</Label>
                <Select
                  value={bundleType || 'default'}
                  onValueChange={(val) => setBundleType(val === 'default' ? '' : val)}
                >
                  <SelectTrigger id="bundle-type">
                    <SelectValue placeholder="Pilih jenis bundle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" disabled>
                      Pilih jenis bundle
                    </SelectItem>
                    <SelectItem value="po-feb-maret">PO-Februari-Maret</SelectItem>
                    <SelectItem value="invoice-feb-maret">Invoice-Februari-Maret</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bundle-period">Periode</Label>
                <Select
                  value={bundlePeriod || 'default'}
                  onValueChange={(val) => setBundlePeriod(val === 'default' ? '' : val)}
                >
                  <SelectTrigger id="bundle-period">
                    <SelectValue placeholder="Pilih periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" disabled>
                      Pilih periode
                    </SelectItem>
                    <SelectItem value="Januari-Maret">Januari-Maret</SelectItem>
                    <SelectItem value="Februari-Maret">Februari-Maret</SelectItem>
                    <SelectItem value="Q1 2023">Q1 2023</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Header breadcrumb + title */}
      <div className="space-y-4">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>Project</span>
          <span>/</span>
          <span>Form 1.0</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {isProjectLoading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              <h1 className="text-2xl font-semibold  text-slate-900 dark:text-slate-50">
                {`Kelola Form 1.0 ${project?.name || ''}`.trim()}
              </h1>
            )}
            {project?.clients?.name && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.clients.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Publish</span>
              <Switch checked={published} onCheckedChange={(v: boolean) => setPublished(v)} />
            </div>
            <Button onClick={handleCreateBundle} className="bg-blue-600 hover:bg-blue-700 text-white">
              Buat Bundle
            </Button>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none bg-blue-50/70 dark:bg-blue-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full bg-white/80 p-3 shadow-sm">
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
            <div className="rounded-full bg-white/80 p-3 shadow-sm">
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
            <div className="rounded-full bg-white/80 p-3 shadow-sm">
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
            <div className="rounded-full bg-white/80 p-3 shadow-sm">
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

      {/* Bundle List */}
      <Card className="mt-2">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Bundle List
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('xlsx')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export XLSX
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
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

              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nama Bundle"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-end">
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val as any);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={assigneeFilter}
                onValueChange={(val) => {
                  setAssigneeFilter(val as any);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignee</SelectItem>
                  {assignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-background overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Periode</TableHead>
                  <TableHead>Bundle Name</TableHead>
                  <TableHead>Dokumen</TableHead>
                  <TableHead>Gaps</TableHead>
                  <TableHead>Pernyataan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead className="w-[80px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-8 text-center text-sm text-muted-foreground">
                      Tidak ada bundle yang cocok dengan filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageItems.map((bundle) => (
                    <TableRow key={bundle.id}>
                      <TableCell>{bundle.period}</TableCell>
                      <TableCell className="font-medium">{bundle.name}</TableCell>
                      <TableCell>{bundle.documents}</TableCell>
                      <TableCell>
                        <span className="inline-flex min-w-[2rem] items-center justify-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                          {bundle.gaps}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex min-w-[2rem] items-center justify-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                          {bundle.statements}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusBadgeClasses(
                            bundle.status,
                          )}`}
                        >
                          {bundle.status}
                        </span>
                      </TableCell>
                      <TableCell>{bundle.assignee}</TableCell>
                      <TableCell>{formatDate(bundle.lastUpdate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              router.push(`/tenant/projects/${projectId}/form1/bundles/${bundle.id}`)
                            }
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => toast.info('Hapus bundle belum tersedia')}
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

          {/* Pagination summary */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
            <p>
              Showing {pageItems.length === 0 ? 0 : startIndex + 1}-{startIndex + pageItems.length} of{' '}
              {totalBundles} bundles
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
