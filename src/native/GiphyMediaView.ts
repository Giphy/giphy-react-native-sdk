import { requireNativeComponent } from 'react-native'

import type { GiphyMedia, GiphyRendition } from './types'

export type NativeGiphyMediaViewProps = {
  media?: GiphyMedia
  renditionType?: GiphyRendition
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>('GiphyReactNativeMediaView')
