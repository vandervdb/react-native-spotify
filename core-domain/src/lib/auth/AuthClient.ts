import { TokenData } from '../storage/SecureStorage';

export interface AuthClient {
  startAuthorization(): Promise<TokenData | undefined>;

  getRefreshToken(): Promise<TokenData | undefined>;
}
