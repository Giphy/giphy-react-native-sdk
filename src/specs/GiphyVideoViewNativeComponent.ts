import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'
import type { DirectEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes'
import type { HostComponent } from 'react-native'
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes'

export const GiphyVideoViewPlaybackState = {
  Unknown: 0,
  ReadyToPlay: 3,
  Playing: 4,
  Paused: 5,
} as const

export type GiphyVideoViewPlaybackState = (typeof GiphyVideoViewPlaybackState)[keyof typeof GiphyVideoViewPlaybackState]

export interface GiphyVideoViewMuteEvent {}

export interface GiphyVideoViewUnmuteEvent {}

export interface GiphyVideoViewPlaybackStateChangeEvent {
  state: Int32
}

export interface GiphyVideoViewErrorEvent {
  description: string
}

export interface NativeProps extends ViewProps {
  autoPlay: boolean
  mediaId?: string
  muted: boolean
  onError?: DirectEventHandler<GiphyVideoViewErrorEvent>
  onMute?: DirectEventHandler<GiphyVideoViewMuteEvent>
  onPlaybackStateChanged?: DirectEventHandler<GiphyVideoViewPlaybackStateChangeEvent>
  onUnmute?: DirectEventHandler<GiphyVideoViewUnmuteEvent>
}

export default codegenNativeComponent<NativeProps>('RTNGiphyVideoView') as HostComponent<NativeProps>
