import { authClient } from './auth-client.js';

describe('authClient', () => {
  it('should work', () => {
    expect(authClient()).toEqual('auth-client');
  });
});
