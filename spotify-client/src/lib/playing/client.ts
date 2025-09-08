import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { NowPlayingClient } from '@react-native-spotify/core-domain';
import { SpotifyPlaybackStateDto } from '@react-native-spotify/core-dto';
import { log } from '@react-native-spotify/core-logger';
import { useGetApi } from '@react-native-spotify/http-client';
import { DefaultAuthService } from '../auth';
import { useAuthStore } from '../shared';

export class DefaultNowPlayingClient implements NowPlayingClient {
  private readonly authStore = useAuthStore();
  authService = new DefaultAuthService(this.authStore);

  async fetchNowPlaying() {
    log.debug('fetchNowPlaying');
    const getNowPlaying = useGetApi<SpotifyPlaybackStateDto>(
      API_CONSTANTS.API_BASE_V1,
      API_CONSTANTS.PLAYER,
      undefined,
      this.authService,
    );
    return await getNowPlaying();
  }
}
