'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from 'lib/api';
import { ILoginRequest } from 'types/auth';

// Define the user type based on your ILoginResponse
export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: ILoginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Function to fetch the current user
const getMe = async (): Promise<IUser> => {
  const { data } = await api.get('/auth/me');
  return data.data;
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
    retry: false, // Don't retry on failure, it means the user is not logged in
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      const { data } = await api.post('/auth/login', credentials);
      return data.user as IUser;
    },
    onSuccess: (user) => {
      // On success, invalidate and refetch the user query
      queryClient.setQueryData(['user'], user);
      router.push('/admin/default');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // You can add toast notifications here
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      // Clear user data and redirect
      queryClient.setQueryData(['user'], null);
      router.push('/auth/sign-in');
    },
  });

  const isAuthenticated = !!user && !isError;

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        isLoading,
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
