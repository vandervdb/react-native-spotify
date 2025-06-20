import { makeAutoObservable, observable, runInAction } from 'mobx';
import { log } from '@react-native-spotify/core-logger';
import { KeyChainService, TokenData } from '@react-native-spotify/keychain-service';
import { fetchAccessToken } from '../api/authClient.js';

export class AuthStore {
  private tokenRefreshPromise: Promise<void> | null = null;
  authParams: TokenData = { token: '', expiresAt: 0 };
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {
      authParams: observable,
      loading: observable,
      error: observable,
    });

    this.loadToken().then(() => log.debug('Token initial chargé'));
  }

  get isTokenValid(): boolean {
    return this.authParams.token !== '' && this.authParams.expiresAt > Date.now();
  }

  get token(): string {
    return this.authParams.token;
  }

  async loadToken(): Promise<void> {
    if (this.tokenRefreshPromise) {
      log.debug('Token déjà en cours de chargement, on attend la promesse...');
      return this.tokenRefreshPromise;
    }

    this.tokenRefreshPromise = (async () => {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      try {
        const stored = await KeyChainService.token.get();
        if (stored && stored.token && stored.expiresAt > Date.now()) {
          runInAction(() => {
            this.authParams = stored;
          });
          log.debug('Token valide chargé depuis SecureStorage');
        } else {
          await this.refreshAccessToken();
        }
      } catch (e) {
        runInAction(() => {
          this.error = e instanceof Error ? e : new Error('Erreur inconnue');
          log.error('loadToken error:', e);
        });
      } finally {
        runInAction(() => {
          this.loading = false;
        });
        this.tokenRefreshPromise = null;
      }
    })();

    return this.tokenRefreshPromise;
  }

  async refreshAccessToken(): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetchAccessToken();
      if (!response) throw new Error('Aucun token reçu de Spotify');

      const tokenData: TokenData = {
        token: response.access_token,
        expiresAt: Date.now() + response.expires_in * 1000,
      };

      await KeyChainService.token.save(tokenData);

      runInAction(() => {
        this.authParams = tokenData;
        this.loading = false;
      });

      log.debug('Token rafraîchi avec succès');
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Erreur refresh token');
        this.loading = false;
      });
      log.error('refreshAccessToken error:', e);
    }
  }
}

export async function ensureTokenReady(): Promise<void> {
  if (!authStore.isTokenValid) {
    await authStore.loadToken();
  }
}

const authStore = new AuthStore();
export { authStore };
