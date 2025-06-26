export interface AuthService {
  isTokenValid(): boolean;

  getToken(): Promise<string>;

  refreshToken(): Promise<void>;

  startAuthorization(): Promise<TokenData | null>;

  getRefreshToken(): Promise<TokenData | undefined>;
}
