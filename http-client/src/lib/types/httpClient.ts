import {
  AuthService,
  HttpError,
  Result,
} from '@react-native-spotify/core-domain';

export type ApiMethod = 'get' | 'post';

export type ApiHeaders = Record<string, string>;

export type ApiCall<T> = () => Promise<Result<T, HttpError>>;

export type ApiHandlers<T> = Partial<Record<ApiMethod, ApiCall<T>>>;
export type ApiFactoryReturn<T> = ApiHandlers<T>;

export type ApiFactoryFn<T> = (
  baseUrl: string,
  path: string,
  headers?: ApiHeaders,
  authService?: AuthService,
) => ApiFactoryReturn<T>;

export type CreateGetApiFn = <T>(
  baseUrl: string,
  path: string,
  headers?: ApiHeaders,
  authService?: AuthService,
) => { get: ApiCall<T> };

export type CreatePostApiFn = <T>(
  baseUrl: string,
  path: string,
  headers?: ApiHeaders,
  authService?: AuthService,
) => { post: ApiCall<T> };
