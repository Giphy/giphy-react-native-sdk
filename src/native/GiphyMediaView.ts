import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMediaID } from '../giphyMedia'
import type { GiphyRendition, ResizeMode } from './types'

export const COMPONENT_NAME = 'GiphyReactNativeMediaView'

export type NativeGiphyMediaViewProps = ViewProps & {
  autoPlay?: boolean
  media?: GiphyMediaID
  renditionType?: GiphyRendition
  resizeMode?: ResizeMode
  showCheckeredBackground?: boolean
}

export enum NativeGiphyMediaViewCommands {
  Pause = 'pause',
  Resume = 'resume',
}

export const NativeGiphyMediaView = requireNativeComponent<NativeGiphyMediaViewProps>(COMPONENT_NAME)
