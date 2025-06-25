import { AxiosInstance } from 'axios';
import { log } from '@react-native-spotify/core-logger';
// import { AuthService } from '@react-native-spotify/core-domain';

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
        // do nothing
      }
    },
  );
  return client;
};

// export const attacheBearer = async (
//   client: AxiosInstance,
//   authService: AuthService,
// ) => {
//   const token = await authService.getToken();
// };
