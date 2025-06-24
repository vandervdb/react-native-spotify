import { DefaultAuthService } from './lib/auth-service';
import type { AuthStore } from '@react-native-spotify/core-domain';

export * from './lib/auth-service';

/**
 * Permet d'initialiser manuellement l'AuthService en évitant les imports circulaires.
 */
export function createAuthService(authStore: AuthStore) {
  return new DefaultAuthService(authStore);
}
