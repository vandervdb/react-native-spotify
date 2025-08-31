import { useApiFactory } from './useApiFactory';
import type { AuthService, Result } from '@react-native-spotify/core-domain';

export function useGetApi<T>(
  baseUrl: string,
  url: string,
  headers?: Record<string, string>,
  authService?: AuthService,
): () => Promise<Result<T>> {
  return useApiFactory('get', baseUrl, url, headers, authService);
}
