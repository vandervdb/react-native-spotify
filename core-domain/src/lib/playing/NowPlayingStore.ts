import { NowPlaying } from './NowPlaying';

export interface NowPlayingStore {
  readonly nowPlayingLoadedOnce: boolean;
  readonly nowPlaying: NowPlaying;

  loadNowPlaying(): Promise<void>;

  refreshNowPlaying(): Promise<void>;

  setIsNowPlaying: (isNowPlaying: boolean) => void;
}
