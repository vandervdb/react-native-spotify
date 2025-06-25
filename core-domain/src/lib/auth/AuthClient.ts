import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';
import { TokenData } from '../storage/SecureStorage';

export interface AuthClient {
  startAuthorization(): Promise<TokenData | null>;

  getRefreshToken(): Promise<SpotifyTokenResponseDto | undefined>;
}
