import api from "@/lib/api";
import { Transaction, TransactionStatus } from "@/types/transaction";

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string; // For jenis_dokumen
  sortBy?: string;
  sortOrder?: string;
  isApproved?: string; // 'true' | 'false'
  documentId?: string;
}

export interface ITransactionsResponse {
  data: Transaction[];
  total: number;
  success: boolean;
  message: string;
}

const BASE_URL = "/transaction";

export async function getTransactions(projectId: string, params: GetTransactionsParams): Promise<ITransactionsResponse> {
  const { page, limit, search, status, type, sortBy, sortOrder, isApproved, documentId } = params;
  try {
    const response = await api.get(`${BASE_URL}/${projectId}`, {
      params: {
        page,
        limit,
        search,
        status,
        type,
        sortBy,
        sortOrder,
        isApproved,
        documentId
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTransactionById(id: string) {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTransaction(id: string, payload: any) {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function approveTransaction(id: string) {
  try {
    const response = await api.put(`${BASE_URL}/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function revertApproval(id: string) {
  try {
    const response = await api.put(`${BASE_URL}/${id}/revert`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTransaction(id: string) {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTransaction(projectId: string, payload: any) {
  try {
    const response = await api.post(`${BASE_URL}/${projectId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadTransactionProof(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post(`${BASE_URL}/upload-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
