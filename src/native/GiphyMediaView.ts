import { requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMediaID } from '../dto/giphyMedia'
import type { GiphyRendition } from '../dto/giphyRendition'
import type { ResizeMode } from '../dto/misc'

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
