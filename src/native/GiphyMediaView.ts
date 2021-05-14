import { requireNativeComponent } from 'react-native'

import type { GiphyMedia } from './types'

export type NativeGiphyMediaViewProps = {
  media?: GiphyMedia
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>('GiphyReactNativeMediaView')
