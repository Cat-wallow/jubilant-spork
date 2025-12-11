'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDocuments, useUploadDocuments, useDeleteDocument, useUpdateWorkflow, Document, WorkflowStep, WorkflowStepKey } from '@/hooks/useDocuments';
import { AddDocumentModal, DocumentFormData } from './AddDocumentModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Upload,
  Search,
  FileText,
  Image,
  File,
  MoreHorizontal,
  Trash2,
  Eye,
  Download,
  Filter,
  X,
  Loader2,
  CheckCircle2,
  Pencil,
} from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types
// =============================================================================

interface DocumentsTabProps {
  projectId: string;
  tenantId: string;
  userId: string;
  pageTitle?: string;
  pageDescription?: string;
}

// Jenis Dokumen options (matching AddDocumentModal)
const JENIS_DOKUMEN_OPTIONS = [
  { value: 'ppn_masukan', label: 'PPN Masukan' },
  { value: 'ppn_keluaran', label: 'PPN Keluaran' },
  { value: 'pph_21', label: 'PPh 21' },
  { value: 'pph_22', label: 'PPh 22' },
  { value: 'pph_23', label: 'PPh 23' },
  { value: 'pph_4_2', label: 'PPh 4(2)' },
  { value: 'pph_25', label: 'PPh 25' },
  { value: 'pph_badan', label: 'PPh Badan' },
  { value: 'lainnya', label: 'Lainnya' },
];

// =============================================================================
// Helper Functions
// =============================================================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const WORKFLOW_STEP_CONFIG: Record<WorkflowStepKey, { title: string }> = {
  pengiriman: {
    title: 'Pengiriman dokumen oleh klien',
  },
  penerimaan: {
    title: 'Penerimaan dokumen',
  },
  digitalisasi: {
    title: 'Digitalisasi dokumen',
  },
  pendeskripsian: {
    title: 'Pendeskripsian dokumen',
  },
};

const getNextWorkflowStep = (doc: Document): WorkflowStepKey | null => {
  if (!doc.pengiriman?.status) return 'pengiriman';
  if (!doc.penerimaan?.status) return 'penerimaan';
  if (!doc.digitalisasi?.status) return 'digitalisasi';
  if (!doc.pendeskripsian?.status) return 'pendeskripsian';
  return null;
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return <Image className="h-5 w-5 text-purple-500" />;
  }
  if (mimeType === 'application/pdf') {
    return <FileText className="h-5 w-5 text-red-500" />;
  }
  return <File className="h-5 w-5 text-blue-500" />;
};

const getJenisDokumenBadgeColor = (jenisDokumen: string) => {
  const colors: Record<string, string> = {
    ppn_masukan: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    ppn_keluaran: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    pph_21: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pph_22: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    pph_23: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    pph_4_2: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    pph_25: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    pph_badan: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    lainnya: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  };
  return colors[jenisDokumen] || colors.lainnya;
};

