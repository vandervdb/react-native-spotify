import { getEnv } from '@react-native-spotify/core-config';
import { log } from '@react-native-spotify/core-logger';
import { api } from '@react-native-spotify/http-client';
import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { SpotifyTokenResponseDto } from '../model/SpotifyTokenResponseDto.js';

const fetchAccessToken = async (): Promise<SpotifyTokenResponseDto | undefined> => {
  const { SPOTIFY_CLIENT_ID: CLIENT_ID, SPOTIFY_CLIENT_SECRET: CLIENT_SECRET } = getEnv();
  const authString = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  try {
    const response = await api.post<SpotifyTokenResponseDto>(
      `${API_CONSTANTS.ACCOUNTS_API_BASE}token`,
      authString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (e) {
    log.error('fetchAccessToken::Une erreur est survenue en chargeant le token Spotify', e);
    return undefined;
  }
};

export { fetchAccessToken };
