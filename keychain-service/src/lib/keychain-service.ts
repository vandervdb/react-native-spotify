import {SERVICES} from '@react-native-spotify/core-constants';
import  {STORAGE_TYPE} from 'react-native-keychain';
import * as Keychain from 'react-native-keychain';
import {log} from '@react-native-spotify/core-logger';

export function keychainService(): string {
  return 'keychain-service';
}

export interface TokenData {
  token: string;
  expiresAt: number;
}

export interface RefreshTokenData {
  refreshToken: string;
  expiresAt: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}

function createSecureStorage<T>(storageKey: string, service: string) {
  const options = {
    service,
    storage: STORAGE_TYPE.AES_GCM,
  };

  const save = async (data: T): Promise<void> => {
    try {
      await Keychain.setGenericPassword(storageKey, JSON.stringify(data), options);
      log.debug('createSecureStorage save: ', data);
    } catch (error) {
      log.error('Erreur lors de la sauvegarde sécurisée', { error, service });
    }
  };

  const get = async (): Promise<T | undefined> => {
    try {
      const result = await Keychain.getGenericPassword(options);
      const resultData = result ? JSON.parse(result.password) : undefined;
      log.debug('createSecureStorage get', resultData);
      return resultData;
    } catch (error) {
      log.error('Erreur lors de la lecture sécurisée', { error, service });
      return undefined;
    }
  };

  return { save, get };
}

export const KeyChainService = {
  token: createSecureStorage<TokenData>('token', SERVICES.API_TOKEN),
  refreshToken: createSecureStorage<RefreshTokenData>('refresh_token', SERVICES.REFRESH_TOKEN),
  credentials: createSecureStorage<UserCredentials>('user', SERVICES.USER_CREDENTIALS),
};