const getStatusBadgeColor = (status: string) => {
  const colors: Record<string, string> = {
    digital: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    asli: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    copy: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

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

const renderWorkflowStep = (step?: WorkflowStep, showSource?: boolean) => {
  if (!step || !step.status) {
    return (
      <div className="flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-background" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5 text-xs">
      <div className="flex items-center gap-1">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        {showSource && step.source && (
          <span className="font-medium text-slate-700 dark:text-slate-100 truncate max-w-[90px]">
            {step.source}
          </span>
        )}
      </div>
      {step.date && (
        <span className="text-[11px] text-muted-foreground">{formatDate(step.date)}</span>
      )}
    </div>
  );
};

// =============================================================================
// Component
// =============================================================================

export function DocumentsTab({ projectId, tenantId, userId, pageTitle, pageDescription }: DocumentsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [jenisDokumenFilter, setJenisDokumenFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedDocForUpdate, setSelectedDocForUpdate] = useState<Document | null>(null);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<WorkflowStepKey | null>(null);
  const [updateDate, setUpdateDate] = useState<string>('');
  const router = useRouter();

  // Queries & Mutations
  const { data, isLoading, error } = useDocuments(tenantId, projectId, {
    search: searchQuery || undefined,
    jenisDokumen: jenisDokumenFilter || undefined,
    status: statusFilter || undefined,
    page,
    pageSize,
  });

  const uploadMutation = useUploadDocuments();
  const deleteMutation = useDeleteDocument();
  const updateWorkflowMutation = useUpdateWorkflow();

  // =============================================================================
  // Handlers
  // =============================================================================

  const handleAddDocument = async (formData: DocumentFormData) => {
    try {
      await uploadMutation.mutateAsync({
        tenantId,
        projectId,
        userId,
        payload: {
          files: formData.files,
          jenisDokumen: formData.jenisDokumen,
          tipeDokumen: formData.tipeDokumen,
          nomorDokumen: formData.nomorDokumen,
          documentDate: formData.tanggalDokumen,
          jumlahLembar: formData.jumlahLembar,
          asalDokumenSource: formData.asalDokumen,
          adminPicKlien: formData.adminPicKlien,
          divisi: formData.divisi,
          posisiDokumenAsli: formData.posisiDokumenAsli,
          noUrutSortiran: formData.noUrutSortiran || undefined,
          description: formData.catatan,
        },
      });

      toast.success('Dokumen berhasil ditambahkan');
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menambahkan dokumen');
      throw error;
    }
  };

  const handleViewDocument = (doc: Document) => {
    router.push(`/tenant/projects/${projectId}/form1/documents/${doc.id}`);
  };

  const handleDownloadDocument = (doc: Document) => {
    toast.info('Download dokumen belum tersedia');
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Hapus dokumen "${doc.originalFilename}"?`)) return;

    try {
      await deleteMutation.mutateAsync({
        tenantId,
        projectId,
        documentId: doc.id,
      });
      toast.success('Dokumen berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus dokumen');
    }
  };

  const handleOpenUpdateWorkflow = (doc: Document) => {
    const nextStep = getNextWorkflowStep(doc);

    if (!nextStep) {
      toast.info('Semua progress workflow untuk dokumen ini sudah lengkap');
      return;
    }

    setSelectedDocForUpdate(doc);
    setSelectedWorkflowStep(nextStep);
    setUpdateDate('');
    setIsUpdateDialogOpen(true);
  };

  const handleSubmitUpdateWorkflow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDocForUpdate || !selectedWorkflowStep) return;
    if (!updateDate) {
      toast.error('Tanggal wajib diisi');
      return;
    }

    try {
      await updateWorkflowMutation.mutateAsync({
        tenantId,
        projectId,
        documentId: selectedDocForUpdate.id,
        userId,
        workflowStep: selectedWorkflowStep,
        date: updateDate,
      });

      toast.success('Progress dokumen berhasil diperbarui');
      setIsUpdateDialogOpen(false);
      setSelectedDocForUpdate(null);
    } catch (error) {
      toast.error('Gagal memperbarui progress dokumen');
    }
  };

  // =============================================================================
  // Render
  // =============================================================================

  const totalDocs = data?.stats.total ?? 0;
  const totalDigital = data?.stats.digital ?? 0;
  const totalAsli = data?.stats.asli ?? 0;
  const totalCopy = data?.stats.copy ?? 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {pageTitle ?? 'Kelola Form 1.0 - Dokumen Proyek'}
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {pageDescription ??
            'Halaman utama untuk mengelola dokumen Form 1.0 pada project ini, mulai dari upload hingga progres workflow.'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dokumen Diupload
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {totalDocs}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dokumen Asli
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {totalAsli}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dokumen Copy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {totalCopy}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dokumen Digital
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {totalDigital}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Page size */}
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

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama dokumen atau nomor dokumen..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>

          {/* Jenis Dokumen filter */}
          <Select
            value={jenisDokumenFilter || 'all'}
            onValueChange={(val) => {
              setJenisDokumenFilter(val === 'all' ? '' : val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[190px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Semua Jenis Dokumen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenis Dokumen</SelectItem>
              {JENIS_DOKUMEN_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select
            value={statusFilter || 'all'}
            onValueChange={(val) => {
              setStatusFilter(val === 'all' ? '' : val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
              <SelectItem value="asli">Asli</SelectItem>
              <SelectItem value="copy">Copy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('Export XLSX belum tersedia')}
          >
            <Download className="mr-2 h-4 w-4" />
            Export XLSX
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('Export PDF belum tersedia')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Tambah Dokumen
          </Button>

          <AddDocumentModal
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
            onSubmit={handleAddDocument}
            isLoading={uploadMutation.isPending}
          />
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Daftar Dokumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Gagal memuat dokumen. Silakan coba lagi.
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">
                Belum ada dokumen
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload dokumen pertama untuk proyek ini
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis Dokumen</TableHead>
                    <TableHead>Tipe Dokumen</TableHead>
                    <TableHead>Nomor Dokumen</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jumlah Lembar</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Asal Dokumen</TableHead>
                    <TableHead>Pengiriman</TableHead>
                    <TableHead>Penerimaan</TableHead>
                    <TableHead>Digitalisasi</TableHead>
                    <TableHead>Pendeskripsian</TableHead>
                    <TableHead>Foldering</TableHead>
                    <TableHead>Entry Data</TableHead>
                    <TableHead>Telaah Pajak</TableHead>
                    <TableHead>Telaah Pembukuan</TableHead>
                    <TableHead>Pengarsipan</TableHead>
                    <TableHead>Pengembalian</TableHead>
                    <TableHead>Berita Acara</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getJenisDokumenBadgeColor(doc.jenisDokumen)}
                        >
                          {JENIS_DOKUMEN_OPTIONS.find((opt) => opt.value === doc.jenisDokumen)?.label ||
                            doc.jenisDokumen}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-700 dark:text-slate-100">
                        {doc.tipeDokumen || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-50">
                            {doc.nomorDokumen || '-'}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[220px]">
                            {doc.originalFilename}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(doc.documentDate)}
                      </TableCell>
                      <TableCell className="text-sm text-slate-700 dark:text-slate-100">
                        {doc.jumlahLembar}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getStatusBadgeColor(doc.status)}
                        >
                          {doc.status === 'digital'
                            ? 'Digital'
                            : doc.status === 'asli'
                            ? 'Asli'
                            : doc.status === 'copy'
                            ? 'Copy'
                            : doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{renderWorkflowStep(doc.asalDokumen, true)}</TableCell>
                      <TableCell>{renderWorkflowStep(doc.pengiriman)}</TableCell>
                      <TableCell>{renderWorkflowStep(doc.penerimaan)}</TableCell>
                      <TableCell>{renderWorkflowStep(doc.digitalisasi)}</TableCell>
                      <TableCell>{renderWorkflowStep(doc.pendeskripsian)}</TableCell>
                      {/* Future workflow columns - currently placeholders */}
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>{renderWorkflowStep(undefined)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenUpdateWorkflow(doc)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadDocument(doc)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(doc)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data && data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {data.items.length} dari {data.pagination.total} dokumen
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= data.pagination.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Update Workflow Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-lg">
          <form onSubmit={handleSubmitUpdateWorkflow} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Lembar Pengendalian Arus Dokumen
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Update Progress Dokumen
              </DialogDescription>
            </DialogHeader>

            {selectedWorkflowStep && (
              <div className="space-y-4">
                <div className="rounded-md border bg-muted/40 p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {WORKFLOW_STEP_CONFIG[selectedWorkflowStep].title}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="update-name">Nama</Label>
                    <Input
                      id="update-name"
                      value={selectedDocForUpdate?.uploadedBy ?? userId}
                      readOnly
                      className="bg-muted/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="update-date">Tanggal *</Label>
                    <Input
                      id="update-date"
                      type="date"
                      required
                      value={updateDate}
                      onChange={(e) => setUpdateDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUpdateDialogOpen(false)}
                disabled={updateWorkflowMutation.isPending}
              >
                Batal
              </Button>
              <Button type="submit" disabled={updateWorkflowMutation.isPending}>
                {updateWorkflowMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
