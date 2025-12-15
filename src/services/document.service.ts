import api from "@/lib/api";
import { TransactionResponse } from "@/types/transaction";

export async function getDocumentById(documentId: string) {
  try {
    const response = await api.get(`project/document/${documentId}`); // Corrected path
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface GetDocumentsForKK1Params {
    page?: number;
    limit?: number;
    search?: string;
    documentStatus?: string;
    transactionStatus?: string;
    sortBy?: string;
    sortOrder?: string;
    isApproved?: string; // 'true' | 'false'
}

export async function getDocumentsForKK1(projectId: string, params: GetDocumentsForKK1Params): Promise<TransactionResponse> {
    const { page, limit, search, documentStatus, transactionStatus, sortBy, sortOrder, isApproved } = params;
    try {
        const response = await api.get(`project/document/${projectId}/kk1`, {
            params: {
                page,
                limit,
                search,
                documentStatus,
                transactionStatus,
                sortBy,
                sortOrder,
                isApproved
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
