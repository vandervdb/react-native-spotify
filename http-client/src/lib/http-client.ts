import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import axios from 'axios';
import { log } from '@react-native-spotify/core-logger';

const api = axios.create({
  baseURL: API_CONSTANTS.API_BASE_V1,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  log.debug(`[API Request] ${request.method?.toUpperCase()} ${request.url}`);
  log.debug('Request data:', JSON.stringify(request.data, null, 2));
  return request;
});

api.interceptors.response.use(
  (response) => {
    log.debug(`[API Response] ${response.status} ${response.config.url}`);
    log.debug('[Response data]:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    log.error('[API Error]', error.message);
    if (error.response) {
      log.error(
        `Error response: ${error.response.status} ${JSON.stringify(error.response.data, null, 2)}`,
      );
    }
    return Promise.reject(error);
  },
);

export { api };
