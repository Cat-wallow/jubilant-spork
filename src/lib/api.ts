import axios from 'axios';
import { toast } from 'sonner';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenManager';

const logFormData = (formData: FormData) => {
  console.log('[FORM DATA]');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, {
        name: value.name,
        type: value.type,
        size: value.size,
      });
    } else {
      console.log(`${key}:`, value);
    }
  }
};


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
    // URLs that should not receive the Authorization header
    const skipAuthUrls = ['auth/login', 'auth/refresh-token'];
    const shouldSkipAuth = skipAuthUrls.some((url) => config.url?.includes(url));

    if (token && !shouldSkipAuth) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 🔍 DEBUG REQUEST
    console.log('[API REQUEST]');
    console.log('URL:', config.baseURL + config.url);
    console.log('Method:', config.method);
    console.log('Headers:', config.headers);
    console.log('Params:', config.params);
    console.log('Body:', config.data); // ⬅️ INI YANG KAMU CARI

    if (config.data instanceof FormData) {
      logFormData(config.data); // ✅ BONGKAR ISINYA
    } else {
      console.log('[REQUEST BODY]', config.data);
    }



    // X-Tenant-Id header will be set globally by setTenantIdHeader function called from AuthContext
    return config;
  },
  (error) => Promise.reject(error),
);

export const setTenantIdHeader = (tenantId: string | null) => {
  if (tenantId) {
    api.defaults.headers.common['X-Tenant-Id'] = tenantId;
  } else {
    delete api.defaults.headers.common['X-Tenant-Id'];
  }
};

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
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

    // Prevent infinite loops
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const skipRefreshUrls = ['auth/login', 'auth/refresh-token', 'auth/logout'];
    const shouldSkipRefresh = skipRefreshUrls.some((url) => originalRequest.url?.includes(url));

    if (error.response?.status === 401 && !shouldSkipRefresh && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      console.log('[API] 401 detected. Attempting refresh. Token available:', !!refreshToken);

      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error('No refresh token available'), null);
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
      }

      try {
        // Call refresh token endpoint
        // Note: Using axios directly or a separate instance to avoid circular interceptors could be safer,
        // but since we exclude 'auth/refresh-token' in shouldSkipRefresh, it should be fine.
        const { data } = await api.post('/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

        console.log('[API] Token refresh successful.');

        // Determine storage type based on where refreshToken was found
        const rememberMe = typeof window !== 'undefined' && !!window.localStorage.getItem('refreshToken');
        setTokens(newAccessToken, newRefreshToken, rememberMe);

        // Update defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Update original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError: any) {
        console.error('[API] Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors, you might want to handle them differently
    // or just reject them.
    if (error.response?.data?.message && error.response?.status !== 401) {
      toast.error(error.response.data.message);
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
