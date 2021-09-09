import { NativeSyntheticEvent, requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyMedia } from '../giphyMedia'
import type { GiphyContentRequest, GiphyDirection, GiphyClipsRendition, GiphyRendition } from './types'

export type NativeGiphyGridViewProps = ViewProps & {
  cellPadding?: number
  clipsPreviewRenditionType?: GiphyClipsRendition
  content?: GiphyContentRequest
  fixedSizeCells?: boolean
  onContentUpdate?: (e: NativeSyntheticEvent<{ resultCount: number }>) => void
  onMediaSelect?: (e: NativeSyntheticEvent<{ media: GiphyMedia }>) => void
  onScroll?: (e: NativeSyntheticEvent<{ offset: number }>) => void
  orientation?: GiphyDirection
  renditionType?: GiphyRendition
  spanCount?: number
  showCheckeredBackground?: boolean
}

export const NativeGiphyGridView = requireNativeComponent<NativeGiphyGridViewProps>('GiphyReactNativeGridView')
