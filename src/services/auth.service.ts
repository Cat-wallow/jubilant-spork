import api from 'lib/api';
import { ILoginResponse, ILoginRequest } from 'types/auth';

export const login = async (
  credentials: ILoginRequest,
): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>('/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
};
