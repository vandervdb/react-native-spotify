import { AxiosInstance } from 'axios';
import { authStore } from '@react-native-spotify/auth-client';
import { log } from '@react-native-spotify/core-logger';

export const attachBearerInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    if (!authStore.isTokenValid) {
      await authStore.loadToken();
    }
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export const attachLogger = (client: AxiosInstance) => {
  client.interceptors.request.use((request) => {
    log.debug(`[API Request] ${request.method?.toUpperCase()} ${request.url}`);
    log.debug('Request data:', JSON.stringify(request.data, null, 2));
    return request;
  });

  client.interceptors.response.use(
    (response) => {
      log.debug(`[API Response] ${response.status} ${response.config.url}`);
      log.debug('[Response data]:', JSON.stringify(response.data, null, 2));
      return response;
    },
    (error) => {
      log.error('[API Error]', error.message);
      if (error.response) {
      }
    },
  );
};
