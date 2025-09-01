export type AuthorizeResult = {
  accessToken: string;
  accessTokenExpirationDate?: string;
  refreshToken?: string;
  tokenAdditionalParameters?: Record<string, string>;
};

export const authorize = jest
  .fn<Promise<AuthorizeResult>, []>()
  .mockResolvedValue({
    accessToken: 'test-access-token',
    accessTokenExpirationDate: new Date(Date.now() + 3600_000).toISOString(),
    refreshToken: 'test-refresh-token',
  });

export const refresh = jest
  .fn<Promise<AuthorizeResult>, []>()
  .mockResolvedValue({
    accessToken: 'refreshed-access-token',
    accessTokenExpirationDate: new Date(Date.now() + 3600_000).toISOString(),
    refreshToken: 'refreshed-refresh-token',
  });
