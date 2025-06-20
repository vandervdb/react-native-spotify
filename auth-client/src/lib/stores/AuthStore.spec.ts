import { AuthStore } from './AuthStore.js';
import { AuthClient } from '../api/authClient.js';
import { SecureStorage, TokenData } from '@react-native-spotify/keychain-service';

class MockAuthClient implements AuthClient {
  fetchAccessToken = jest.fn(async () => ({
    access_token: 'mock-token',
    token_type: 'Bearer',
    expires_in: 3600,
  }));
}

class MockStorage implements SecureStorage<TokenData> {
  data?: TokenData;
  save = jest.fn(async (d: TokenData) => {
    this.data = d;
  });
  get = jest.fn(async () => this.data);
}

describe('AuthStore with interfaces', () => {
  it('refreshes and stores token using injected interfaces', async () => {
    const client = new MockAuthClient();
    const storage = new MockStorage();

    const store = new AuthStore(client, storage);
    await store.refreshAccessToken();

    expect(client.fetchAccessToken).toHaveBeenCalled();
    expect(storage.save).toHaveBeenCalled();
    expect(store.token).toBe('mock-token');
  });
});
