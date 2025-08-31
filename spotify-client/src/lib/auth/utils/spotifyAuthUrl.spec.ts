import { buildAuthConfig } from './spotifyAuthUrl.js';
import { getEnv } from '@react-native-spotify/core-config';

jest.mock('./environment', () => ({
  getEnv: jest.fn(),
}));

jest.mock('./apiConstants', () => ({
  API_CONSTANTS: {
    SCOPES: {
      PLAYLIST_READ: 'playlist-read',
      PLAYLIST_WRITE: 'playlist-write',
    },
    AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
    TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
  },
}));

describe('buildAuthConfig', () => {
  it('should build the correct AuthConfiguration object', () => {
    (getEnv as jest.Mock).mockReturnValue({
      SPOTIFY_CLIENT_ID: 'test-client-id',
      SPOTIFY_REDIRECT_URI: 'test-redirect-uri',
    });

    const config = buildAuthConfig();

    expect(config).toEqual({
      clientId: 'test-client-id',
      redirectUrl: 'test-redirect-uri',
      scopes: ['playlist-read', 'playlist-write'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    });
  });

  it('should throw if environment variables are missing', () => {
    (getEnv as jest.Mock).mockReturnValue({
      SPOTIFY_CLIENT_ID: undefined,
      SPOTIFY_REDIRECT_URI: undefined,
    });

    expect(() => buildAuthConfig()).toThrow();
  });
});
