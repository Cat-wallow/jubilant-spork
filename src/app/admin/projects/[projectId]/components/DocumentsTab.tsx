'use client';

import { useState, useCallback } from 'react';
import { useDocuments, useUploadDocuments, useDeleteDocument, Document } from '@/hooks/useDocuments';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
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

const DOCUMENT_CATEGORIES = [
  { value: 'invoice', label: 'Invoice' },
  { value: 'contract', label: 'Kontrak' },
  { value: 'spt', label: 'SPT' },
  { value: 'tax_document', label: 'Dokumen Pajak' },
  { value: 'po', label: 'Purchase Order' },
  { value: 'receipt', label: 'Kwitansi' },
  { value: 'other', label: 'Lainnya' },
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

const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    invoice: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    contract: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    spt: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    tax_document: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    po: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    receipt: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  };
  return colors[category] || colors.other;
};

// =============================================================================
// Component
// =============================================================================

export function DocumentsTab({ projectId, tenantId, userId }: DocumentsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Upload form state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState('invoice');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadDate, setUploadDate] = useState('');

  // Queries & Mutations
  const { data, isLoading, error } = useDocuments(tenantId, projectId, {
    search: searchQuery || undefined,
    category: categoryFilter || undefined,
    page,
    pageSize: 10,
  });

  const uploadMutation = useUploadDocuments();
  const deleteMutation = useDeleteDocument();

  // =============================================================================
  // Handlers
  // =============================================================================

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Pilih minimal 1 file untuk diupload');
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        tenantId,
        projectId,
        userId,
        payload: {
          files: selectedFiles,
          category: uploadCategory,
          description: uploadDescription || undefined,
          documentDate: uploadDate || undefined,
        },
      });

      toast.success(`${selectedFiles.length} dokumen berhasil diupload`);
      setIsUploadDialogOpen(false);
      setSelectedFiles([]);
      setUploadCategory('invoice');
      setUploadDescription('');
      setUploadDate('');
    } catch (error) {
      toast.error('Gagal mengupload dokumen');
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
          <Select value={categoryFilter || 'all'} onValueChange={(val) => setCategoryFilter(val === 'all' ? '' : val)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
              <Upload className="mr-2 h-4 w-4" />
              Upload Dokumen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Dokumen</DialogTitle>
              <DialogDescription>
                Upload dokumen pendukung untuk proyek ini. Format yang didukung: PDF, JPG, PNG.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* File Drop Zone */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Klik untuk memilih file atau drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG (max 20MB)
                  </p>
                </label>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>File yang dipilih ({selectedFiles.length})</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {getFileIcon(file.type)}
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori Dokumen</Label>
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Document Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Dokumen (opsional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi (opsional)</Label>
                <Textarea
                  id="description"
                  placeholder="Tambahkan deskripsi dokumen..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUploadDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploadMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                    <TableHead>Kategori</TableHead>
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
                          className={getCategoryBadgeColor(doc.category)}
                        >
                          {DOCUMENT_CATEGORIES.find((c) => c.value === doc.category)?.label ||
                            doc.category}
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
