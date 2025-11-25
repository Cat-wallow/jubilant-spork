'use client';

import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  ILoginRequest,
  ILoginResponse,
  IUser,
  ITenant,
  IRole,
  IUserTenant,
  ISwitchTenantRequest,
} from '@/types/auth';
import { switchTenant as switchTenantService } from '@/services/tenantService';
import { setTokens, clearTokens, getRefreshToken } from '@/lib/tokenManager';

interface IAuthContext {
  // Core user data
  user: IUser | null;
  tenant?: ITenant | null;
  currentRole: IRole | null;
  availableTenants: IUserTenant[];
  permissions: string[];

  // Auth state
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (credentials: ILoginRequest) => void;
  loginIsPending: boolean;
  loginError: Error | null;
  logout: () => void;
  switchTenant: (data: ISwitchTenantRequest) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Function to fetch the current session information.
// Token refresh is now handled by the axios interceptor in @/lib/api.
const getMe = async (): Promise<ILoginResponse> => {
  const { data } = await api.get('auth/me');
  return data as ILoginResponse;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isOnAuthPage =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');

  const {
    data: sessionResponse,
    isLoading,
    isError,
  } = useQuery<ILoginResponse>({
    queryKey: ['session'],
    queryFn: getMe,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: typeof window !== 'undefined' && !isOnAuthPage,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      // Clear any leftover tokens before attempting a new login
      clearTokens();
      queryClient.setQueryData(['session'], null);
      const { data } = await api.post('auth/login', credentials);
      return {
        response: data as ILoginResponse,
        rememberMe: credentials.rememberMe,
      };
    },
    onSuccess: ({ response, rememberMe }) => {
      const { accessToken, refreshToken } = response.data;

      // If tokens are in the response body, it's a session-only login
      if (accessToken) {
        setTokens(accessToken, refreshToken, rememberMe ?? false);
      }

      queryClient.setQueryData(['session'], response);
      queryClient.invalidateQueries({ queryKey: ['session'] });

      const redirectPath = response.data?.redirectTo;
      router.push(redirectPath);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      clearTokens();
      queryClient.setQueryData(['session'], null);
    },
  });

  const switchTenantMutation = useMutation({
    mutationFn: (data: ISwitchTenantRequest) => switchTenantService(data),
    onSuccess: (response) => {
      queryClient.setQueryData(['session'], response);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Tenant switch failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = getRefreshToken();
      return api.post('auth/logout', { refreshToken });
    },
    onSuccess: () => {
      clearTokens();
      queryClient.clear(); // Clear all queries
      router.push('/auth/sign-in');
    },
    onError: () => {
      // Still clear everything on the client-side even if backend logout fails
      clearTokens();
      queryClient.clear();
      router.push('/auth/sign-in');
    },
  });

  const sessionData = sessionResponse?.data;
  const isAuthenticated = !!sessionData && !isError;

  return (
    <AuthContext.Provider
      value={{
        user: sessionData?.user || null,
        tenant: sessionData?.tenant || null,
        currentRole: sessionData?.role || null,
        availableTenants: sessionData?.availableTenants || [],
        permissions: sessionData?.permissions || [],
        isAuthenticated,
        isLoading,
        login: loginMutation.mutate,
        loginIsPending: loginMutation.isPending,
        loginError: loginMutation.error,
        logout: logoutMutation.mutate,
        switchTenant: switchTenantMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
