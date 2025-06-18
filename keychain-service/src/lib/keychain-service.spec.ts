import { keychainService } from './keychain-service.js';

describe('keychainService', () => {
  it('should work', () => {
    expect(keychainService()).toEqual('keychain-service');
  });
});
