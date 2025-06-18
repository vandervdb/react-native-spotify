import { httpClient } from './http-client.js';

describe('httpClient', () => {
  it('should work', () => {
    expect(httpClient()).toEqual('http-client');
  });
});
