import { AuthorizeResult } from 'react-native-app-auth';
import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';

export interface AuthClient {
  getAuthorization(): Promise<AuthorizeResult | undefined>;

  fetchRefreshToken(): Promise<SpotifyTokenResponseDto | undefined>;
}
