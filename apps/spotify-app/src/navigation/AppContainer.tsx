import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './ScreenStack';
import {
  AuthStoreContext,
  DefaultAuthClient,
  DefaultAuthStore,
} from '@react-native-spotify/spotify-client';
import { KeyChainService } from '@react-native-spotify/keychain-service';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const authClient = new DefaultAuthClient();
const storage = KeyChainService.token;
const authStore = new DefaultAuthStore(authClient, storage);

export default function AppContainer() {
  return (
    <SafeAreaProvider>
      <AuthStoreContext.Provider value={{ authStore }}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AuthStoreContext.Provider>
    </SafeAreaProvider>
  );
}
