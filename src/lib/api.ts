import axios from 'axios';
import { toast } from 'sonner';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './tokenManager';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_GATEWAY_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:8000',
  withCredentials: true, // Important for sending cookies
});

// Request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const skipRefreshUrls = ['auth/login', 'auth/refresh-token', 'auth/logout'];
    const shouldSkipRefresh = skipRefreshUrls.some((url) =>
      originalRequest.url?.includes(url),
    );

    if (error.response?.status === 401 && !shouldSkipRefresh) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        // No refresh token available, truly unauthenticated
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        toast.error(error.response?.data?.message || error.message || 'Sesi Anda telah berakhir. Silakan login kembali.');
        return Promise.reject(error);
      }

      try {
        const { data } = await api.post('/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;

        // Check if the old refresh token was in localStorage to decide new storage
        const rememberMe =
          typeof window !== 'undefined' &&
          !!window.localStorage.getItem('refreshToken');
        setTokens(newAccessToken, newRefreshToken, rememberMe);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        toast.error(refreshError.response?.data?.message || refreshError.message || 'Gagal memperbarui sesi. Silakan login kembali.');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For any other error, display a generic error toast if a specific message is not provided
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error('Terjadi kesalahan tidak terduga.');
    }

    return Promise.reject(error);
  },
);

export const forgotPassword = (email: string) => {
  return api.post('auth/forgot-password', { email });
};

export const resetPassword = (data: {
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  return api.post('auth/reset-password', data);
};

export default api;
