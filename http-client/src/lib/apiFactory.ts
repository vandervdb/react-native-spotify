import axios, { AxiosInstance } from 'axios';
import { attachBearerInterceptor, attachLogger } from './interceptors';
import { AuthService, Result } from '@react-native-spotify/core-domain';
import { log } from '@react-native-spotify/core-logger';

function createBaseApi(
  baseUrl: string,
  defaultHeaders?: Record<string, string>,
  authService?: AuthService,
): AxiosInstance {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    },
  });

  attachLogger(instance);

  if (authService) {
    attachBearerInterceptor(instance, authService);
  }

  return instance;
}

export function createGetApi<T>(
  baseUrl: string,
  url: string,
  headers?: Record<string, string>,
  authService?: AuthService,
) {
  const instance = createBaseApi(baseUrl, headers, authService);

  const get = async (): Promise<Result<T>> => {
    try {
      const response = await instance.get(url);

      return { ok: true, value: response.data };
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        log.error('Axios a rencontré une erreur lors du GET', e);
        return { ok: false, error: e };
      }
      log.error('Erreur inconnue', e);
      return { ok: false, error: new Error('Erreur inconnue') };
    }
  };

  return { get };
}

export function createPostApi<T>(
  baseUrl: string,
  url: string,
  headers?: Record<string, string>,
  authService?: AuthService,
) {
  const instance = createBaseApi(baseUrl, headers, authService);

  const post = async (): Promise<Result<T>> => {
    try {
      const response = await instance.post(url);
      return { ok: true, value: response.data };
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        log.error('Axios a rencontré une erreur lors du POST', e);
        return { ok: false, error: e };
      }
      log.error('Erreur inconnue', e);
      return { ok: false, error: new Error('Erreur inconnue') };
    }
  };

  return { post };
}
