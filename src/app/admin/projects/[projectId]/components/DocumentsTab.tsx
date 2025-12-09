'use client';

import { useState, useCallback } from 'react';
import { useDocuments, useUploadDocuments, useDeleteDocument, Document } from '@/hooks/useDocuments';
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
  Upload,
  Search,
  FileText,
  File,
  Image,
  MoreHorizontal,
  Trash2,
  Eye,
  Download,
  Filter,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types
// =============================================================================

interface DocumentsTabProps {
  projectId: string;
  tenantId: string;
  userId: string;
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

// =============================================================================
// Component
// =============================================================================

export function DocumentsTab({ projectId, tenantId, userId }: DocumentsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [jenisDokumenFilter, setJenisDokumenFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);


  // Queries & Mutations
  const { data, isLoading, error } = useDocuments(tenantId, projectId, {
    search: searchQuery || undefined,
    jenisDokumen: jenisDokumenFilter || undefined,
    page,
    pageSize: 10,
  });

  const uploadMutation = useUploadDocuments();
  const deleteMutation = useDeleteDocument();

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
        },
      });

      toast.success('Dokumen berhasil ditambahkan');
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menambahkan dokumen');
      throw error;
    }
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

  // =============================================================================
  // Render
  // =============================================================================

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari dokumen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={jenisDokumenFilter || 'all'} onValueChange={(val) => setJenisDokumenFilter(val === 'all' ? '' : val)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Semua Jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenis</SelectItem>
              {JENIS_DOKUMEN_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                    <TableHead>Nama File</TableHead>
                    <TableHead>Jenis Dokumen</TableHead>
                    <TableHead>Ukuran</TableHead>
                    <TableHead>Tanggal Upload</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.mimeType)}
                          <div>
                            <p className="font-medium">{doc.originalFilename}</p>
                            {doc.description && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {doc.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getJenisDokumenBadgeColor(doc.jenisDokumen)}
                        >
                          {JENIS_DOKUMEN_OPTIONS.find((opt) => opt.value === doc.jenisDokumen)?.label ||
                            doc.jenisDokumen}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatFileSize(doc.fileSize)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
    </div>
  );
}
