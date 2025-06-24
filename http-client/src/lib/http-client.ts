import axios from 'axios';
import { attachLogger } from './interceptors';

export const api = (url: string) => {
  return attachLogger(
    axios.create({
      baseURL: url,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
};

export default api;
