import { keychainService } from './keychain-service';

describe('keychainService', () => {
  it('should work', () => {
    expect(keychainService()).toEqual('keychain-service');
  });
});
