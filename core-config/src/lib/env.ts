import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';

export const getEnv = () => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error('❌ Missing environment variables in .env file');
  }

  return {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
  };
};

export type Env = ReturnType<typeof getEnv>;
