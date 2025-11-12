'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from 'lib/api';
import { ILoginRequest, ILoginResponse } from 'types/auth';

// Define the user type based on your ILoginResponse
export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  permissions: string[]; // Array of permission names
}

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: string[];
  role: string | null;
  login: (credentials: ILoginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Function to fetch the current user and their permissions
const getMe = async (): Promise<IUser> => {
  // Assuming the /verify endpoint returns the user and their permissions
  const { data } = await api.get('/refresh-token', { withCredentials: true });
  return data; // The response should match the IUser interface
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use a query to fetch the user, this will act as our session check
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: getMe,
    retry: false, // Don't retry on failure
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      // The backend response now includes user, tenant, and permissions
      const { data } = await api.post('/account/login', credentials);
      return data as ILoginResponse; // Full response
    },
    onSuccess: (response) => {
      // Store user and permissions in the query cache
      const userData: IUser = {
        ...response.data.user,
        role: response.data.role || response.data.user.role,
        permissions: response.data.permissions || [],
      };
      queryClient.setQueryData(['user'], userData);
      router.push('/admin/default');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/account/logout'),
    onSuccess: () => {
      // Clear user data and redirect
      queryClient.setQueryData(['user'], null);
      router.push('/auth/sign-in');
    },
  });

  const isAuthenticated = !!user && !isError;
  const permissions = user?.permissions || [];
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        isLoading,
        permissions, // Provide permissions through the context
        role, // Provide role through the context
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
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
