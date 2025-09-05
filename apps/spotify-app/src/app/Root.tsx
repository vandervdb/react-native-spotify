import React from 'react';
import { App } from './App';
import {
  DefaultAuthClient,
  DefaultAuthStore,
} from '@react-native-spotify/spotify-client';
import { KeyChainService } from '@react-native-spotify/keychain-service';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const authClient = new DefaultAuthClient();
const storage = KeyChainService.token;
const authStore = new DefaultAuthStore(authClient, storage);

export const Root = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <App authStore={authStore} />
      </PaperProvider>
    </SafeAreaProvider>
  );
};
