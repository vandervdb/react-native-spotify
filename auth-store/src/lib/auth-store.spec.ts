import { authStore } from './auth-store.js';

describe('authStore', () => {
  it('should work', () => {
    expect(authStore()).toEqual('auth-store');
  });
});
