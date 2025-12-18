import api from "@/lib/api";
import { SortDescriptor } from "@/types/shared";
import queryString from "query-string";

// Define Project types
export interface Project {
	id: string;
	code: string;
	name: string;
	status: string;
	progress: number;
	clients?: {
		id: string;
		name: string;
	};
	contract_basis?: string;
	contract_date?: string;
	start_date?: string;
	end_date?: string;
	budget?: number;
	notes?: string;
	due_policy_days?: number;
	bast_template_id?: string;
	invoice_template_id?: string;
	project_scopes: { scope_name: string }[];
	project_members?: { user_id: string; role: string; scope: string }[];
	project_escalations?: { user_id: string }[];
	users_projects_pmo_idTousers?: {
		id: string;
		name: string;
	};
	users_projects_ketua_tim_idTousers?: {
		id: string;
		name: string;
	};
	updated_at: string;
	created_at: string;
}

export interface PaginatedProjectsResponse {
	success: boolean;
	data: {
		projects: Project[];
		total: number;
	};
	message: string;
}

// Define ProjectMember types
export interface ProjectMember {
	id: string;
	name: string;
	avatar: string;
	role: string;
	modules: string[];
}

export interface GetProjectMembersParams {
	page?: number;
	pageSize?: number;
	search?: string;
	projectId: string;
	module?: string; // For filtering by module
	sort?: {
		column: string;
		direction: "asc" | "desc";
	};
}

export interface GetProjectMembersResponse {
	data: {
		members: ProjectMember[];
		total: number;
	};
}

export const getProjects = async (
	page: number,
	limit: number,
	search?: string,
	status?: string,
	scope?: string,
	sort?: SortDescriptor,
	tenantId?: string, // Optional tenantId parameter
): Promise<PaginatedProjectsResponse> => {
	const params = new URLSearchParams();
	params.append("page", page.toString());
	params.append("limit", limit.toString());
	if (search) params.append("search", search);
	if (status && status !== "all") params.append("status", status);
	if (scope && scope !== "all") params.append("plan", scope); // Using 'plan' key for consistency with controller or 'scope' if I changed controller. I used 'plan' in controller map.
	if (sort) {
		params.append("sortBy", sort.column as string);
		params.append("sortOrder", sort.direction);
	}

	const config = tenantId ? { headers: { "X-Tenant-Id": tenantId } } : {};

	const response = await api.get<PaginatedProjectsResponse>(
		`/project?${params.toString()}`,
		config,
	);
	return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
	const response = await api.get<{ success: boolean; data: Project }>(
		`/project/${id}`,
	);
	return response.data.data;
};

export const updateProject = async (
	id: string,
	payload: any,
): Promise<Project> => {
	const response = await api.put<{ success: boolean; data: Project }>(
		`/project/${id}`,
		payload,
	);
	return response.data.data;
};

export const deleteProject = async (id: string): Promise<void> => {
	await api.delete(`/project/${id}`);
};

export const getProjectStats = async (): Promise<{
	activeProjects: number;
	totalMembers: number;
	overdueProjects: number;
	readyForBast: number;
}> => {
	const response = await api.get<{ success: boolean; data: any }>(
		"/project/stats",
	);
	return response.data.data;
};

export const getProjectMembers = async (
	params: GetProjectMembersParams,
): Promise<GetProjectMembersResponse> => {
	const query = queryString.stringify({
		page: params.page,
		pageSize: params.pageSize,
		search: params.search,
		module: params.module,
		"sort[column]": params.sort?.column,
		"sort[direction]": params.sort?.direction,
	});

	const response = await api.get<GetProjectMembersResponse>(
		`/project/${params.projectId}/members?${query}`,
	);

	return response.data;
};

export type ProjectTaskModule = "FORM_1" | "KK_1" | "KK_2" | "KK_3" | "KK_4" | "KK_5";
export type ProjectTaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface CreateProjectTaskPayload {
	title: string;
	description?: string;
	assigned_user_id?: string;
	module: ProjectTaskModule;
	priority?: ProjectTaskPriority;
	due_date?: string;
}

export interface ProjectTask {
	id: string;
	tenant_id: string;
	project_id: string;
	title: string;
	description: string | null;
	assigned_user_id: string | null;
	priority: ProjectTaskPriority;
	module: ProjectTaskModule;
	status: string;
	progress: number;
	due_date: string | null;
	created_at: string;
	updated_at: string;
	created_by: string;
	updated_by: string | null;
	deleted_at: string | null;
	deleted_by: string | null;
}

export const createProjectTask = async (
	projectId: string,
	payload: CreateProjectTaskPayload,
): Promise<ProjectTask> => {
	const response = await api.post<{
		success: boolean;
		message: string;
		data: ProjectTask;
	}>(`/project/${projectId}/tasks`, payload);

	return response.data.data;
};
