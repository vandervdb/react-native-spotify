import {
  AuthClient,
  AuthStore,
  SecureStorage,
  TokenData,
} from '@react-native-spotify/core-domain';
import { log } from '@react-native-spotify/core-logger';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import {
  mapAuthorizeResultToTokenData,
  mapSpotifyTokenResponseToTokenData,
} from './utils/authMapper';

export class DefaultAuthStore implements AuthStore {
  private tokenRefreshPromise: Promise<void> | null = null;
  authParams: TokenData = { token: '', refreshToken: '', expiresAt: 0 };
  loading = false;
  error: Error | null = null;

  constructor(
    private authClient: AuthClient,
    private storage: SecureStorage<TokenData>,
  ) {
    makeAutoObservable(this, {
      authParams: observable,
      loading: observable,
      error: observable,
    });

    this.loadToken().then(() => log.debug('Token initial chargé'));
  }

  get token(): string {
    return this.authParams.token;
  }

  get isTokenValid(): boolean {
    return (
      this.authParams.token !== '' && this.authParams.expiresAt > Date.now()
    );
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
        const stored = await this.storage.get();
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
    let tokenData: TokenData | undefined;

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      if (!this.authParams.refreshToken) {
        const result = await this.authClient.getAuthorization();
        tokenData = result ? mapAuthorizeResultToTokenData(result) : undefined;
      } else {
        const response = await this.authClient.fetchRefreshToken();
        const dto = response.ok ? response.value : undefined;
        tokenData = dto ? mapSpotifyTokenResponseToTokenData(dto) : undefined;
      }

      if (!tokenData) {
        throw new Error('Données du token invalides');
      }

      const validToken: TokenData = tokenData;

      await this.storage.save(validToken);

      runInAction(() => {
        this.authParams = validToken;
        this.loading = false;
      });

      log.debug('Token rafraîchi avec succès');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur inconnue';

      runInAction(() => {
        log.error('Erreur lors du rafraîchissement du token:', errorMessage);
        this.error = new Error('Erreur refresh token: ' + errorMessage);
        this.loading = false;
      });
    }
  }
}
