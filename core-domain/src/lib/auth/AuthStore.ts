export interface AuthStore {
  readonly token: string;
  readonly isTokenValid: boolean;

  loadToken(): Promise<void>;

  refreshAccessToken(): Promise<void>;
}
