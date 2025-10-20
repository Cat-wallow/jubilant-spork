import { API_URL } from 'config';
import { ILoginResponse } from 'types/auth';

export const login = async (email: string, password: string, rememberMe: boolean): Promise<ILoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, rememberMe }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to login');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to logout');
  }
};

export const refreshToken = async (): Promise<ILoginResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to refresh token');
  }

  return response.json();
};
