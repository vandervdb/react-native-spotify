import DefaultApp from '../components/DefaultApp';
import {
  AuthStoreContext,
  DefaultAuthStore,
} from '@react-native-spotify/spotify-client';

interface AppProps {
  authStore: DefaultAuthStore;
}

export const App = ({ authStore }: AppProps) => {
  return (
    <AuthStoreContext.Provider value={{ authStore }}>
      <DefaultApp />
    </AuthStoreContext.Provider>
  );
};

export default App;
