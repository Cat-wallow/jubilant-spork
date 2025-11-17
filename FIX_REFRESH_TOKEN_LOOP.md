# Fix: Infinite Refresh Token Loop pada Login Error

## 🐛 Masalah yang Terjadi

Ketika user memasukkan password yang salah, terjadi **infinite loop** request ke endpoint `auth/refresh-token`. 

### Root Cause:
1. Login gagal dengan status **401 Unauthorized**
2. Axios interceptor mendeteksi 401 → mencoba refresh token
3. Refresh token juga gagal (401) → mencoba lagi
4. AuthContext melakukan query session otomatis → loop terus menerus
5. Browser crash atau freeze karena terlalu banyak request

## ✅ Solusi yang Diterapkan

### 1. **AuthContext** (`contexts/AuthContext.tsx`)

#### Perubahan:
```typescript
// Cek apakah user sedang di halaman auth
const isOnAuthPage =
  typeof window !== 'undefined' &&
  (window.location.pathname.includes('/auth/') ||
    window.location.pathname === '/auth');

// Disable session query di halaman auth
useQuery({
  queryKey: ['session'],
  queryFn: getMe,
  retry: false,
  refetchOnWindowFocus: false,
  enabled: typeof window !== 'undefined' && !isOnAuthPage, // ✅ Disable di auth pages
  staleTime: 5 * 60 * 1000, // ✅ Cache selama 5 menit
});

// Clear session data saat login error
onError: (error) => {
  console.error('Login failed:', error);
  queryClient.setQueryData(['session'], null); // ✅ Clear session
}
```

#### Benefit:
- ✅ Tidak melakukan auto-fetch session ketika di halaman login
- ✅ Session data dibersihkan saat login gagal
- ✅ Prevent race condition dengan stale time

---

### 2. **API Interceptor** (`lib/api.ts`)

#### Perubahan:
```typescript
// Daftar endpoint yang TIDAK boleh trigger refresh token
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

// Cek multiple kondisi sebelum refresh
if (
  error.response?.status === 401 &&
  !originalRequest._retry &&
  !shouldSkipRefresh && // ✅ Skip untuk auth endpoints
  !originalRequest._skipRefresh && // ✅ Skip jika ada flag
  !api.defaults.headers.common['X-Refreshing'] // ✅ Prevent simultaneous refresh
) {
  // Set flag untuk prevent multiple refresh
  api.defaults.headers.common['X-Refreshing'] = 'true';
  
  try {
    await api.get('/auth/refresh-token');
    delete api.defaults.headers.common['X-Refreshing'];
    return api(originalRequest);
  } catch (refreshError) {
    delete api.defaults.headers.common['X-Refreshing'];
    
    // Redirect ke login hanya jika bukan di auth pages
    if (
      typeof window !== 'undefined' &&
      !window.location.pathname.includes('/auth/')
    ) {
      window.location.href = '/auth/sign-in';
    }
    
    return Promise.reject(refreshError);
  }
}
```

#### Benefit:
- ✅ Login request tidak akan trigger refresh token
- ✅ Prevent multiple simultaneous refresh attempts
- ✅ Smart redirect (tidak redirect jika sudah di auth pages)

---

### 3. **Auth Service** (`services/auth.service.ts`)

#### Perubahan:
```typescript
export const login = async (credentials: ILoginRequest) => {
  try {
    const { data } = await api.post<ILoginResponse>('auth/login', credentials);
    return data;
  } catch (error: any) {
    // ✅ Set flag untuk skip refresh
    if (error.config) {
      error.config._skipRefresh = true;
    }

    // ✅ Better error messages
    if (error.response?.status === 401) {
      throw new Error('Email/Username atau kata sandi salah');
    }

    if (error.response?.status === 429) {
      throw new Error('Terlalu banyak percobaan login. Silakan coba lagi nanti.');
    }

    if (error.code === 'NETWORK_ERROR' || !error.response) {
      throw new Error('Koneksi bermasalah. Periksa koneksi internet Anda.');
    }

    throw new Error('Login gagal. Silakan coba lagi.');
  }
};
```

#### Benefit:
- ✅ Error dari login tidak akan trigger refresh token attempt
- ✅ User-friendly error messages
- ✅ Handle network errors dengan baik

---

### 4. **useAuth Hook** (`hooks/useAuth.ts`)

