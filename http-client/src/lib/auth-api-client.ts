import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import axios from 'axios';
import { attachBearerInterceptor, attachLogger } from './interceptors.js';

const authApi = axios.create({
  baseURL: API_CONSTANTS.API_BASE_V1,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
attachLogger(authApi);
attachBearerInterceptor(authApi);
export { authApi };
