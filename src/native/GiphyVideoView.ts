import { NativeSyntheticEvent, requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia } from './types'

export enum GiphyPlaybackState {
  Unknown,
  ReadyToPlay,
  Playing,
  Paused,
}

export type NativeGiphyVideoViewProps = ViewProps & {
  media?: GiphyMedia
  muted?: boolean
  playing?: boolean
  onError?: (e: NativeSyntheticEvent<{ description: string }>) => void
  onMute?: (e: NativeSyntheticEvent<{}>) => void
  onPause?: (e: NativeSyntheticEvent<{}>) => void
  onPlay?: (e: NativeSyntheticEvent<{}>) => void
  onPlaybackStateChanged?: (e: NativeSyntheticEvent<{ state: GiphyPlaybackState }>) => void
  onUnmute?: (e: NativeSyntheticEvent<{}>) => void
}

export const NativeGiphyVideoView = requireNativeComponent<NativeGiphyVideoViewProps>('GiphyReactNativeVideoView')
