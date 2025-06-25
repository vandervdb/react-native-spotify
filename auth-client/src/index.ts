import { DefaultAuthClient } from './lib/api/auth-client';

export const defaultAuthClient = new DefaultAuthClient();

export const fetchAccessToken = async () => defaultAuthClient.getRefreshToken();

export const startAuthorization = async () =>
  defaultAuthClient.startAuthorization();
