import { useCallback, useMemo } from 'react';
import type { AuthService, Result } from '@react-native-spotify/core-domain';

type ApiMethod = 'get' | 'post';

type ApiFactoryReturn<T> = {
  get: () => Promise<Result<T>>;
  post: () => Promise<Result<T>>;
};

type ApiFactoryFn<T> = (
  baseUrl: string,
  url: string,
  headers?: Record<string, string>,
  authService?: AuthService,
) => ApiFactoryReturn<T>;

export function useApiFactory<T>(
  method: ApiMethod,
  baseUrl: string,
  url: string,
  headers?: Record<string, string>,
  authService?: AuthService,
): () => Promise<Result<T>> {
  const create = useCallback((): (() => Promise<Result<T>>) => {
    const factory: ApiFactoryFn<T> =
      method === 'get'
        ? require('./apiFactory').createGetApi
        : require('./apiFactory').createPostApi;

    const result = factory(baseUrl, url, headers, authService);

    const fn = result[method];
    if (!fn) {
      throw new Error(`Méthode API "${method}" non implémentée`);
    }

    return fn;
  }, [method, baseUrl, url, headers, authService]);

  return useMemo(() => create(), [create]);
}
