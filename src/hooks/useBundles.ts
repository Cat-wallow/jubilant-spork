import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export type BundleStatus = 'In Progress' | 'Selesai' | 'In Review';

export interface DocumentBundle {
  id: string;
  period: string | null;
  name: string;
  documents: number;
  gaps: number;
  statements: number;
  status: BundleStatus;
  assignee: string | null;
  lastUpdate: string;
}

export interface BundlesResponse {
  items: DocumentBundle[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface BundleQueryParams {
  status?: string;
  assignee?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateBundlePayload {
  name: string;
  bundleType?: string;
  period: string;
  scope: string;
  assigneeName?: string;
}

export const useBundles = (
  tenantId: string,
  projectId: string,
  params?: BundleQueryParams,
) => {
  return useQuery<BundlesResponse>({
    queryKey: ['bundles', tenantId, projectId, params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append('currentTenantId', tenantId);

      if (params?.status && params.status !== 'all') {
        searchParams.append('status', params.status);
      }
      if (params?.assignee && params.assignee !== 'all') {
        searchParams.append('assignee', params.assignee);
      }
      if (params?.search) {
        searchParams.append('search', params.search);
      }
      if (params?.page) {
        searchParams.append('page', params.page.toString());
      }
      if (params?.pageSize) {
        searchParams.append('pageSize', params.pageSize.toString());
      }

      const { data } = await api.get<BundlesResponse>(
        `/document/api/v1/projects/${projectId}/bundles?${searchParams.toString()}`,
      );
      return data;
    },
    enabled: !!tenantId && !!projectId,
  });
};

export const useDeleteBundle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      projectId,
      bundleId,
      userId,
    }: {
      tenantId: string;
      projectId: string;
      bundleId: string;
      userId: string;
    }) => {
      const searchParams = new URLSearchParams();
      searchParams.append('currentTenantId', tenantId);
      searchParams.append('currentUserId', userId);

      await api.delete(
        `/document/api/v1/projects/${projectId}/bundles/${bundleId}?${searchParams.toString()}`
      );
    },
    onSuccess: (_, { tenantId, projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ['bundles', tenantId, projectId],
      });
    },
  });
};

export const useCreateBundle = () => {
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
      payload: CreateBundlePayload;
    }) => {
      const { data } = await api.post<DocumentBundle>(
        `/document/api/v1/projects/${projectId}/bundles`,
        {
          currentTenantId: tenantId,
          currentUserId: userId,
          name: payload.name,
          bundleType: payload.bundleType,
          period: payload.period,
          scope: payload.scope,
          assigneeName: payload.assigneeName,
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['bundles', variables.tenantId, variables.projectId],
      });
    },
  });
}
