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
}

export interface ITransactionsResponse {
  data: Transaction[];
  total: number;
  success: boolean;
  message: string;
}

const BASE_URL = "project/transaction";

export async function getTransactions(projectId: string, params: GetTransactionsParams): Promise<ITransactionsResponse> {
  const { page, limit, search, status, type, sortBy, sortOrder, isApproved } = params;
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
        isApproved
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

// Deprecated or Unused based on trigger logic, but kept for reference if needed
// export async function createTransaction(projectId: string, payload: any) { ... }
