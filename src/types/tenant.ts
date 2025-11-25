export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  status: string;
  max_users: number;
  max_projects: number;
  storage_quota_gb: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedTenantsResponse {
  success: boolean;
  data: {
    tenants: Tenant[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateTenantPayload {
  name: string;
  slug: string;
  plan?: string;
  maxUsers?: number;
  maxProjects?: number;
  storageQuotaGb?: number;
  trialDays?: number;
  logo_url?: string;
  settings?: any;
}

export type UpdateTenantPayload = Partial<CreateTenantPayload>;
