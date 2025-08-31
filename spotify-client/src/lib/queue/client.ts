import { useGetApi } from '@react-native-spotify/http-client';
import { AuthService, Result } from '@react-native-spotify/core-domain';
import { CurrentlyPlayingWithQueueDto } from '@react-native-spotify/core-dto';
import { API_CONSTANTS } from '@react-native-spotify/core-constants';
import { useAuthStore } from '../shared';
import { DefaultAuthService } from '../auth';

export class DefaultQueueClient {
  private readonly authStore = useAuthStore();
  private readonly authService: AuthService = new DefaultAuthService(
    this.authStore,
  );

  async fetchCurrentQueue(): Promise<Result<CurrentlyPlayingWithQueueDto>> {
    const getCurrentUserQueue = useGetApi<CurrentlyPlayingWithQueueDto>(
      API_CONSTANTS.ME,
      API_CONSTANTS.QUEUE,
      undefined,
      this.authService,
    );
    return await getCurrentUserQueue();
  }
}
