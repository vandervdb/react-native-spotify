import { DefaultAuthStore } from './lib/auth-store';
import { defaultAuthClient } from '@react-native-spotify/auth-client';

const authStore = new DefaultAuthStore(defaultAuthClient);
export default authStore;

export async function ensureTokenReady(): Promise<void> {
  if (!authStore.isTokenValid) {
    await authStore.loadToken();
  }
}