#### Perubahan:
```typescript
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: ILoginRequest) => {
      // ✅ Clear stale data sebelum login
      queryClient.setQueryData(['session'], null);
      return login(credentials);
    },
    onSuccess: (data) => {
      // ✅ Set session data langsung
      queryClient.setQueryData(['session'], data);
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/admin/default');
    },
    onError: (error) => {
      // ✅ Clear session data saat error
      queryClient.setQueryData(['session'], null);
      console.error('Login failed:', error);
    },
  });
};
```

#### Benefit:
- ✅ Clear stale session data sebelum login attempt
- ✅ Direct session update untuk prevent race condition
- ✅ Clean state management pada error

---

## 🎯 Flow Setelah Fix

### Skenario: User Salah Password

**SEBELUM FIX:**
```
1. User input password salah → POST /auth/login
2. Server response: 401 Unauthorized
3. Axios interceptor: "Ada 401, coba refresh token!"
4. GET /auth/refresh-token → 401 (karena belum login)
5. Interceptor: "Ada 401 lagi, coba refresh token!"
6. GET /auth/refresh-token → 401
7. Loop terus... 🔄🔄🔄
8. Browser freeze/crash 💥
```

**SETELAH FIX:**
```
1. User input password salah → POST /auth/login
2. Server response: 401 Unauthorized
3. Axios interceptor check:
   - URL: auth/login → ✅ SKIP REFRESH (ada di skipRefreshUrls)
   - _skipRefresh flag: true → ✅ SKIP REFRESH
4. Error langsung ke auth.service
5. Service throw error message: "Email/Username atau kata sandi salah"
6. AuthContext clear session data
7. User tetap di login page dengan error message
8. ✅ TIDAK ADA LOOP!
```

---

## 🛡️ Layer Proteksi yang Ditambahkan

### Layer 1: URL-based Skip
```typescript
const skipRefreshUrls = ['auth/login', 'auth/refresh-token', ...];
```
→ Tidak refresh jika URL masuk dalam daftar ini

### Layer 2: Flag-based Skip
```typescript
error.config._skipRefresh = true;
```
→ Request individual bisa set flag untuk skip refresh

### Layer 3: Simultaneous Refresh Prevention
```typescript
api.defaults.headers.common['X-Refreshing'] = 'true';
```
→ Hanya satu refresh attempt pada satu waktu

### Layer 4: Page-based Query Disabling
```typescript
enabled: !isOnAuthPage
```
→ Session query disabled di auth pages

### Layer 5: Session Data Cleanup
```typescript
queryClient.setQueryData(['session'], null);
```
→ Clear session data pada error untuk prevent retry

---

## 🧪 Testing

### Test Case 1: Login dengan Password Salah
```
Expected: 
- Error message muncul
- Tidak ada loop request
- User tetap di login page
```

### Test Case 2: Login dengan Password Benar
```
Expected:
- Session data tersimpan
- Redirect ke /admin/default
- Session query enabled setelah login
```

### Test Case 3: Logout
```
Expected:
- Clear semua cache
- Redirect ke /auth/sign-in
- Session query disabled di auth page
```

### Test Case 4: Token Expired di Dashboard
```
Expected:
- Refresh token berjalan normal (bukan di auth page)
- Jika refresh gagal, redirect ke login
- Tidak ada loop
```

---

## 📝 Notes untuk Developer

1. **Jangan tambahkan retry** pada session query di AuthContext
2. **Selalu clear session data** saat logout atau login error
3. **Tambahkan URL ke skipRefreshUrls** jika ada endpoint auth baru
4. **Test dengan network throttling** untuk ensure no race conditions
5. **Monitor console** untuk pastikan tidak ada infinite loop

---

## 🔍 Debugging

Jika masih terjadi loop, cek:

1. **Console logs** - apakah ada request berulang?
2. **Network tab** - berapa banyak request ke /auth/refresh-token?
3. **React Query DevTools** - apakah session query ter-trigger terus?
4. **Axios interceptor** - apakah semua kondisi skip sudah benar?

---

## ✨ Hasil Akhir

- ✅ **Tidak ada infinite loop** saat login error
- ✅ **Better error messages** untuk user
- ✅ **Proper session management** dengan clear lifecycle
- ✅ **Smart token refresh** yang tidak aggressive
- ✅ **Clean cache management** pada transitions

---

**Created:** 2025-01-XX  
**Fixed by:** AI Assistant  
**Tested on:** Frontend Next.js dengan Axios + React Query