import axios from 'axios';
import { attachBearerInterceptor, attachLogger } from './interceptors';
import { AuthService } from '@react-native-spotify/core-domain';

function createApi(url: string) {
  const instance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  attachLogger(instance);
  return instance;
}

function createAuthApi(url: string, authService: AuthService) {
  const instance = createApi(url);
  attachBearerInterceptor(instance, authService);
  return instance;
}

export { createApi, createAuthApi };
