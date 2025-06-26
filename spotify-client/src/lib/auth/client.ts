import { AuthClient } from '@react-native-spotify/core-domain';
import { buildAuthConfig } from './utils/spotifyAuthUrl';
import { log } from '@react-native-spotify/core-logger';
import { authorize, AuthorizeResult } from 'react-native-app-auth';
import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';
import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { createApi } from '@react-native-spotify/http-client';

export class DefaultAuthClient implements AuthClient {
  async getAuthorization(): Promise<AuthorizeResult | undefined> {
    log.debug('startAuthorization');
    const config = buildAuthConfig();
    try {
      log.debug('startAuthorization::config:', JSON.stringify(config));
      return await authorize(config);
    } catch (e) {
      log.error(
        'startAuthorization::Une erreur est survenue en chargeant le token Spotify',
        e,
      );
      return undefined;
    }
  }

  async fetchRefreshToken(): Promise<SpotifyTokenResponseDto | undefined> {
    log.debug('getRefreshToken');
    try {
      const response = await createApi(
        API_CONSTANTS.TOKEN_URL,
      ).post<SpotifyTokenResponseDto>('', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.data) {
        return response.data;
      } else {
        log.warn('getRefreshToken::No data returned');
        return undefined;
      }
    } catch (e) {
      log.error(
        'getRefreshToken::Une erreur est survenue en chargeant le token Spotify',
        e,
      );
      return undefined;
    }
  }
}
