import axios from 'axios';

const api = axios.create({
  // Prefer Kong Gateway in front of all services
  baseURL:
    process.env.NEXT_PUBLIC_GATEWAY_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ||
    'http://localhost:8000',
  withCredentials: true, // Important for sending cookies
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh token for these endpoints to prevent loops
    const skipRefreshUrls = [
      'auth/login',
      'auth/refresh-token',
      'auth/logout',
      'auth/register',
      'auth/forgot-password',
      'auth/reset-password',
    ];

    const shouldSkipRefresh = skipRefreshUrls.some((url) =>
      originalRequest.url?.includes(url),
    );

    // Conditions to try token refresh:
    // 1. The error is 401 (Unauthorized).
    // 2. The request hasn't been retried yet.
    // 3. The failed request is NOT in the skip list.
    // 4. We're not already in the process of refreshing.
    // 5. The request doesn't have _skipRefresh flag set.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh &&
      !originalRequest._skipRefresh &&
      !api.defaults.headers.common['X-Refreshing']
    ) {
      originalRequest._retry = true;

      try {
        // Set flag to prevent multiple refresh attempts
        api.defaults.headers.common['X-Refreshing'] = 'true';

        // The backend will issue a new access token cookie on successful refresh
        await api.get('/auth/refresh-token');

        // Clear the refresh flag
        delete api.defaults.headers.common['X-Refreshing'];

        // Retry the original request, the browser will send the new cookie
        return api(originalRequest);
      } catch (refreshError) {
        // Clear the refresh flag
        delete api.defaults.headers.common['X-Refreshing'];

        // Handle failed refresh - redirect to login only if we're not already there
        console.error('Token refresh failed:', refreshError);

        // Only redirect if we're not already on auth pages
        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.includes('/auth/')
        ) {
          window.location.href = '/auth/sign-in';
        }

        return Promise.reject(refreshError);
      }
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
