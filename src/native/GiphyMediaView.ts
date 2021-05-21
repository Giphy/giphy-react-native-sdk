import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia, GiphyRendition } from './types'

export type NativeGiphyMediaViewProps = ViewProps & {
  media?: GiphyMedia
  renditionType?: GiphyRendition
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>('GiphyReactNativeMediaView')
