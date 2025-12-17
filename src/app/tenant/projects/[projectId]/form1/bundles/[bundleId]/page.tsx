'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDocuments, useUploadDocuments } from '@/hooks/useDocuments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUploader } from '@/components/shared/FileUploader';
import { ArrowLeft, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function FormOneBundleDetailPage() {
  const params = useParams();
  const { tenant, user } = useAuth();

  const projectId = params.projectId as string;
  const bundleId = params.bundleId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'digital' | 'asli' | 'copy'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [jenisDokumen, setJenisDokumen] = useState('');
  const [tipeDokumen, setTipeDokumen] = useState('');
  const [nomorDokumen, setNomorDokumen] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [jumlahLembar, setJumlahLembar] = useState<number>(1);
  const [docStatus, setDocStatus] = useState<'digital' | 'asli' | 'copy'>('digital');
  const [description, setDescription] = useState('');

  const uploadMutation = useUploadDocuments();

  const { data, isLoading, error } = useDocuments(
    tenantId,
    projectId,
    {
      bundleId,
      search: search || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
      page: 1,
      pageSize,
    },
    { enabled: !!tenantId && !!projectId && !!bundleId },
  );

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
    setJenisDokumen('');
    setTipeDokumen('');
    setNomorDokumen('');
    setDocumentDate('');
    setJumlahLembar(1);
    setDocStatus('digital');
    setDescription('');
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
    if (!jenisDokumen.trim() || !tipeDokumen.trim()) {
      toast.error('Jenis Dokumen dan Tipe Dokumen wajib diisi.');
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        tenantId,
        projectId,
        userId,
        payload: {
          files,
          jenisDokumen: jenisDokumen.trim(),
          tipeDokumen: tipeDokumen.trim(),
          nomorDokumen: nomorDokumen.trim() || undefined,
          documentDate: documentDate || undefined,
          jumlahLembar,
          status: docStatus,
          description: description.trim() || undefined,
          bundleId,
        },
      });
      toast.success('Dokumen berhasil ditambahkan ke bundle');
      setIsUploadOpen(false);
      resetUploadForm();
    } catch {
      toast.error('Gagal upload dokumen');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Form 1.0 - Lembar Pengendalian Arus Dokumen
          </h1>
          <p className="text-sm text-muted-foreground">{`Detail bundle ${bundleId}`}</p>
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
            <p className="text-sm text-red-500">Gagal memuat dokumen bundle.</p>
          ) : data.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada dokumen di bundle ini.</p>
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Dokumen</TableHead>
                      <TableHead>Tipe Dokumen</TableHead>
                      <TableHead>Nomor Dokumen</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jumlah Lembar</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagedDocs.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.jenisDokumen}</TableCell>
                        <TableCell>{doc.tipeDokumen}</TableCell>
                        <TableCell>{doc.nomorDokumen || '-'}</TableCell>
                        <TableCell>{doc.documentDate || '-'}</TableCell>
                        <TableCell>{doc.jumlahLembar}</TableCell>
                        <TableCell>{doc.status}</TableCell>
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
        </CardContent>
      </Card>

      <Dialog open={isUploadOpen} onOpenChange={(open) => {
        setIsUploadOpen(open);
        if (!open) resetUploadForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Dokumen ke Bundle</DialogTitle>
            <DialogDescription>Upload dokumen dan masukkan metadata minimal untuk Form 1.0</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>File Dokumen</Label>
              <div className="mt-2">
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={{ multiple: true }}
                  texts={{ title: 'Klik atau drag file', fileTypes: 'PDF/JPG/PNG' }}
                />
              </div>
            </div>

            <div>
              <Label>Jenis Dokumen</Label>
              <Input value={jenisDokumen} onChange={(e) => setJenisDokumen(e.target.value)} placeholder="Invoice / Sales Order / ..." />
            </div>
            <div>
              <Label>Tipe Dokumen</Label>
              <Input value={tipeDokumen} onChange={(e) => setTipeDokumen(e.target.value)} placeholder="Dokumen Transaksi / ..." />
            </div>
            <div>
              <Label>Nomor Dokumen</Label>
              <Input value={nomorDokumen} onChange={(e) => setNomorDokumen(e.target.value)} placeholder="PO-2023-..." />
            </div>
            <div>
              <Label>Tanggal Dokumen</Label>
              <Input type="date" value={documentDate} onChange={(e) => setDocumentDate(e.target.value)} />
            </div>
            <div>
              <Label>Jumlah Lembar</Label>
              <Input
                type="number"
                min={1}
                value={jumlahLembar}
                onChange={(e) => setJumlahLembar(Math.max(1, parseInt(e.target.value || '1', 10)))}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={docStatus} onValueChange={(v) => setDocStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Digital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="asli">Asli</SelectItem>
                  <SelectItem value="copy">Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Deskripsi (opsional)</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Keterangan tambahan..." />
            </div>
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
              {uploadMutation.isPending ? 'Mengupload...' : 'Tambah Dokumen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
