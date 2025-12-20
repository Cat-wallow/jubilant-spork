'use client';

import { useState, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  useDocument,
  useDocumentComments,
  useCreateDocumentComment,
  useDocumentVersions,
  WorkflowStep,
  type DocumentComment,
  type DocumentVersion,
} from '@/hooks/useDocuments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

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

const formatFileSize = (value: number | null | undefined) => {
  if (!value || Number.isNaN(value)) return '-';
  const mb = value / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = value / 1024;
  return `${kb.toFixed(1)} KB`;
};

const renderTimelineStep = (label: string, step?: WorkflowStep) => {
  const isDone = step && step.status;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center pt-1">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
            isDone
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white text-slate-400'
          }`}
        >
          {isDone ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
        </div>
        <div className="h-full w-px bg-slate-200" />
      </div>
      <div className="pb-4">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-50">{label}</div>
        {isDone && (
          <div className="mt-0.5 text-xs text-muted-foreground dark:text-slate-300">
            <div>{step?.byName || step?.by || '-'}</div>
            {step?.date && <div>{formatDate(step.date)}</div>}
            {step?.source && (
              <div className="text-[11px] italic text-slate-500 dark:text-slate-300">{step.source}</div>
            )}
          </div>
        )}
        {!isDone && (
          <div className="mt-0.5 text-xs text-muted-foreground dark:text-slate-300">Belum diproses</div>
        )}
      </div>
    </div>
  );
};

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tenant, user } = useAuth();

  const projectId = params.projectId as string;
  const documentId = params.documentId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';
  const authorName = user?.name || 'User';

  const { data: doc, isLoading, error } = useDocument(tenantId, projectId, documentId);
  const { data: versions, isLoading: isVersionsLoading } = useDocumentVersions(tenantId, projectId, documentId);
  const { data: comments, isLoading: isCommentsLoading } = useDocumentComments(
    tenantId,
    projectId,
    documentId,
  );
  const createCommentMutation = useCreateDocumentComment();
  const [commentText, setCommentText] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const downloadUrl = tenantId && projectId && documentId 
    ? `${process.env.NEXT_PUBLIC_API_URL}/document/api/v1/projects/${projectId}/documents/${documentId}/download?currentTenantId=${tenantId}`
    : '';

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      toast.error('Gagal mengunduh dokumen: URL tidak valid');
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!commentText.trim()) {
      toast.error('Komentar tidak boleh kosong');
      return;
    }

    if (!tenantId || !userId) {
      toast.error('Session tidak valid. Silakan login ulang.');
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        tenantId,
        projectId,
        documentId,
        userId,
        authorName,
        content: commentText.trim(),
        severity: isUrgent ? 'high' : undefined,
      });
      setCommentText('');
      setIsUrgent(false);
    } catch {
      toast.error('Gagal mengirim komentar');
    }
  };

  if (!tenantId) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Tenant tidak ditemukan. Silakan login kembali.</p>
      </div>
    );
  }

  if (isLoading || (!doc && !error)) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="space-y-4 p-6">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <p className="text-sm text-red-500">Gagal memuat detail dokumen.</p>
      </div>
    );
  }

  const statusLabel =
    doc.status === 'digital' ? 'Digital' : doc.status === 'asli' ? 'Asli' : doc.status === 'copy' ? 'Copy' : doc.status;

  return (
    <div className="space-y-6 p-6 text-slate-900 dark:text-slate-50">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-semibold  text-slate-900 dark:text-slate-50">
              Detail Dokumen
            </h1>
            <p className="text-sm text-muted-foreground dark:text-slate-300">{doc.originalFilename}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <Badge
            variant="secondary"
            className={`ml-2 ${
              doc.status === 'asli'
                ? 'bg-emerald-100 text-emerald-800'
                : doc.status === 'digital'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {statusLabel}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
        <div className="space-y-4">
          {/* Document Info / File Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Document Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Nomor Dokumen</div>
                <div className="font-medium">{doc.nomorDokumen || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Status Dokumen</div>
                <div className="font-medium">{statusLabel}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Tanggal</div>
                <div className="font-medium">{formatDate(doc.documentDate)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Jumlah Lembar</div>
                <div className="font-medium">{doc.jumlahLembar}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Deskripsi</div>
                <div className="font-medium">{doc.description || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Jenis Dokumen</div>
                <div className="font-medium">{doc.jenisDokumen}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Tipe Dokumen</div>
                <div className="font-medium">{doc.tipeDokumen || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Diunggah Oleh</div>
                <div className="font-medium">{doc.uploadedByName || doc.uploadedBy}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground dark:text-slate-300">Tanggal Upload</div>
                <div className="font-medium">{formatDate(doc.createdAt)}</div>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full" variant="outline" onClick={handlePreview}>
                  <FileText className="mr-2 h-4 w-4" />
                  {showPreview ? 'Tutup Preview' : 'Preview Dokumen'}
                </Button>
                <Button className="w-full" variant="default" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Original
                </Button>
              </div>
            </CardContent>
            
            {showPreview && (
              <div className="border-t p-4">
                <iframe 
                  src={`${downloadUrl}&preview=true`} 
                  className="w-full h-[500px] rounded border bg-white"
                  title="Document Preview"
                />
              </div>
            )}
          </Card>

          {/* Attachments (Document Versions) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Attachments{versions ? ` (${versions.length})` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {isVersionsLoading ? (
                <>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : !versions || versions.length === 0 ? (
                <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/40">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {doc.originalFilename}
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-slate-300">
                      {formatFileSize(doc.fileSize)} • {formatDate(doc.createdAt)}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                versions.map((v: DocumentVersion) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/40"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {doc.nomorDokumen || doc.originalFilename}
                      </div>
                      <div className="text-xs text-muted-foreground dark:text-slate-300">
                        {formatFileSize(v.fileSize)} • {formatDate(v.createdAt)}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => toast.info('Download versi dokumen belum tersedia')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Process Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Process Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {renderTimelineStep('Asal Dokumen', doc.asalDokumen)}
            {renderTimelineStep('Pengiriman', doc.pengiriman)}
            {renderTimelineStep('Penerimaan', doc.penerimaan)}
            {renderTimelineStep('Digitalisasi', doc.digitalisasi)}
            {renderTimelineStep('Pendeskripsian', doc.pendeskripsian)}
            {renderTimelineStep('Foldering', doc.foldering)}
            {renderTimelineStep('Entry Data', doc.entryData)}
            {renderTimelineStep('Telaah Pajak', doc.telaahPajak)}
            {renderTimelineStep('Telaah Pembukuan', doc.telaahPembukuan)}
            {renderTimelineStep('Pengarsipan', doc.pengarsipan)}
            {renderTimelineStep('Pengembalian', doc.pengembalian)}
            {renderTimelineStep('Berita Acara', doc.beritaAcara)}
          </CardContent>
        </Card>
      </div>

      {/* Comments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Comments{comments ? ` (${comments.length})` : ''}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {isCommentsLoading ? (
              <>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </>
            ) : !comments || comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada komentar.</p>
            ) : (
              comments.map((comment: DocumentComment) => (
                <div
                  key={comment.id}
                  className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-slate-900 dark:text-slate-50">
                      {comment.authorName}
                    </span>
                    <span>•</span>
                    <span>{formatDate(comment.createdAt)}</span>
                    {comment.severity === 'high' && (
                      <Badge variant="destructive" className="h-5 px-2 text-[10px]">
                        Warning
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-100 whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmitComment} className="space-y-2">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-100">Add Comment</p>
            <div className="flex flex-col gap-2">
              <Textarea
                placeholder="Tulis komentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent-comment"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="urgent-comment" className="text-sm text-slate-700 dark:text-slate-300">
                    Apakah penting?
                  </label>
                </div>
                <Button type="submit" size="sm" disabled={createCommentMutation.isPending}>
                  {createCommentMutation.isPending ? 'Mengirim...' : 'Kirim'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
