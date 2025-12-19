'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReferenceTypes } from '@/services/reference-type.service';
import { useDocuments, useUploadDocuments, useUpdateWorkflow, useUpdateDocument } from '@/hooks/useDocuments';
import { useBundles } from '@/hooks/useBundles';
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
import { ArrowLeft, Download, Plus, CalendarIcon, CheckCircle2, Circle, Eye, FileText, Search, Filter, FolderInput } from 'lucide-react';
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

interface DocumentListProps {
  projectId: string;
  tenantId: string;
  userId: string;
}

export function DocumentList({ projectId, tenantId, userId }: DocumentListProps) {
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
  const [selectedBundleId, setSelectedBundleId] = useState<string>('none');

  const uploadMutation = useUploadDocuments();
  const updateWorkflowMutation = useUpdateWorkflow();
  const updateDocumentMutation = useUpdateDocument();

  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);
  const [selectedWorkflowDoc, setSelectedWorkflowDoc] = useState<any>(null);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<string>('');
  const [workflowDate, setWorkflowDate] = useState<Date | undefined>(new Date());

  const [isAssignBundleOpen, setIsAssignBundleOpen] = useState(false);
  const [selectedDocForBundle, setSelectedDocForBundle] = useState<any>(null);
  const [bundleToAssign, setBundleToAssign] = useState<string>('none');

  const { data, isLoading } = useDocuments(
    tenantId,
    projectId,
    {
      search: debouncedSearch || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
      page: 1, // We might want to implement proper server-side pagination later
      pageSize: 100, // Fetch more for now since we do client-side slice for display
    },
    { enabled: !!tenantId && !!projectId },
  );

  const { data: bundlesResponse } = useBundles(tenantId, projectId);
  const bundles = useMemo(() => bundlesResponse?.items ?? [], [bundlesResponse]);

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
    setSelectedBundleId('none');
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
          bundleId: selectedBundleId === 'none' ? undefined : selectedBundleId,
        },
      });
      toast.success('Dokumen berhasil ditambahkan');
      setIsUploadOpen(false);
      resetUploadForm();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Gagal upload dokumen';
      toast.error(msg);
    }
  };

  const handleAssignBundle = async () => {
    if (!selectedDocForBundle) return;
    
    try {
      await updateDocumentMutation.mutateAsync({
        tenantId,
        projectId,
        documentId: selectedDocForBundle.id,
        payload: {
          bundleId: bundleToAssign === 'none' ? null : bundleToAssign
        }
      });
      toast.success('Bundle berhasil diupdate');
      setIsAssignBundleOpen(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Gagal update bundle';
      toast.error(msg);
    }
  };

  const openAssignBundle = (doc: any) => {
    setSelectedDocForBundle(doc);
    // Try to find if doc has bundleId, otherwise 'none'
    // Assuming doc might have bundleId property if backend returns it
    setBundleToAssign((doc as any).bundleId || 'none');
    setIsAssignBundleOpen(true);
  };

  return (
    <div className="space-y-6">
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
              <CardTitle className="text-base font-semibold">Daftar Dokumen</CardTitle>
              <p className="text-xs text-muted-foreground">Kelola dokumen proyek</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info('Export XLSX belum tersedia')}>
                <Download className="mr-2 h-4 w-4" />
                Export XLSX
              </Button>
              <Button onClick={() => setIsUploadOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Dokumen
              </Button>
            </div>
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
                  placeholder="Cari dokumen..."
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
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="asli">Asli</SelectItem>
                  <SelectItem value="copy">Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="w-[200px] whitespace-nowrap">Nama File / Dokumen</TableHead>
                    <TableHead className="whitespace-nowrap">Bundle</TableHead>
                    <TableHead className="whitespace-nowrap">Tanggal</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap text-center">Action</TableHead>
                    {WORKFLOW_STEPS.map((step) => (
                      <TableHead key={step.key} className="whitespace-nowrap text-center min-w-[100px]">
                        {step.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                        {WORKFLOW_STEPS.map((s) => (
                          <TableCell key={s.key}><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : pagedDocs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5 + WORKFLOW_STEPS.length} className="h-24 text-center">
                        Tidak ada dokumen ditemukan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedDocs.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium truncate max-w-[200px]" title={doc.originalFilename}>
                              {doc.originalFilename}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {doc.jenisDokumen} • {doc.tipeDokumen}
                            </span>
                            {doc.nomorDokumen && (
                              <span className="text-xs text-blue-600">
                                {doc.nomorDokumen}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                           {/* Display bundle name if we can map it, or allow assigning */}
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-muted-foreground">
                               {bundles.find(b => b.id === (doc as any).bundleId)?.name || ((doc as any).bundleId ? 'Bundle Assigned' : '-')}
                             </span>
                           </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {doc.documentDate ? format(new Date(doc.documentDate), 'dd/MM/yyyy') : '-'}
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium capitalize",
                            doc.status === 'asli' && "bg-emerald-100 text-emerald-800",
                            doc.status === 'copy' && "bg-amber-100 text-amber-800",
                            doc.status === 'digital' && "bg-blue-100 text-blue-800"
                          )}>
                            {doc.status}
                          </span>
                        </TableCell>
                        
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openAssignBundle(doc)}
                            title="Atur Bundle"
                          >
                            <FolderInput className="h-4 w-4 text-blue-600" />
                          </Button>
                        </TableCell>

                        {/* Workflow Steps Columns */}
                        {WORKFLOW_STEPS.map((step) => {
                           const stepData = (doc as any)[step.key];
                           const isDone = stepData?.status === true;
                           
                           return (
                             <TableCell key={step.key} className="text-center p-2">
                               <div 
                                 className={cn(
                                   "flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110",
                                   isDone ? "opacity-100" : "opacity-30 hover:opacity-100"
                                 )}
                                 onClick={() => handleWorkflowClick(doc, step.key)}
                               >
                                 {isDone ? (
                                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                 ) : (
                                   <Circle className="h-5 w-5 text-slate-300" />
                                 )}
                                 {isDone && stepData.date && (
                                   <span className="text-[10px] text-muted-foreground mt-1">
                                     {format(new Date(stepData.date), 'dd/MM')}
                                   </span>
                                 )}
                               </div>
                             </TableCell>
                           );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
               Showing {pagedDocs.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min((page - 1) * pageSize + pagedDocs.length, totalDocs)} of {totalDocs} entries
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
                disabled={pagedDocs.length < pageSize}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Dokumen Baru</DialogTitle>
            <DialogDescription>
              Upload dokumen baru ke dalam proyek. Anda dapat memilih bundle nanti.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Card className="border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Informasi Dokumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Bundle (Opsional)</Label>
                  <Select value={selectedBundleId} onValueChange={setSelectedBundleId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Bundle (Opsional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tanpa Bundle</SelectItem>
                      {bundles.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipe Dokumen *</Label>
                  <Select value={tipeDokumen} onValueChange={setTipeDokumen}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe dokumen" />
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
                <div>
                  <Label>Jenis Dokumen *</Label>
                   <Select value={jenisDokumen} onValueChange={setJenisDokumen}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes && documentTypes.length > 0 ? (
                        documentTypes.map((type: any) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))
                      ) : (
                        <>
                           <SelectItem value="Invoice">Invoice</SelectItem>
                           <SelectItem value="Faktur Pajak">Faktur Pajak</SelectItem>
                           <SelectItem value="Bukti Potong">Bukti Potong</SelectItem>
                           <SelectItem value="Rekening Koran">Rekening Koran</SelectItem>
                           <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nomor Dokumen *</Label>
                  <Input 
                    value={nomorDokumen} 
                    onChange={(e) => setNomorDokumen(e.target.value)}
                    placeholder="Nomor dokumen" 
                  />
                </div>
                <div>
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
                          format(documentDate, 'dd/MM/yyyy', { locale: id })
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
      
      {/* Workflow Dialog */}
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
                     value={userId} // TODO: Replace with actual user name
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

      {/* Assign Bundle Dialog */}
      <Dialog open={isAssignBundleOpen} onOpenChange={setIsAssignBundleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Atur Bundle Dokumen</DialogTitle>
            <DialogDescription>
              Pilih bundle untuk dokumen ini.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
             <div className="space-y-2">
                <Label>Dokumen</Label>
                <div className="text-sm font-medium">{selectedDocForBundle?.originalFilename}</div>
             </div>
             <div className="space-y-2">
                <Label>Bundle</Label>
                <Select value={bundleToAssign} onValueChange={setBundleToAssign}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bundle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tanpa Bundle</SelectItem>
                    {bundles.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
             </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignBundleOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleAssignBundle} 
              disabled={updateDocumentMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateDocumentMutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
