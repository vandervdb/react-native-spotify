const API_BASE_V1 = 'https://api.spotify.com/v1';
const ACCOUNTS_API_BASE = 'https://accounts.spotify.com/api';
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_EXPIRATION_DURATION = 3600;

export const API_CONSTANTS = {
  REQUEST_CODE: 22114458,
  REDIRECT_URI: 'org-vander-myspotifyapp://callback',

  // URLs
  AUTHORIZE_URL,
  TOKEN_URL: `${ACCOUNTS_API_BASE}/token`,
  ACCOUNTS_API_BASE,
  API_BASE_V1,
  API_ME: `${API_BASE_V1}me/`,
  TOKEN_EXPIRATION_DURATION,

  // Scopes
  SCOPES: {
    USER_READ_PRIVATE: 'user-read-private',
    USER_READ_PLAYBACK_STATE: 'user-read-playback-state',
    USER_READ_CURRENTLY_PLAYING: 'user-read-currently-playing',
    USER_LIBRARY_MODIFY: 'user-library-modify',
  } as const,
} as const;

export type SpotifyScopeKey = keyof typeof API_CONSTANTS.SCOPES;
