import { DefaultAuthStore } from '../auth';
import { createContext, useContext } from 'react';
import { log } from '@react-native-spotify/core-logger';

export interface AuthStoreContextValue {
  authStore: DefaultAuthStore;
}

export const AuthStoreContext = createContext<AuthStoreContextValue | null>(
  null,
);

export const useAuthStore = (): DefaultAuthStore => {
  const ctx = useContext(AuthStoreContext);
  if (!ctx) {
    log.error('AuthStoreContext.Provider missing in component tree');
    throw new Error('AuthStoreContext.Provider missing in component tree');
  }
  return ctx.authStore;
};
