import api from 'lib/api';
import { ILoginResponse, ILoginRequest } from 'types/auth';

export const login = async (
  credentials: ILoginRequest,
): Promise<ILoginResponse> => {
  try {
    const { data } = await api.post<ILoginResponse>('/login', credentials);
    return data;
  } catch (error: any) {
    // Jika API mengembalikan respons dengan message
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    // Fallback ke error umum
    throw new Error('Email atau kata sandi salah');
  }
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
};
