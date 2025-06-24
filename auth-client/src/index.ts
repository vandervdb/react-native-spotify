import { DefaultAuthClient } from './lib/api/auth-client.js';

export * from './lib/auth-client.js';

export const defaultAuthClient = new DefaultAuthClient();

export const fetchAccessToken = async () =>
  defaultAuthClient.fetchAccessToken();

export const startAuthorization = async () =>
  defaultAuthClient.startAuthorization();
