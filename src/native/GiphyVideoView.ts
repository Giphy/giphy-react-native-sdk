import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia } from './types'

export type NativeGiphyVideoViewProps = ViewProps & {
  media?: GiphyMedia
  muted?: boolean
  playing?: boolean
}

export const NativeGiphyVideoView = requireNativeComponent<NativeGiphyVideoViewProps>('GiphyReactNativeVideoView')
