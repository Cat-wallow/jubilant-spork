// A utility to manage storing and retrieving auth tokens

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

type StorageType = 'localStorage' | 'sessionStorage';

let tokenStorage: Storage =
  typeof window !== 'undefined' ? window.sessionStorage : ({} as Storage);
let storageType: StorageType = 'sessionStorage';

const getStorage = (): Storage => {
  if (typeof window === 'undefined') {
    // Return a dummy storage for SSR
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    };
  }
  return window[storageType];
};

const setStorageType = (rememberMe: boolean) => {
  storageType = rememberMe ? 'localStorage' : 'sessionStorage';
  tokenStorage = getStorage();
};

export const setTokens = (
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
) => {
  setStorageType(rememberMe);
  getStorage().setItem(ACCESS_TOKEN_KEY, accessToken);
  getStorage().setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = (): string | null => {
  // Try getting from either storage, localStorage first
  let token =
    typeof window !== 'undefined' ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  if (!token) {
    token =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
        : null;
  }
  return token;
};

export const getRefreshToken = (): string | null => {
  // Try getting from either storage, localStorage first
  let token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem(REFRESH_TOKEN_KEY)
      : null;
  if (!token) {
    token =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem(REFRESH_TOKEN_KEY)
        : null;
  }
  return token;
};

export const clearTokens = () => {
  // Clear from both storages to be safe
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};
