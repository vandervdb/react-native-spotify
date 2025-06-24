import { log } from '@react-native-spotify/core-logger';
import { api } from '@react-native-spotify/http-client';
import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';
import { buildAuthConfig } from '../utils/spotifyAuthUrl.js';
import { AuthClient } from '@react-native-spotify/core-domain';
import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { authorize } from 'react-native-app-auth';

export class DefaultAuthClient implements AuthClient {
  async startAuthorization(): Promise<string | null> {
    log.debug('startAuthorization');
    const config = buildAuthConfig();
    const authState = await authorize(config);
    log.debug('startAuthorization::AuthState:', authState.accessToken);

    return null;
  }

  async fetchAccessToken(): Promise<SpotifyTokenResponseDto | undefined> {
    try {
      log.debug('fetchAccessToken');
      const response = await api(
        API_CONSTANTS.ACCOUNTS_API_BASE,
      ).post<SpotifyTokenResponseDto>('token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (e) {
      log.error(
        'fetchAccessToken::Une erreur est survenue en chargeant le token Spotify',
        e,
      );
      return undefined;
    }
  }
}
