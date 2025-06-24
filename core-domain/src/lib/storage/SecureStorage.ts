export interface SecureStorage<T> {
  save(data: T): Promise<void>;

  get(): Promise<T | undefined>;
}

export interface TokenData {
  token: string;
  expiresAt: number;
}

export interface RefreshTokenData {
  refreshToken: string;
  expiresAt: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}
