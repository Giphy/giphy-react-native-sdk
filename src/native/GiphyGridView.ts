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

export enum NativeGiphyGridViewEvent {
  ContentUpdated = 'onContentUpdate',
  MediaSelected = 'onMediaSelect',
}

export type NativeGGVMediaSelectEventHandler = (e: { media: GiphyMedia }) => void

export type NativeGGVContentUpdatedEventHandler = (e: { resultCount: number }) => void

export const NativeGiphyGridView = requireNativeComponent<NativeGiphyGridViewProps>('GiphyReactNativeGridView')
