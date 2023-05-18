import { NativeSyntheticEvent, requireNativeComponent, ViewProps } from 'react-native'

import type { GiphyClipsRendition, GiphyRendition } from '../dto/giphyRendition'
import type { GiphyContentRequest } from '../dto/giphyContentRequest'
import type { GiphyDirection } from '../dto/misc'
import type { GiphyMedia } from '../dto/giphyMedia'
import type { NativeGiphyTheme } from '../dto/giphyTheme'

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
  theme?: NativeGiphyTheme
}

export const NativeGiphyGridView = requireNativeComponent<NativeGiphyGridViewProps>('GiphyReactNativeGridView')
