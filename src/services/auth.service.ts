import api from '@/lib/api';
import { ILoginResponse, ILoginRequest } from '@/types/auth';

export const login = async (
  credentials: ILoginRequest,
): Promise<ILoginResponse> => {
  try {
    const { data } = await api.post<ILoginResponse>('auth/login', credentials);
    return data;
  } catch (error: any) {
    // Prevent axios interceptor from trying to refresh on login errors
    if (error.config) {
      error.config._skipRefresh = true;
    }

    // Jika API mengembalikan respons dengan message
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Email/Username atau kata sandi salah');
    }

    if (error.response?.status === 429) {
      throw new Error(
        'Terlalu banyak percobaan login. Silakan coba lagi nanti.',
      );
    }

    // Network errors
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      throw new Error('Koneksi bermasalah. Periksa koneksi internet Anda.');
    }

    // Fallback ke error umum
    throw new Error('Login gagal. Silakan coba lagi.');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('auth/logout');
  } catch (error) {
    // Even if logout fails on server, we should still clear client state
    console.warn(
      'Logout request failed, but continuing with local cleanup:',
      error,
    );
  }
};
