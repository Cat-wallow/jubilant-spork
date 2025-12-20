import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Client {
	id: string;
	code: string;
	name: string;
	legal_name?: string | null;
	type: string;
	business_type?: string | null;
	npwp?: string | null;
	email?: string | null;
	phone?: string | null;
	status?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	pkp_status?: boolean | null;
	active_projects?: number | null;
	deadline_project?: string | null;
	project_fiscal_year?: number | null;
	project_start_date?: string | null;
	project_end_date?: string | null;
	project_volume?: any;
}

export interface ClientDetail extends Client {
	brand_name?: string;
	country?: string;
	nik?: string;
	nib?: string;
	deed_number?: string;
	notary_name?: string;
	notary_location?: string;
	notary_contact?: string;
	establishment_date?: string;
	employee_count?: number;
	basic_capital?: number;
	paid_capital?: number;
	industry?: string;
	business_type?: string;
	industry_sector?: string;
	service_package?: string;
	business_scale?: string;
	annual_revenue?: number;
	taxpayer_type?: string;
	kpp_office?: string;
	applicable_taxes?: string[];
	pic_pkp_name?: string;
	pic_pkp_contact?: string;
	pic_pkp_email?: string;
	address?: string;
	city?: string;
	province?: string;
	postal_code?: string;
	website?: string;

	// Accounting Preferences
	use_default_coa?: boolean;
	coa_template?: string;
	use_tenant_voucher_numbering?: boolean;
	voucher_format?: string;
	reset_frequency?: string;
	padding_number?: number;
	voucher_prefix?: string;
	voucher_suffix?: string;

	// Nested relations (when backend includes)
	client_contacts?: any[];
	client_branches?: any[];
	client_legal_documents?: any[];
	client_tax_documents?: any[];
}

export interface TenantComplianceSummary {
	tenant_id: string;
	total_clients: number;
	evaluated_clients: number;
	average_score: number;
	compliance_rate: number;
	by_status: {
		ready: number;
		warning: number;
		not_ready: number;
	};
}

export type ReadinessStatus = "ready" | "warning" | "not_ready";

export interface ClientReadinessCheck {
	key: string;
	label: string;
	status: ReadinessStatus;
	missing?: string[];
}

export interface ClientReadinessResult {
	client_id: string;
	status: ReadinessStatus;
	score: number;
	checks: ClientReadinessCheck[];
}

interface ClientsResponse {
	items: Client[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

interface UseClientsParams {
	tenantId: string;
	search?: string;
	status?: string;
	type?: string;
	business_type?: string;
	pkp_status?: string;
	page?: number;
	limit?: number;
}

export const useClient = (tenantId: string, id: string) => {
	return useQuery<ClientDetail>({
		queryKey: ["client", tenantId, id],
		queryFn: async () => {
			const { data } = await api.get<ClientDetail>(
				`/client-wp/api/clients/${id}`,
				{
					headers: {
						"X-Tenant-Id": tenantId,
					},
				},
			);
			return data;
		},
		enabled: !!tenantId && !!id,
	});
};

export const useTerminateClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ tenantId, id }: { tenantId: string; id: string }) => {
			const response = await api.post(`/client-wp/api/clients/${id}/terminate`, {}, {
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});
			return response.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["clients", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["clients-compliance", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["client-history", variables.tenantId, variables.id],
			});
		},
	});
};

export const useActivateClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ tenantId, id }: { tenantId: string; id: string }) => {
			const response = await api.post(`/client-wp/api/clients/${id}/activate`, {}, {
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});
			return response.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["clients", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["clients-compliance", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["client-history", variables.tenantId, variables.id],
			});
		},
	});
};

export const useTenantComplianceSummary = (tenantId: string) => {
	return useQuery<TenantComplianceSummary>({
		queryKey: ["clients-compliance", tenantId],
		queryFn: async () => {
			const { data } = await api.get<TenantComplianceSummary>(
				"/client-wp/api/clients/compliance-summary",
				{
					headers: {
						"X-Tenant-Id": tenantId,
					},
				},
			);
			return data;
		},
		enabled: !!tenantId,
		staleTime: 1000 * 60 * 5,
	});
};

export const useClientReadiness = (tenantId: string, clientId: string) => {
	return useQuery<ClientReadinessResult>({
		queryKey: ["client-readiness", tenantId, clientId],
		queryFn: async () => {
			const { data } = await api.get<ClientReadinessResult>(
				"/client-wp/api/clients/" + clientId + "/readiness",
				{
					headers: {
						"X-Tenant-Id": tenantId,
					},
				},
			);
			return data;
		},
		enabled: !!tenantId && !!clientId,
		staleTime: 1000 * 60 * 5,
	});
};

export const useClients = (params: UseClientsParams) => {
	const {
		tenantId,
		search,
		status,
		type,
		business_type,
		pkp_status,
		page = 1,
		limit = 10,
	} = params;
	const safeLimit = Math.min(Math.max(1, limit), 100);

	return useQuery<ClientsResponse>({
		queryKey: [
			"clients",
			tenantId,
			{ search, status, type, business_type, pkp_status, page, limit: safeLimit },
		],
		queryFn: async () => {
			const { data } = await api.get<{
				items: Client[];
				total: number;
				page: number;
				size: number;
			}>("/client-wp/api/clients", {
				params: {
					search,
					status,
					type,
					business_type,
					pkp_status,
					page,
					size: safeLimit,
				},
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});

			const d = data;
			const response: ClientsResponse = {
				items: d.items,
				pagination: {
					page: d.page,
					limit: d.size,
					total: d.total,
					totalPages: Math.ceil((d.total || 0) / (d.size || 1)),
				},
			};

			return response;
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useCreateClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ tenantId, data }: { tenantId: string; data: any }) => {
			const response = await api.post("/client-wp/api/clients", data, {
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});
			return response.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["clients", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["clients-compliance", variables.tenantId],
			});
		},
	});
};

export const useDeleteClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ tenantId, id }: { tenantId: string; id: string }) => {
			await api.delete(`/client-wp/api/clients/${id}`, {
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["clients", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["clients-compliance", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["client-history", variables.tenantId, variables.id],
			});
		},
	});
};

export const useUpdateClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			tenantId,
			id,
			data,
		}: {
			tenantId: string;
			id: string;
			data: any;
		}) => {
			console.log("API Request - PUT /client-wp/api/clients/" + id, data); // DEBUG LOG
			const response = await api.put(`/client-wp/api/clients/${id}`, data, {
				headers: {
					"X-Tenant-Id": tenantId,
				},
			});
			console.log("API Response:", response.data); // DEBUG LOG
			return response.data;
		},
		onSuccess: (_, variables) => {
			console.log("Mutation successful for client:", variables.id); // DEBUG LOG
			toast.success("Berhasil", {
				description: "Edit data klien berhasil",
			});
			queryClient.invalidateQueries({
				queryKey: ["clients", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["client", variables.tenantId, variables.id],
			});
			queryClient.invalidateQueries({
				queryKey: ["clients-compliance", variables.tenantId],
			});
			queryClient.invalidateQueries({
				queryKey: ["client-history", variables.tenantId, variables.id],
			});
		},
		onError: (error) => {
			console.error("Mutation error:", error); // DEBUG LOG
			toast.error("Gagal", {
				description: "Gagal mengedit data klien",
			});
		},
	});
};
