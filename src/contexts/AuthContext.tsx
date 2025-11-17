'use client';

import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from 'lib/api';
import {
  ILoginRequest,
  ILoginResponse,
  IUser,
  ITenant,
  IRole,
  IUserTenant,
  ISwitchTenantRequest,
} from 'types/auth';
import { switchTenant as switchTenantService } from 'services/tenantService';

interface IAuthContext {
  // Core user data
  user: IUser | null;
  tenant: ITenant | null;
  currentRole: IRole | null;
  availableTenants: IUserTenant[];
  permissions: string[];

  // Auth state
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (credentials: ILoginRequest) => void;
  logout: () => void;
  switchTenant: (data: ISwitchTenantRequest) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Function to fetch the current session information
const getMe = async (): Promise<ILoginResponse> => {
  try {
    // First, try to get the user session
    const { data } = await api.get('auth/me');
    return data as ILoginResponse;
  } catch (error: any) {
    // If it fails with 401, it might be an expired access token
    if (error.response?.status === 401) {
      try {
        // Attempt to refresh the token
        await api.get('auth/refresh-token');

        // If refresh is successful, retry getting the user session
        const { data } = await api.get('auth/me');
        return data as ILoginResponse;
      } catch (refreshError) {
        // If refreshing fails, then the session is truly invalid
        console.error('Session refresh failed, redirecting to login.');
        throw refreshError;
      }
    }
    // For other errors, just re-throw
    throw error;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Check if we're on auth pages to prevent unnecessary session checks
  const isOnAuthPage =
    typeof window !== 'undefined' &&
    (window.location.pathname.includes('/auth/') ||
      window.location.pathname === '/auth');

  // Use a query to fetch the session, this will act as our session check
  const {
    data: sessionResponse,
    isLoading,
    isError,
  } = useQuery<ILoginResponse>({
    queryKey: ['session'],
    queryFn: getMe,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (will be handled by interceptor) or 403
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      // Retry up to 2 times for other errors with exponential backoff
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true, // Refetch when user comes back to the window
    refetchOnReconnect: true, // Refetch when internet reconnects
    enabled: typeof window !== 'undefined' && !isOnAuthPage,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      queryClient.setQueryData(['session'], null);
      const { data } = await api.post('auth/login', credentials);
      return data as ILoginResponse;
    },
    onSuccess: (response) => {
      // Store the entire session response in the query cache
      queryClient.setQueryData(['session'], response);
      queryClient.invalidateQueries({ queryKey: ['session'] });

      // Redirect user based on the path provided by the backend
      const redirectPath = response.data?.redirectTo || '/admin/default';
      router.push(redirectPath);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      queryClient.setQueryData(['session'], null);
    },
  });

  const switchTenantMutation = useMutation({
    mutationFn: (data: ISwitchTenantRequest) => switchTenantService(data),
    onSuccess: (response) => {
      // Update the session data in the cache with new tenant context
      queryClient.setQueryData(['session'], response);

      // Refresh the page to reload all data with new tenant context
      window.location.reload();
    },
    onError: (error) => {
      console.error('Tenant switch failed:', error);
      // Optionally show error toast/notification here
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post('auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(['session'], null);
      router.push('/auth/sign-in');
    },
    onError: () => {
      queryClient.clear();
      queryClient.setQueryData(['session'], null);
      router.push('/auth/sign-in');
    },
  });

  // Extract data from the session response
  const sessionData = sessionResponse?.data;
  const isAuthenticated = !!sessionData && !isError;

  return (
    <AuthContext.Provider
      value={{
        // Core data
        user: sessionData?.user || null,
        tenant: sessionData?.tenant || null,
        currentRole: sessionData?.role || null,
        availableTenants: sessionData?.availableTenants || [],
        permissions: sessionData?.permissions || [],

        // Auth state
        isAuthenticated,
        isLoading,

        // Actions
        login: loginMutation.mutate,
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
