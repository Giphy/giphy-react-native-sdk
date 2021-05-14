import { requireNativeComponent } from 'react-native'

import type { GiphyMedia, GiphyContentRequest } from './types'

export enum NativeGiphyGridViewOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type NativeGiphyGridViewProps = {
  cellPadding?: number
  orientation?: NativeGiphyGridViewOrientation
  spanCount?: number
  showCheckeredBackground?: boolean
  fixedSizeCells?: boolean
  content?: GiphyContentRequest
}

export type NativeGiphyGridViewEvents =
  | {
      type: 'onContentUpdate'
      payload: { resultCount: number }
    }
  | {
      type: 'onMediaSelect'
      payload: { media: GiphyMedia }
    }

export const NativeGiphyGridView = requireNativeComponent<NativeGiphyGridViewProps>('GiphyReactNativeGridView')
