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
  const { data } = await api.get('/refresh-token', { withCredentials: true });
  return data as ILoginResponse;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use a query to fetch the session, this will act as our session check
  const {
    data: sessionResponse,
    isLoading,
    isError,
  } = useQuery<ILoginResponse>({
    queryKey: ['session'],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      const { data } = await api.post('/account/login', credentials);
      return data as ILoginResponse;
    },
    onSuccess: (response) => {
      // Store the entire session response in the query cache
      queryClient.setQueryData(['session'], response);
      router.push('/admin/default');
    },
    onError: (error) => {
      console.error('Login failed:', error);
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
    mutationFn: () => api.post('/account/logout'),
    onSuccess: () => {
      // Clear session data and redirect
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
