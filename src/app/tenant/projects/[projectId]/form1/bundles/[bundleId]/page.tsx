'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getReferenceTypes } from '@/services/reference-type.service';
import { useDocuments, useUploadDocuments, useUpdateWorkflow } from '@/hooks/useDocuments';
import { useBundle } from '@/hooks/useBundles';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUploader } from '@/components/shared/FileUploader';
import { ArrowLeft, Download, Plus, CalendarIcon, CheckCircle2, Circle, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const WORKFLOW_STEPS = [
  { key: 'asalDokumen', label: 'Asal Dokumen' },
  { key: 'pengiriman', label: 'Pengiriman' },
  { key: 'penerimaan', label: 'Penerimaan' },
  { key: 'digitalisasi', label: 'Digitalisasi' },
  { key: 'pendeskripsian', label: 'Pendeskripsian' },
  { key: 'foldering', label: 'Foldering' },
  { key: 'entryData', label: 'Entry Data' },
  { key: 'telaahPajak', label: 'Telaah Pajak' },
  { key: 'telaahPembukuan', label: 'Telaah Pembukuan' },
  { key: 'pengarsipan', label: 'Pengarsipan' },
  { key: 'pengembalian', label: 'Pengembalian' },
  { key: 'beritaAcara', label: 'Berita Acara' },
];

export default function FormOneBundleDetailPage() {
  const params = useParams();
  const { tenant, user } = useAuth();

  const projectId = params.projectId as string;
  const bundleId = params.bundleId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [statusFilter, setStatusFilter] = useState<'all' | 'digital' | 'asli' | 'copy'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [tipeDokumen, setTipeDokumen] = useState('');
  const [jenisDokumen, setJenisDokumen] = useState('');
  const [nomorDokumen, setNomorDokumen] = useState('');
  const [documentDate, setDocumentDate] = useState<Date | undefined>(undefined);
  const [jumlahLembar, setJumlahLembar] = useState<number>(1);
  const [docStatus, setDocStatus] = useState<'digital' | 'asli' | 'copy'>('digital');
  const [adminPicKlien, setAdminPicKlien] = useState('');
  const [divisi, setDivisi] = useState('');
  const [posisiDokumenAsli, setPosisiDokumenAsli] = useState('');
  const [noUrutSortiran, setNoUrutSortiran] = useState('');
  const [catatan, setCatatan] = useState('');

  const uploadMutation = useUploadDocuments();
  const updateWorkflowMutation = useUpdateWorkflow();

  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);
  const [selectedWorkflowDoc, setSelectedWorkflowDoc] = useState<any>(null);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<string>('');
  const [workflowDate, setWorkflowDate] = useState<Date | undefined>(new Date());

  const isStepClickable = (doc: any, stepKey: string) => {
    const stepIndex = WORKFLOW_STEPS.findIndex(s => s.key === stepKey);
    if (stepIndex <= 0) return true;
    
    const prevStepKey = WORKFLOW_STEPS[stepIndex - 1].key;
    return doc[prevStepKey]?.status === true;
  };

  const handleWorkflowClick = (doc: any, stepKey: string) => {
    if (doc[stepKey]?.status) return; // Already done
    
    if (!isStepClickable(doc, stepKey)) {
      toast.error('Harap selesaikan tahapan sebelumnya terlebih dahulu.');
      return;
    }
    
    setSelectedWorkflowDoc(doc);
    setSelectedWorkflowStep(stepKey);
    setWorkflowDate(new Date());
    setIsWorkflowDialogOpen(true);
  };

  const handleWorkflowSave = async () => {
    if (!workflowDate) {
      toast.error('Tanggal wajib diisi');
      return;
    }
    
    try {
      await updateWorkflowMutation.mutateAsync({
        tenantId,
        projectId,
        documentId: selectedWorkflowDoc.id,
        userId,
        workflowStep: selectedWorkflowStep as any,
        date: format(workflowDate, 'yyyy-MM-dd'),
      });
      
      toast.success('Status workflow berhasil diupdate');
      setIsWorkflowDialogOpen(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Gagal update status workflow';
      toast.error(msg);
    }
  };

  const { data: bundle } = useBundle(tenantId, projectId, bundleId);

  const { data, isLoading, error } = useDocuments(
    tenantId,
    projectId,
    {
      bundleId,
      search: debouncedSearch || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
      page: 1,
      pageSize,
    },
    { enabled: !!tenantId && !!projectId && !!bundleId },
  );

  const { data: documentTypes } = useQuery({
    queryKey: ['reference-types', 'JENIS_DOKUMEN'],
    queryFn: () => getReferenceTypes('JENIS_DOKUMEN'),
  });

  const { data: tipeDocumentTypes } = useQuery({
    queryKey: ['reference-types', 'TIPE_DOKUMEN'],
    queryFn: () => getReferenceTypes('TIPE_DOKUMEN'),
  });

  const pagedDocs = useMemo(() => {
    const items = data?.items ?? [];
    if (items.length === 0) return items;
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [data?.items, page, pageSize]);

  const totalDocs = data?.stats?.total ?? (data?.items?.length ?? 0);
  const digitalDocs = data?.stats?.digital ?? 0;
  const asliDocs = data?.stats?.asli ?? 0;
  const copyDocs = data?.stats?.copy ?? 0;

  const resetUploadForm = () => {
    setFiles(null);
    setTipeDokumen('');
    setJenisDokumen('');
    setNomorDokumen('');
    setDocumentDate(undefined);
    setJumlahLembar(1);
    setDocStatus('digital');
    setAdminPicKlien('');
    setDivisi('');
    setPosisiDokumenAsli('');
    setNoUrutSortiran('');
    setCatatan('');
  };

  const handleUpload = async () => {
    if (!tenantId || !userId) {
      toast.error('Session tidak valid. Silakan login ulang.');
      return;
    }
    if (!files || files.length === 0) {
      toast.error('Pilih file dokumen dulu.');
      return;
    }
    if (!tipeDokumen.trim() || !jenisDokumen.trim()) {
      toast.error('Tipe Dokumen dan Jenis Dokumen wajib diisi.');
      return;
    }
    if (!nomorDokumen.trim() || !documentDate) {
      toast.error('Nomor Dokumen dan Tanggal Dokumen wajib diisi.');
      return;
    }
    if (!jumlahLembar || jumlahLembar < 1) {
      toast.error('Jumlah lembar minimal 1.');
      return;
    }
    if (!adminPicKlien.trim() || !divisi.trim() || !posisiDokumenAsli.trim()) {
      toast.error('Informasi administrasi wajib diisi.');
      return;
    }
    if (!catatan.trim()) {
      toast.error('Catatan wajib diisi.');
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        tenantId,
        projectId,
        userId,
        payload: {
          files,
          tipeDokumen: tipeDokumen.trim(),
          jenisDokumen: jenisDokumen.trim(),
          nomorDokumen: nomorDokumen.trim(),
          documentDate: format(documentDate, 'yyyy-MM-dd'),
          jumlahLembar,
          status: docStatus,
          description: catatan.trim(),
          adminPicKlien: adminPicKlien.trim(),
          divisi: divisi.trim(),
          posisiDokumenAsli: posisiDokumenAsli.trim(),
          noUrutSortiran: noUrutSortiran.trim() || undefined,
          bundleId,
        },
      });
      toast.success('Dokumen berhasil ditambahkan ke bundle');
      setIsUploadOpen(false);
      resetUploadForm();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Gagal upload dokumen';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Form 1.0 - Lembar Pengendalian Arus Dokumen
          </h1>
          <p className="text-sm text-muted-foreground">Detail bundle <strong>{bundle?.name || bundleId}</strong></p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => toast.info('Export XLSX belum tersedia')}
          >
            <Download className="mr-2 h-4 w-4" />
            Export XLSX
          </Button>
          <Button onClick={() => setIsUploadOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dokumen
          </Button>
          <Button asChild variant="outline">
            <Link href={`/tenant/projects/${projectId}/form1`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none bg-blue-50/70 dark:bg-blue-950/30">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-blue-700">Dokumen Diupload</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{totalDocs}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Keseluruhan dokumen</div>
          </CardContent>
        </Card>
        <Card className="border-none bg-emerald-50/70 dark:bg-emerald-950/30">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-emerald-700">Dokumen Asli</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{asliDocs}</div>
          </CardContent>
        </Card>
        <Card className="border-none bg-amber-50/70 dark:bg-amber-950/30">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-amber-700">Dokumen Copy</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{copyDocs}</div>
          </CardContent>
        </Card>
        <Card className="border-none bg-violet-50/70 dark:bg-violet-950/30">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-violet-700">Dokumen Digital</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">{digitalDocs}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Daftar Dokumen</CardTitle>
              <p className="text-xs text-muted-foreground">Kelola dokumen di dalam bundle</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info('Export XLSX belum tersedia')}>
                <Download className="mr-2 h-4 w-4" />
                Export XLSX
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info('Export PDF belum tersedia')}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {!tenantId || !userId ? (
            <p className="text-sm text-red-500">Session tidak valid. Silakan login ulang.</p>
          ) : isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error || !data ? (
            <p className="text-sm text-red-500">
              {(error as any)?.response?.data?.message || (error as any)?.message || "Gagal memuat dokumen bundle."}
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(parseInt(v, 10))}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative w-full md:w-[360px]">
                    <Input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Cari dokumen..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={statusFilter} onValueChange={(v) => {
                    setStatusFilter(v as any);
                    setPage(1);
                  }}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="asli">Asli</SelectItem>
                      <SelectItem value="copy">Copy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {data.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada dokumen yang cocok dengan filter.</p>
              ) : (
                <>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Identitas Dokumen</TableHead>
                          {WORKFLOW_STEPS.map((step) => (
                            <TableHead key={step.key} className="text-center min-w-[120px] whitespace-nowrap">{step.label}</TableHead>
                          ))}
                          <TableHead className="text-right min-w-[100px]">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagedDocs.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <Link href={`/tenant/projects/${projectId}/form1/documents/${doc.id}`} className="block p-1 -m-1">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">{doc.jenisDokumen}</span>
                                  <span className="text-xs text-muted-foreground">{doc.tipeDokumen}</span>
                                  <span className="text-xs text-muted-foreground">{doc.nomorDokumen || '-'}</span>
                                  <span className="text-xs text-muted-foreground">{doc.documentDate ? format(new Date(doc.documentDate), 'dd/MM/yyyy') : '-'}</span>
                                </div>
                              </Link>
                            </TableCell>
                            {WORKFLOW_STEPS.map((step) => {
                              const isDone = doc[step.key]?.status === true;
                              const clickable = !isDone && isStepClickable(doc, step.key);
                              
                              return (
                                <TableCell key={step.key} className="text-center p-2">
                                  <div 
                                    className={cn(
                                      "inline-flex justify-center items-center p-2 rounded-full transition-all",
                                      clickable && "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110",
                                      !clickable && !isDone && "opacity-30 cursor-not-allowed"
                                    )}
                                    onClick={() => clickable && handleWorkflowClick(doc, step.key)}
                                    title={isDone ? `Selesai oleh ${doc[step.key]?.by || '-'} pada ${doc[step.key]?.date ? format(new Date(doc[step.key]?.date), 'dd/MM/yyyy') : '-'}` : (clickable ? "Klik untuk update status" : "Selesaikan tahap sebelumnya")}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="h-6 w-6 text-green-600 fill-green-50" />
                                    ) : (
                                      <Circle className="h-6 w-6 text-slate-300" />
                                    )}
                                  </div>
                                  {isDone && (
                                    <div className="flex flex-col items-center mt-1">
                                      {doc[step.key]?.byName && (
                                        <div className="text-[10px] font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate text-center">
                                          {doc[step.key]?.byName}
                                        </div>
                                      )}
                                      {doc[step.key]?.date && (
                                        <div className="text-[10px] text-muted-foreground">
                                          {format(new Date(doc[step.key]?.date), 'dd/MM')}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </TableCell>
                              );
                            })}
                            <TableCell className="text-right">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/tenant/projects/${projectId}/form1/documents/${doc.id}`}>Detail</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">
                      {`Showing ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, data.items.length)} of ${data.items.length}`}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                      >
                        Previous
                      </Button>
                      <div className="text-sm">{page}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page * pageSize >= data.items.length}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={isUploadOpen} onOpenChange={(open) => {
        setIsUploadOpen(open);
        if (!open) resetUploadForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Dokumen Baru</DialogTitle>
            <DialogDescription>Tambahkan dokumen baru dengan mengisi informasi di bawah ini</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Informasi Dokumen</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Tipe Dokumen</Label>
                  <Select value={tipeDokumen} onValueChange={setTipeDokumen}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe Dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      {tipeDocumentTypes && tipeDocumentTypes.length > 0 ? (
                        tipeDocumentTypes.map((type: any) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))
                      ) : (
                         <div className="p-2 text-sm text-muted-foreground">Memuat data...</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Jenis Dokumen</Label>
                  <Select value={jenisDokumen} onValueChange={setJenisDokumen}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes && Array.isArray(documentTypes) && documentTypes.length > 0 ? (
                        documentTypes.map((type: any) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="Invoice">Invoice</SelectItem>
                          <SelectItem value="Purchase Order">Purchase Order</SelectItem>
                          <SelectItem value="Sales Order">Sales Order</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Nomor Dokumen *</Label>
                  <Input value={nomorDokumen} onChange={(e) => setNomorDokumen(e.target.value)} placeholder="Masukan nomor" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Tanggal Dokumen *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !documentDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {documentDate ? (
                          format(documentDate, 'dd MMMM yyyy', { locale: id })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={documentDate}
                        onSelect={setDocumentDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Jumlah Lembar *</Label>
                  <Input
                    type="number"
                    min={1}
                    value={jumlahLembar}
                    onChange={(e) => setJumlahLembar(Math.max(1, parseInt(e.target.value || '1', 10)))}
                    placeholder="Masukan jumlah lembar"
                  />
                </div>
                <div>
                  <Label>Asli/Copy/Digital *</Label>
                  <Select value={docStatus} onValueChange={(v) => setDocStatus(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih dokumen asal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asli">Asli</SelectItem>
                      <SelectItem value="copy">Copy</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Lampiran Dokumen</Label>
                  <div className="mt-2">
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={{
                        multiple: true,
                        maxSize: 25 * 1024 * 1024, // 25MB
                        accept: {
                          'image/jpeg': ['.jpg', '.jpeg'],
                          'image/png': ['.png'],
                          'application/pdf': ['.pdf'],
                          'application/msword': ['.doc'],
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                          'application/vnd.ms-excel': ['.xls'],
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                          'text/plain': ['.txt']
                        }
                      }}
                      texts={{ 
                        title: 'Choose File', 
                        subtitle: 'Max 25MB', 
                        fileTypes: 'JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, TXT' 
                      }}
                    />
                    {files && files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {Array.from(files).map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-slate-50 dark:bg-slate-900">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                const url = URL.createObjectURL(file);
                                window.open(url, '_blank');
                              }}
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Informasi Administrasi</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Admin (PIC) Klien *</Label>
                  <Input
                    value={adminPicKlien}
                    onChange={(e) => setAdminPicKlien(e.target.value)}
                    placeholder="Masukan nama admin/PIC dari Klien"
                  />
                </div>
                <div>
                  <Label>Divisi *</Label>
                  <Input value={divisi} onChange={(e) => setDivisi(e.target.value)} placeholder="Divisi" />
                </div>
                <div>
                  <Label>Posisi Dokumen Asli *</Label>
                  <Input
                    value={posisiDokumenAsli}
                    onChange={(e) => setPosisiDokumenAsli(e.target.value)}
                    placeholder="Lemari A-1, dll"
                  />
                </div>
                <div>
                  <Label>No Urut Sortiran dari Klien</Label>
                  <Input
                    value={noUrutSortiran}
                    onChange={(e) => setNoUrutSortiran(e.target.value)}
                    placeholder="Opsional - otomatis jika dikosongkan"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Informasi Tambahan</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Catatan *</Label>
                <Input
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Deskripsi catatan"
                  className="h-24"
                />
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {uploadMutation.isPending ? 'Mengupload...' : 'Upload Dokumen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isWorkflowDialogOpen} onOpenChange={setIsWorkflowDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Update Progress Dokumen</DialogTitle>
            <DialogDescription>
              Update status untuk tahap <strong>{WORKFLOW_STEPS.find(s => s.key === selectedWorkflowStep)?.label}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Card className="p-6 bg-slate-50 dark:bg-slate-900 border">
               <h3 className="font-semibold mb-6 text-xl">
                 {WORKFLOW_STEPS.find(s => s.key === selectedWorkflowStep)?.label}
               </h3>
               
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-3">
                   <Label className="text-base">Nama</Label>
                   <Input 
                     value={user?.name || 'User'} 
                     readOnly 
                     className="bg-background text-foreground opacity-100 h-11"
                   />
                 </div>
                 
                 <div className="space-y-3">
                   <Label className="text-base">Tanggal *</Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal h-11',
                          !workflowDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {workflowDate ? (
                          format(workflowDate, 'dd/MM/yyyy', { locale: id })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={workflowDate}
                        onSelect={setWorkflowDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                 </div>
               </div>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWorkflowDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleWorkflowSave} 
              disabled={updateWorkflowMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateWorkflowMutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
