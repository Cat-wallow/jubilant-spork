import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3001',
  withCredentials: true, // Important for sending cookies
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Conditions to try token refresh:
    // 1. The error is 401 (Unauthorized).
    // 2. The request hasn't been retried yet.
    // 3. The failed request was NOT for the refresh-token endpoint itself.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/refresh-token'
    ) {
      originalRequest._retry = true;

      try {
        // The backend will issue a new access token cookie on successful refresh
        await api.get('/refresh-token');
        // Retry the original request, the browser will send the new cookie
        return api(originalRequest);
      } catch (refreshError) {
        // Handle failed refresh (e.g., redirect to login)
        console.error('Token refresh failed:', refreshError);
        // Optionally trigger a global logout state change
        // window.location.href = '/auth/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const forgotPassword = (email: string) => {
  return api.post('/forgot-password', { email });
};

export const resetPassword = (data: {
  token: string;
  password;
  confirmPassword;
}) => {
  return api.post('/reset-password', data);
};

export default api;
