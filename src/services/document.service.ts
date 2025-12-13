import api from "@/lib/api";

export async function getDocumentById(documentId: string) {
  try {
    const response = await api.get(`project/document/${documentId}`); // Assuming /documents/:id endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDocumentsByProjectId(projectId: string) {
    try {
        const response = await api.get(`/projects/${projectId}/documents`); // Assuming /projects/:projectId/documents endpoint
        return response.data;
    } catch (error) {
        throw error;
    }
}
