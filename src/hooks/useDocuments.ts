import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// =============================================================================
// Types (Figma Design)
// =============================================================================

export interface WorkflowStep {
  status: boolean;
  by: string | null;
  date: string | null;
  source?: string | null;
}

export type WorkflowStepKey = 'pengiriman' | 'penerimaan' | 'digitalisasi' | 'pendeskripsian';

export interface Document {
  id: string;
  projectId: string;

  // Document Identity
  jenisDokumen: string;
  tipeDokumen: string;
  nomorDokumen: string | null;
  documentDate: string | null;
  jumlahLembar: number;

  // Document Status
  status: 'digital' | 'asli' | 'copy';
  folder: string | null;

  // Workflow
  asalDokumen: WorkflowStep;
  pengiriman: WorkflowStep;
  penerimaan: WorkflowStep;
  digitalisasi: WorkflowStep;
  pendeskripsian: WorkflowStep;

  // File Info
  originalFilename: string;
  storedFilename: string;
  mimeType: string;
  fileSize: number;

  // Metadata
  description: string | null;
  version: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileSize: number;
  checksum: string;
  createdAt: string;
}

export interface DocumentComment {
  id: string;
  tenantId: string;
  projectId: string;
  documentId: string;
  userId: string;
  authorName: string;
  content: string;
  severity?: string | null;
  createdAt: string;
}

export interface DocumentsResponse {
  items: Document[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  stats: {
    total: number;
    digital: number;
    asli: number;
    copy: number;
  };
}

export interface UploadDocumentPayload {
  files: File[];
  jenisDokumen: string;
  tipeDokumen: string;
  nomorDokumen?: string;
  documentDate?: string;
  jumlahLembar?: number;
  status?: 'digital' | 'asli' | 'copy';
  folder?: string;
  description?: string;
  asalDokumenSource?: string;
  // Informasi Administrasi
  adminPicKlien?: string;
  divisi?: string;
  posisiDokumenAsli?: string;
  noUrutSortiran?: string;
  bundleId?: string;
}

export interface UpdateDocumentPayload {
  jenis_dokumen?: string;
  tipe_dokumen?: string;
  nomor_dokumen?: string | null;
  document_date?: string | null;
  jumlah_lembar?: number;
  status?: 'digital' | 'asli' | 'copy';
  folder?: string | null;
  description?: string | null;
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Hook to fetch documents for a project
 */
export interface DocumentQueryParams {
  jenisDokumen?: string;
  tipeDokumen?: string;
  status?: string;
  search?: string;
  documentDateFrom?: string;
  documentDateTo?: string;
  page?: number;
  pageSize?: number;
  bundleId?: string;
}

export const useDocuments = (
  tenantId: string,
  projectId: string,
  params?: DocumentQueryParams,
  options?: { enabled?: boolean },
) => {
  return useQuery<DocumentsResponse>({
    queryKey: ['documents', tenantId, projectId, params, options?.enabled ?? true],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append('currentTenantId', tenantId);

      if (params?.jenisDokumen) searchParams.append('jenis_dokumen', params.jenisDokumen);
      if (params?.tipeDokumen) searchParams.append('tipe_dokumen', params.tipeDokumen);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.search) searchParams.append('search', params.search);
      if (params?.documentDateFrom) searchParams.append('document_date_from', params.documentDateFrom);
      if (params?.documentDateTo) searchParams.append('document_date_to', params.documentDateTo);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());
      if (params?.bundleId) searchParams.append('bundleId', params.bundleId);

      const { data } = await api.get<DocumentsResponse>(
        `/document/api/v1/projects/${projectId}/documents?${searchParams.toString()}`
      );
      return data;
    },
    enabled: (options?.enabled ?? true) && !!tenantId && !!projectId,
  });
};

/**
 * Hook to update a single workflow step for a document
 */
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      documentId,
      userId,
      workflowStep,
      date,
    }: {
      tenantId: string;
      projectId: string;
      documentId: string;
      userId: string;
      workflowStep: WorkflowStepKey;
      date: string;
    }) => {
      const { data } = await api.patch<Document>(
        `/document/api/v1/projects/${projectId}/documents/${documentId}/workflow`,
        {
          workflow_step: workflowStep,
          currentTenantId: tenantId,
          currentUserId: userId,
          date,
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['documents', variables.tenantId, variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ['document', variables.tenantId, variables.projectId, variables.documentId],
      });
    },
  });
};

/**
 * Hook to fetch a single document
 */
export const useDocument = (tenantId: string, projectId: string, documentId: string) => {
  return useQuery<Document>({
    queryKey: ['document', tenantId, projectId, documentId],
    queryFn: async () => {
      const { data } = await api.get<Document>(
        `/document/api/v1/project/${projectId}/documents/${documentId}?currentTenantId=${tenantId}`
      );
      return data;
    },
    enabled: !!tenantId && !!projectId && !!documentId,
  });
};

