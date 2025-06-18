import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import axios from 'axios';
import { attachLogger } from './interceptors.js';

const api = axios.create({
  baseURL: API_CONSTANTS.API_BASE_V1,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
attachLogger(api);
export { api };
