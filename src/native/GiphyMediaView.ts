import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia } from '../giphyMedia'
import type { GiphyRendition } from './types'

export type NativeGiphyMediaViewProps = ViewProps & {
  media?: GiphyMedia
  renditionType?: GiphyRendition
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>('GiphyReactNativeMediaView')
