import { SpotifyTokenResponseDto } from '@react-native-spotify/core-dto';

export interface AuthClient {
  startAuthorization(): Promise<string | null>;

  fetchAccessToken(): Promise<SpotifyTokenResponseDto | undefined>;
}
