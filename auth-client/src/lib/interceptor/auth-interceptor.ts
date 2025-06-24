import {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { log } from '@react-native-spotify/core-logger';
import { authStore } from '../../index';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const attachBearer = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (!authStore.isTokenValid) {
    await authStore.loadToken();
  }

  const token = authStore.token;
  if (token) {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }
    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  log.debug('→ Bearer token attaché');

  return config;
};

// 🔁 Retry original request after 401
const handle401 = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as RetryableRequestConfig;
  if (!originalRequest) {
    return Promise.reject(error);
  }
  if (error.response?.status === 401 && !originalRequest._retry) {
    log.warn('401 intercepté. Tentative de refresh...');

    originalRequest._retry = true;

    try {
      await authStore.refreshAccessToken();

      const token = authStore.token;
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return import('axios').then(({ default: axios }) =>
          axios(originalRequest),
        );
      }
    } catch (refreshError) {
      log.error('Échec du refresh après 401', refreshError);
      throw refreshError;
    }
  }

  throw error;
};

export const attachBearerInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(attachBearer);
  client.interceptors.response.use((response) => response, handle401);
};