/**
 * Hook to upload documents
 */
export const useUploadDocuments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      userId,
      payload,
    }: {
      tenantId: string;
      projectId: string;
      userId: string;
      payload: UploadDocumentPayload;
    }) => {
      const formData = new FormData();

      payload.files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('jenis_dokumen', payload.jenisDokumen);
      formData.append('tipe_dokumen', payload.tipeDokumen);
      formData.append('currentTenantId', tenantId);
      formData.append('currentUserId', userId);
<<<<<<< HEAD

=======
      if (payload.bundleId) formData.append('bundleId', payload.bundleId);
      
>>>>>>> 1ad73411a21f1bbf23bc2a273e06b3ec9ee8e8f5
      if (payload.nomorDokumen) formData.append('nomor_dokumen', payload.nomorDokumen);
      if (payload.documentDate) formData.append('document_date', payload.documentDate);
      if (payload.jumlahLembar) formData.append('jumlah_lembar', payload.jumlahLembar.toString());
      if (payload.status) formData.append('status', payload.status);
      if (payload.folder) formData.append('folder', payload.folder);
      if (payload.description) formData.append('description', payload.description);
      if (payload.asalDokumenSource) formData.append('asal_dokumen_source', payload.asalDokumenSource);
      if (payload.adminPicKlien) formData.append('admin_pic_klien', payload.adminPicKlien);
      if (payload.divisi) formData.append('divisi', payload.divisi);
      if (payload.posisiDokumenAsli) formData.append('posisi_dokumen_asli', payload.posisiDokumenAsli);
      if (payload.noUrutSortiran) formData.append('no_urut_sortiran', payload.noUrutSortiran);

      const { data } = await api.post<{ items: Document[] }>(
        `/document/api/v1/projects/${projectId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['documents', variables.tenantId, variables.projectId],
      });
    },
  });
};

/**
 * Hook to fetch versions for a document (used as attachments)
 */
export const useDocumentVersions = (
  tenantId: string,
  projectId: string,
  documentId: string,
) => {
  return useQuery<DocumentVersion[]>({
    queryKey: ['document-versions', tenantId, projectId, documentId],
    queryFn: async () => {
      const { data } = await api.get<{ items: DocumentVersion[] }>(
        `/document/api/v1/projects/${projectId}/documents/${documentId}/versions?currentTenantId=${tenantId}`,
      );
      return data.items;
    },
    enabled: !!tenantId && !!projectId && !!documentId,
  });
};

/**
 * Hook to fetch comments for a document
 */
export const useDocumentComments = (
  tenantId: string,
  projectId: string,
  documentId: string,
) => {
  return useQuery<DocumentComment[]>({
    queryKey: ['document-comments', tenantId, projectId, documentId],
    queryFn: async () => {
      const { data } = await api.get<{ items: DocumentComment[] }>(
        `/document/api/v1/projects/${projectId}/documents/${documentId}/comments?currentTenantId=${tenantId}`,
      );
      return data.items;
    },
    enabled: !!tenantId && !!projectId && !!documentId,
  });
};

/**
 * Hook to create a comment for a document
 */
export const useCreateDocumentComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      documentId,
      userId,
      authorName,
      content,
      severity,
    }: {
      tenantId: string;
      projectId: string;
      documentId: string;
      userId: string;
      authorName: string;
      content: string;
      severity?: string;
    }) => {
      const { data } = await api.post<DocumentComment>(
        `/document/api/v1/projects/${projectId}/documents/${documentId}/comments`,
        {
          content,
          severity,
          authorName,
          currentTenantId: tenantId,
          currentUserId: userId,
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['document-comments', variables.tenantId, variables.projectId, variables.documentId],
      });
    },
  });
};

/**
 * Hook to update document metadata
 */
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      documentId,
      payload,
    }: {
      tenantId: string;
      projectId: string;
      documentId: string;
      payload: UpdateDocumentPayload;
    }) => {
      const { data } = await api.patch<Document>(
        `/document/api/v1/project/${projectId}/documents/${documentId}`,
        {
          ...payload,
          currentTenantId: tenantId,
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['documents', variables.tenantId, variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ['document', variables.tenantId, variables.projectId, variables.documentId],
      });
    },
  });
};

/**
 * Hook to delete a document (soft delete)
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      documentId,
    }: {
      tenantId: string;
      projectId: string;
      documentId: string;
    }) => {
      const { data } = await api.delete(
        `/document/api/v1/project/${projectId}/documents/${documentId}`,
        {
          data: { currentTenantId: tenantId },
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['documents', variables.tenantId, variables.projectId],
      });
    },
  });
};
