import { NativeSyntheticEvent, requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia } from '../giphyMedia'

export enum GiphyVideoViewPlaybackState {
  Unknown = 0,
  ReadyToPlay = 3,
  Playing = 4,
  Paused = 5,
}

// TODO v2 remove `playing`
export type NativeGiphyVideoViewProps = ViewProps & {
  autoPlay?: boolean
  media?: GiphyMedia
  muted?: boolean
  /**
   * @deprecated will be removed in v2, please use autoPlay instead
   */
  playing?: boolean
  onError?: (e: NativeSyntheticEvent<{ description: string }>) => void
  onMute?: (e: NativeSyntheticEvent<{}>) => void
  onPlaybackStateChanged?: (e: NativeSyntheticEvent<{ state: GiphyVideoViewPlaybackState }>) => void
  onUnmute?: (e: NativeSyntheticEvent<{}>) => void
}

export const NativeGiphyVideoView = requireNativeComponent<NativeGiphyVideoViewProps>('GiphyReactNativeVideoView')
