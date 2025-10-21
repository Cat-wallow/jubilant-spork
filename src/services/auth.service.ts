import api, { setAccessToken } from 'lib/api';
import { ILoginResponse, ILoginRequest } from 'types/auth';

export const login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>('/auth/login', credentials);
  if (data.data.accessToken) {
    setAccessToken(data.data.accessToken);
  }
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  setAccessToken('');
};
