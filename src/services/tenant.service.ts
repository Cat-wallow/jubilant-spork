import api from '@/lib/api';
import {
  PaginatedTenantsResponse,
  Tenant,
  CreateTenantPayload,
} from '@/types/tenant';
import { SortDescriptor } from '@react-types/shared';

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

  const response = await api.get<PaginatedTenantsResponse>(
    `/tenant?${params.toString()}`,
  );
  return response.data;
};

export const createTenant = async (
  payload: CreateTenantPayload,
): Promise<Tenant> => {
  const response = await api.post<{ success: boolean; data: Tenant }>(
    '/tenants',
    payload,
  );
  return response.data.data;
};

export const toggleTenantStatus = async (tenantId: string): Promise<Tenant> => {
  const response = await api.put(`/tenant/${tenantId}/toggle-status`);
  return response.data.data;
};
