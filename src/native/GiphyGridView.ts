import { NativeSyntheticEvent, requireNativeComponent } from 'react-native'

import type { GiphyMedia, GiphyContentRequest } from './types'

export enum NativeGiphyGridViewOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type NativeGiphyGridViewProps = {
  cellPadding?: number
  content?: GiphyContentRequest
  fixedSizeCells?: boolean
  onContentUpdate?: (e: NativeSyntheticEvent<{ resultCount: number }>) => void
  onMediaSelect?: (e: NativeSyntheticEvent<{ media: GiphyMedia }>) => void
  onScroll?: (e: NativeSyntheticEvent<{ offset: number }>) => void
  orientation?: NativeGiphyGridViewOrientation
  showCheckeredBackground?: boolean
  spanCount?: number
}

export const NativeGiphyGridView = requireNativeComponent<NativeGiphyGridViewProps>('GiphyReactNativeGridView')
