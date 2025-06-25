import { log } from '@react-native-spotify/core-logger';
import { createApi } from '@react-native-spotify/http-client';
import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';
import { buildAuthConfig } from '../utils/spotifyAuthUrl';
import { AuthClient, TokenData } from '@react-native-spotify/core-domain';
import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { authorize } from 'react-native-app-auth';

export class DefaultAuthClient implements AuthClient {
  async startAuthorization(): Promise<TokenData | undefined> {
    log.debug('startAuthorization');
    const config = buildAuthConfig();
    try {
      log.debug('startAuthorization::config:', JSON.stringify(config));
      const authState = await authorize(config);
      log.debug('startAuthorization::AuthState:', authState);
      log.debug('startAuthorization::AuthState:', JSON.stringify(authState));
      return {
        token: authState.accessToken,
        refreshToken: authState.refreshToken,
        expiresAt: Date.now() + API_CONSTANTS.TOKEN_EXPIRATION_DURATION * 1000,
      };
    } catch (e) {
      log.error(
        'startAuthorization::Une erreur est survenue en chargeant le token Spotify',
        e,
      );
      return undefined;
    }
  }

  async getRefreshToken(): Promise<TokenData | undefined> {
    try {
      log.debug('getRefreshToken');
      const response = await createApi(
        API_CONSTANTS.TOKEN_URL,
      ).post<SpotifyTokenResponseDto>('', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = response.data;
      return {
        token: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + data.expires_in * 1000,
      };
    } catch (e) {
      log.error(
        'getRefreshToken::Une erreur est survenue en chargeant le token Spotify',
        e,
      );
      return undefined;
    }
  }
}
