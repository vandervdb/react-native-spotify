export const API_CONSTANTS = {
  REQUEST_CODE: 22114458,
  REDIRECT_URI: 'org-vander-myspotifyapp://callback',

  // Endpoints
  API_BASE_V1: 'https://api.spotify.com/v1/',
  ACCOUNTS_API_BASE: 'https://accounts.spotify.com/api/',
  API_ME: 'https://api.spotify.com/v1/me/',
  AUTHORIZE_URL: 'https://accounts.spotify.com/authorize/',

  // Scopes
  USER_READ_PRIVATE: 'user-read-private user-read-email',
  USER_READ_PLAYBACK_STATE: 'user-read-playback-state',
  USER_READ_CURRENTLY_PLAYING: 'user-read-currently-playing',
  USER_LIBRARY_MODIFY: 'user-library-modify',
} as const;
