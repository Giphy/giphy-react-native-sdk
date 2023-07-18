import { NativeSyntheticEvent, ViewProps } from 'react-native'

import type { GiphyMediaID } from '../dto/giphyMedia'

export const GiphyVideoViewPlaybackState = {
  Unknown: 0,
  ReadyToPlay: 3,
  Playing: 4,
  Paused: 5,
} as const

export type GiphyVideoViewPlaybackState = (typeof GiphyVideoViewPlaybackState)[keyof typeof GiphyVideoViewPlaybackState]

export type NativeGiphyVideoViewProps = ViewProps & {
  autoPlay?: boolean
  media?: GiphyMediaID
  muted?: boolean
  onError?: (e: NativeSyntheticEvent<{ description: string }>) => void
  onMute?: (e: NativeSyntheticEvent<{}>) => void
  onPlaybackStateChanged?: (e: NativeSyntheticEvent<{ state: GiphyVideoViewPlaybackState }>) => void
  onUnmute?: (e: NativeSyntheticEvent<{}>) => void
}

export const NativeGiphyVideoView: any = null
