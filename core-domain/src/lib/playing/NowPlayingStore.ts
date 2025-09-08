import { NowPlaying } from './NowPlaying';

export interface NowPlayingStore {
  readonly nowPlaying: NowPlaying;

  loadNowPlaying(): Promise<void>;
}
