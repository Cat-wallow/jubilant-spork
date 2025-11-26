import api from '@/lib/api';
import { PaginatedTenantsResponse, Tenant, CreateTenantPayload, UpdateTenantPayload } from '@/types/tenant';
import { SortDescriptor } from '@/types/shared';

export const getTenants = async (
  page: number,
  limit: number,
  search?: string,
  status?: string,
  plan?: string,
  sort?: SortDescriptor,
): Promise<PaginatedTenantsResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (search) params.append('search', search);
  if (status && status !== 'all') params.append('status', status);
  if (plan && plan !== 'all') params.append('plan', plan);
  if (sort) {
    params.append('sortBy', sort.column as string);
    params.append('sortOrder', sort.direction);
  }

  const response = await api.get<PaginatedTenantsResponse>(`/tenant?${params.toString()}`);
  return response.data;
};

export const getTenantById = async (id: string): Promise<Tenant> => {
  const response = await api.get<{ success: boolean; data: Tenant }>(`/tenant/${id}`);
  return response.data.data;
};

export const createTenant = async (payload: CreateTenantPayload): Promise<Tenant> => {
  const response = await api.post<{ success: boolean; data: Tenant }>('/tenant', payload);
  return response.data.data;
};

export const updateTenant = async (id: string, payload: UpdateTenantPayload): Promise<Tenant> => {
  const response = await api.put<{ success: boolean; data: Tenant }>(`/tenant/${id}`, payload);
  return response.data.data;
};

export const toggleTenantStatus = async (tenantId: string): Promise<Tenant> => {
  const response = await api.put(`/tenant/${tenantId}/toggle-status`);
  return response.data.data;
};
