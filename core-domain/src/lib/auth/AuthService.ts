export interface AuthService {
  getToken(): Promise<string>;

  refreshToken(): Promise<void>;
}
