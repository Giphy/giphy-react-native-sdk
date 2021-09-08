import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMediaID } from '../giphyMedia'
import type { GiphyRendition } from './types'

export type NativeGiphyMediaViewProps = ViewProps & {
  media?: GiphyMediaID
  renditionType?: GiphyRendition
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>('GiphyReactNativeMediaView')
