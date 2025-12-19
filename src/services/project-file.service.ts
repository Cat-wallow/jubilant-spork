import api from "@/lib/api";

interface CreateProjectFilePayload {
    name: string;
    file_type: string;
    file_url: string;
    file_size?: number;
    visible_to_customer?: boolean;
}

interface UpdateProjectFilePayload {
    name?: string;
    visible_to_customer?: boolean;
}

interface GetProjectFilesParams {
    page?: number;
    limit?: number;
    search?: string;
    fileType?: string;
    sortBy?: string;
    sortOrder?: string;
}

export async function uploadProjectFile(projectId: string, file: File, name: string, visibleToCustomer: boolean) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('file_type', file.type.split('/')[0]); // e.g., 'image', 'application'
    formData.append('visible_to_customer', String(visibleToCustomer));

    const response = await api.post(`project/${projectId}/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function getProjectFiles(projectId: string, params: GetProjectFilesParams) {
    const response = await api.get(`project/${projectId}/files`, { params });
    return response.data;
}

export async function toggleProjectFileVisibility(projectId: string, fileId: string, visible: boolean) {
    const response = await api.put(`project/${projectId}/files/${fileId}`, { visible_to_customer: visible });
    return response.data;
}

export async function deleteProjectFile(projectId: string, fileId: string) {
    const response = await api.delete(`project/${projectId}/files/${fileId}`);
    return response.data;
}
